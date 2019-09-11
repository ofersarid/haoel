import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import autoBind from 'auto-bind';
import selectors from './selectors';
import actions from './actions';
import styles from './styles.scss';

const THRESHHOLD = 10;

class ScrollSnap extends React.Component {
  static get propTypes() {
    return {
      children: PropTypes.any.isRequired,
      frame: PropTypes.number.isRequired,
      updateFrameIndex: PropTypes.func.isRequired,
      orientation: PropTypes.oneOf(['vertical', 'horizontal']),
      disableScrollSnap: PropTypes.func.isRequired,
      disableNext: PropTypes.bool.isRequired,
      disablePrev: PropTypes.bool.isRequired,
      count: PropTypes.func.isRequired,
      max: PropTypes.number.isRequired,
    };
  }

  static get defaultProps() {
    return {
      orientation: 'vertical',
    };
  }

  constructor(props) {
    super(props);
    autoBind(this);
    this.xDown = null;
    this.state = {
      index: 0,
    };
    this.lock = false;
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      index: nextProps.frame,
    };
  }

  componentDidUpdate(prevProps) {
    const { frame, disableScrollSnap, max } = this.props;
    if (frame > 1 && frame < max) {
      disableScrollSnap(false, false);
    } else if (frame === 1) {
      disableScrollSnap(false, true);
    } else if (frame === max) {
      disableScrollSnap(true, false);
    } else {
      disableScrollSnap(true, true);
    }
  }

  componentDidMount() {
    const { updateFrameIndex } = this.props;
    this.$node.addEventListener('wheel', this.mouseScrollHandler, true);
    this.$node.addEventListener('touchstart', this.touchStartHandler, true);
    this.$node.addEventListener('touchend', this.touchEndHandler, true);
    this.$node.addEventListener('touchmove', this.touchMoveHandler, true);
    updateFrameIndex(this.state.index);
  }

  componentWillUnmount() {
    this.$node.removeEventListener('wheel', this.mouseScrollHandler, true);
    this.$node.removeEventListener('touchstart', this.touchStartHandler, true);
    this.$node.removeEventListener('touchend', this.touchEndHandler, true);
    this.$node.removeEventListener('touchmove', this.touchMoveHandler, true);
  }

  snap(direction) {
    if (this.lock) return;
    this.lock = true;
    if (this.isTouchDevice) {
    }
    switch (direction) {
      case -1:
        this.next();
        break;
      case 1:
        this.prev();
        break;
      default:
        break;
    }
  }

  mouseScrollHandler(e) {
    clearTimeout(this.to);
    const delta = e.wheelDelta;
    this.isTouchDevice = false;
    if (Math.abs(delta) > THRESHHOLD) {
      this.snap(delta < 0 ? -1 : 1);
    }
    this.to = setTimeout(() => {
      this.lock = false;
    }, 100);
  };

  touchStartHandler(e) {
    const { disableScrollSnap } = this.props;
    this.lock = false;
    this.yDown = e.touches[0].clientY;
    disableScrollSnap(false, false);
    this.isTouchDevice = true;
  };

  touchEndHandler(e) {
    this.yDown = null;
  }

  touchMoveHandler(e) {
    let yUp = e.touches[0].clientY;
    let delta = (this.yDown - yUp);
    if (Math.abs(delta) > THRESHHOLD) {
      this.snap(delta > 0 ? -1 : 1);
    }
  };

  next() {
    const { disableNext } = this.props;
    if (disableNext) return;
    this.props.updateFrameIndex(this.state.index + 1);
  };

  prev() {
    const { disablePrev } = this.props;
    if (disablePrev) return;
    const index = Math.max(0, this.state.index - 1);
    this.props.updateFrameIndex(index);
  };

  render() {
    const { children } = this.props;
    return (
      <div className={styles.snapScroll} ref={el => {
        this.$node = el;
      }} >
        {children}
      </div >
    );
  }
}

const mapStateToProps = state => ({
  frame: selectors.frame(state),
  disableNext: selectors.disableNext(state),
  disablePrev: selectors.disablePrev(state),
});

const mapDispatchToProps = dispatch => ({
  updateFrameIndex: (...props) => dispatch(actions.updateFrameIndex(...props)),
  disableScrollSnap: (...props) => dispatch(actions.disable(...props)),
  count: (...props) => dispatch(actions.count(...props)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(ScrollSnap);

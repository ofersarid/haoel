import React from 'react';
// import cx from 'classnames';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
// import services from '/src/services';
import ScrollSnap from '/src/services/scroll-snap/scroll-snap';
// import styles from './styles.scss';

const Main = ({ children }) => (
  <ScrollSnap max={10} >
    {children}
  </ScrollSnap >
);

Main.propTypes = {
  // frame: PropTypes.number.isRequired,
  children: PropTypes.any,
};

const mapStateToProps = state => ({
  // frame: services.scrollSnap.selectors.frame(state)
});

const mapDispatchToProps = dispatch => ({}); // eslint-disable-line

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(Main);

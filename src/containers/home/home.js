import React from 'react';
import cx from 'classnames';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MediaLoader } from '/src/shared';
import services from '/src/services';
import logoSrc from '/src/assets/images/logo.svg';
import styles from './styles.scss';

const Home = ({ frame }) => (
  <div className={cx(styles.welcome)} >
    {frame === 0 && <MediaLoader className={styles.logo} src={logoSrc} />}
  </div >
);

Home.propTypes = {
  frame: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  frame: services.scrollSnap.selectors.frame(state),
});

const mapDispatchToProps = dispatch => ({}); // eslint-disable-line

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(Home);

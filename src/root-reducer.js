import { combineReducers } from 'redux-immutable';
import device from '/src/services/device/reducer';
// import snapScroll from '/src/shared/snap-scroll/reducer';
import services from '/src/services';
// import { firebaseReducer as fireBase } from 'react-redux-firebase';
import routs from '/src/services/redux-router/reducer';

const rootReducer = combineReducers({
  router: services.routs.reducer,
  device: services.device.reducer,
  reactor: services.reactor.reducer,
  // vgs: services.vgs.reducer,
  // fireBase,
  // snapScroll,
});

export default rootReducer;

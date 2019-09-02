import { combineReducers } from 'redux-immutable';
import services from '/src/services';
import { firebaseReducer as fireBase } from 'react-redux-firebase';

const rootReducer = combineReducers({
  router: services.routs.reducer,
  device: services.device.reducer,
  reactor: services.reactor.reducer,
  // vgs: services.vgs.reducer,
  fireBase,
  scrollSnap: services.scrollSnap.reducer,
});

export default rootReducer;

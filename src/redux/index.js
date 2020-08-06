import {createStore} from 'redux';
import {combineReducers} from 'redux';
import overlay from './reducers/OverlayReducer';
import user from './reducers/UserReducer';
import camera from './reducers/CameraReducer';
import banner from './reducers/BannerReducer';

const store = createStore(combineReducers({
  overlay,
  user,
  camera,
  banner
}), undefined);

export default store;
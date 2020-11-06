import {createStore} from 'redux';
import {combineReducers} from 'redux';
import overlay from './reducers/OverlayReducer';
import user from './reducers/UserReducer';
import camera from './reducers/CameraReducer';
import banner from './reducers/BannerReducer';
import post from './reducers/PostReducer';

const store = createStore(combineReducers({
  overlay,
  user,
  camera,
  banner,
  post
}), undefined);

export default store;
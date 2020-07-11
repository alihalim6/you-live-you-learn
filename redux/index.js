import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {combineReducers} from 'redux';
import overlay from './reducers/OverlayReducer';
import user from './reducers/UserReducer';
import camera from './reducers/CameraReducer';
import banner from './reducers/BannerReducer';

/////!!!!!REMOVE THUNK FROM PROJECT

const store = createStore(combineReducers({
  overlay,
  user,
  camera,
  banner
}), undefined, applyMiddleware(thunk));

export default store;
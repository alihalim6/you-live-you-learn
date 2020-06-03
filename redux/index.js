import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {combineReducers} from 'redux';
import overlay from './reducers/OverlayReducer';
import user from './reducers/UserReducer';

/////!!!!!REMOVE THUNK FROM PROJECT

const store = createStore(combineReducers({
  overlay,
  user
}), undefined, applyMiddleware(thunk));

export default store;
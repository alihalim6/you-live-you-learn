import * as types from '../actions/ActionTypes';

export default function(state = {}, action){
  switch(action.type){
  	case types.CAMERA_SHOWING :
  	  return {
        ...state, 
        currentCamera: action.camera,
        mediaCallback: action.mediaCallback,
        closeCallback: action.closeCallback
      };
  	default :
  	  return state;
  }
}
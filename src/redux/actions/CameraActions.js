import * as types from '../actions/ActionTypes';

export function showCamera(cameraShowing, mediaCallback, closeCallback){
  return {
    type: types.CAMERA_SHOWING, 
    cameraShowing,
    mediaCallback,
    closeCallback
  };
}

export function hideCamera(){
  return {
    type: types.CAMERA_SHOWING, 
    cameraShowing: false,
    mediaCallback: null
  };
}

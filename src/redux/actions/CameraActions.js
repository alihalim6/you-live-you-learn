import * as types from '../actions/ActionTypes';

export function showCamera(camera, mediaCallback, closeCallback){
  return {
    type: types.CAMERA_SHOWING, 
    camera,
    mediaCallback,
    closeCallback
  };
}

export function hideCamera(){
  return {
    type: types.CAMERA_SHOWING, 
    camera: null,
    mediaCallback: null
  };
}

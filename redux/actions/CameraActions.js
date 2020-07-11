import * as types from '../actions/ActionTypes';

export function showCamera(camera, pictureCallback, videoCallback){
  return {
    type: types.CAMERA_SHOWING, 
    camera,
    pictureCallback,
    videoCallback
  };
}

export function hideCamera(){
  return {
    type: types.CAMERA_SHOWING, 
    camera: null,
    pictureCallback: null,
    videoCallback: null
  };
}

import * as types from '../actions/ActionTypes';

export function showOverlay(overlay){
  return {type: types.OVERLAY_SHOWING, overlay};
}

export function hideOverlay(){
  return {type: types.OVERLAY_SHOWING, overlay: null};
}
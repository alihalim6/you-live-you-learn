import * as types from '../actions/ActionTypes';

export function showOverlay(overlay){
  return {type: types.OVERLAY_SHOWING, overlay};
}

export function hideOverlay(){
  return {type: types.OVERLAY_SHOWING, overlay: null};
}

export function showPopup(popup){
  return {type: types.POPUP_SHOWING, popup: popup};
}

export function hidePopup(){
  return {type: types.POPUP_SHOWING, popup: null};
}
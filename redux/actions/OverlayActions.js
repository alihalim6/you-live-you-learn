import * as types from '../actions/ActionTypes';

export function showOverlay(overlay){
  return {type: types.OVERLAY_SHOWING, overlay};
}

export function hideOverlay(){
  return {
  	type: types.OVERLAY_SHOWING, 
  	overlay: null,
  	popup: null
  };
}

export function showPopup(popup){
  return {
  	type: types.POPUP_SHOWING, 
  	overlay: true,
  	popup: popup
  };
}

export function hidePopup(){
  return {
  	type: types.POPUP_SHOWING, 
  	overlay: null,
  	popup: null
  };
}
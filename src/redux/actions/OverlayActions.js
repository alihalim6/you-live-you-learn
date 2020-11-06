import * as types from '../actions/ActionTypes';
import store from '../';
import {POPUP, PAGE} from '../../constants/AppConstants';

/*function getCurrentOverlay(){
	const currentState = store.getState();

	return currentState.overlay.currentOverlay;
}

function getPreviousOverlay(){
	const currentState = store.getState();

	return (currentState.overlay.currentOverlay ? currentState.overlay.currentOverlay.previousOverlay : null);
}

function getPreviousPopup(){
	const currentState = store.getState();

	return (currentState.overlay.currentOverlay ? currentState.overlay.currentOverlay.previousPopup : null);
}*/

export function showOverlay(overlay){
  //return {type: types.OVERLAY_SHOWING, overlay};
  return {type: types.SHOW_OVERLAY, overlay};
}

export function navigateOverlay(overlay){
	return {type: types.NAVIGATE_OVERLAY, overlay};
}

export function closeOverlay(){
	/*const previousOverlay = getPreviousOverlay();
	const previousPopup = getPreviousPopup();
	const currentOverlay = getCurrentOverlay();
	const clearOverlay = (currentOverlay ? currentOverlay.clearable : false);

	if(previousPopup){
		return showPopup(previousPopup, clearOverlay);
	}

	if(previousOverlay){
		return showOverlay(previousOverlay);
	}

  return {type: types.OVERLAY_SHOWING, overlay: null};*/
  return {type: types.CLOSE_OVERLAY};
}
/*
export function showPopup(popup){
  //return {type: types.POPUP_SHOWING, popup};
  const popupShown = {...popup, type: POPUP};

  return {type: types.SHOW_OVERLAY, popupShown};
}*/

//export function hidePopup(){
/*	const previousOverlay = getPreviousOverlay();

	if(!disablePreviousOverlay && previousOverlay){
		return showOverlay(previousOverlay);
	}

  return {type: types.POPUP_SHOWING, popup: null};*/
/*  return {type: types.HIDE_OVERLAY};
}*/

export function clearOverlays(){
	return {type: types.CLEAR_OVERLAYS};
}

export function overlayInvisible(invisible){
	return {type: types.OVERLAY_INVISIBLE, invisible};
}
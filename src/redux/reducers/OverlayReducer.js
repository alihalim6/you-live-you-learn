import * as types from '../actions/ActionTypes';

export default function(state = {}, action){
  switch(action.type){
  	case types.OVERLAY_SHOWING :
  	  return {...state, currentOverlay: action.overlay};
  	case types.POPUP_SHOWING :
  	  return {...state, currentPopup: action.popup};
  	default :
  	  return state;
  }
}
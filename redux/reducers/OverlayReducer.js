import * as types from '../actions/ActionTypes';

export default function(state = {}, action){
  switch(action.type){
  	case types.OVERLAY_SHOWING :
  	  return {
  	  	...state,
				currentPopup: action.popup,
  	  	currentOverlay: action.overlay
  	  };
  	case types.POPUP_SHOWING :
  	  return {
  	  	...state, 
  	  	currentPopup: action.popup,
  	  	currentOverlay: action.overlay
  	  };
  	default :
  	  return state;
  }
}
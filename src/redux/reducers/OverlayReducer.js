import * as types from '../actions/ActionTypes';

export default function(state = {nav: []}, action){
  switch(action.type){
  	/*case types.OVERLAY_SHOWING :
  	  return {...state, currentOverlay: action.overlay};
  	case types.POPUP_SHOWING :
  	  return {...state, currentPopup: action.popup};*/
    case types.SHOW_OVERLAY :
      state.nav.push(action.overlay);
      return {...state, nav: state.nav};
    case types.NAVIGATE_OVERLAY :
      state.nav.splice((state.nav.length - 1), 1, action.overlay);
      return {...state, nav: state.nav};
    case types.CLOSE_OVERLAY :
      state.nav.pop();
      return {...state, nav: state.nav};
    case types.CLEAR_OVERLAYS : 
      return {...state, nav: []};
  	case types.OVERLAY_INVISIBLE :
  	 	return {...state, overlayInvisible: action.invisible}
  	default :
  	  return state;
  }
}
import * as types from '../actions/ActionTypes';

export default function(state = {}, action){
  switch(action.type){
  	case types.OVERLAY_SHOWING :
  	  return {...state, currentOverlay: action.overlay};
  	default :
  	  return state;
  }
}
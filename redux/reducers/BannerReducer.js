import * as types from '../actions/ActionTypes';

export default function(state = {}, action){
  switch(action.type){
  	case types.BANNER_SHOWING :
  	  return {...state, currentBanner: action.banner};
  	default :
  	  return state;
  }
}
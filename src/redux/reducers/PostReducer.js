import * as types from '../actions/ActionTypes';

export default function(state = {}, action){
  switch(action.type){
  	case types.POST_PAGE :
  	  return {...state, page: action.page};
  	default :
  	  return state;
  }
}
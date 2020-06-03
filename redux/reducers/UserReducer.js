import * as types from '../actions/ActionTypes';

export default function(state = {}, action){
  switch(action.type){
  	case types.SET_USER_PROFILE_IMAGE :
  	  return {...state, profileImage: action.profileImage};
  	case types.SET_USERNAME :
  	  return {...state, username: action.username};
  	case types.SET_USER_FOLLOWERS :
  	  return {...state, followers: action.followers};
  	case types.SET_USER_FOLLOWING :
  	  return {...state, following: action.following};
  	default :
  	  return state;
  }
}
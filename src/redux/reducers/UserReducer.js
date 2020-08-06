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
    case types.SET_USER_SIGNED_IN :
      if(action.signedIn){
        return {...state, signedIn: true};
      }
      //clear profile image in addition
      else{
        return {
          ...state,
          signedIn: false,
          profileImage: null
        };
      }
    case types.SET_USER_SIGNED_UP :
      return {...state, signedUp: action.signedUp};
    case types.SET_USER_ID :
      return {...state, userId: action.userId};
  	default :
  	  return state;
  }
}
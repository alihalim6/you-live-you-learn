import * as types from '../actions/ActionTypes';

export function setUserProfileImage(profileImage){
  return {type: types.SET_USER_PROFILE_IMAGE, profileImage};
}

export function setUsername(username){
  return {type: types.SET_USERNAME, username};
}

export function setUserFollowers(followers){
  return {type: types.SET_USER_FOLLOWERS, followers};
}

export function setUserFollowing(following){
  return {type: types.SET_USER_FOLLOWING, following};
}
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

export function setUserSignedIn(signedIn){
  return {type: types.SET_USER_SIGNED_IN, signedIn};
}

export function setUserSignedUp(signedUp){
  return {type: types.SET_USER_SIGNED_UP, signedUp};
}

export function setUserId(userId){
  return {type: types.SET_USER_ID, userId};
}
import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import RNFetchBlob from 'rn-fetch-blob';
import {Buffer} from 'buffer';
import AsyncStorage from '@react-native-community/async-storage';
import config from '../server/config';
import account from '../server/account.json';
import {
	serverHost, 
	USER_ID, 
	USER_SIGNED_UP, 
	USER_SIGNED_IN, 
	PROFILE_IMAGE, 
	HTTP_GET,
	ERROR_COLOR,
	handleAsyncStorageError,
	HTTP_200,
	configureProfileImagePath
} from '../constants/AppConstants';
import store from '../redux';
import {
	setUserProfileImage,
	setUsername, 
	setUserFollowers, 
	setUserFollowing, 
	setUserSignedIn,
	setUserId
} from '../redux/actions/UserActions';
import {showBanner} from '../redux/actions/BannerActions';
import mapError from '../utilities/ErrorMapper';

function setUserInfo(user, signedIn){
	AsyncStorage.setItem(USER_ID, user.uid, handleAsyncStorageError);
 	store.dispatch(setUserId(user.uid));
 	
 	if(signedIn){
 		AsyncStorage.setItem(USER_SIGNED_IN, signedIn.toString(), handleAsyncStorageError);
		store.dispatch(setUserSignedIn(signedIn));
 	}

 	store.dispatch(setUsername(user.displayName));
 	//store.dispatch(setUserFollowers(user.displayName));
 	//store.dispatch(setUserFollowing(user.displayName));
}

function getUserId(){
	const currentStore = store.getState();
  return currentStore.user.userId;
}

function handleError(errorMessage){
	let message = errorMessage;
	
	if(typeof errorMessage === 'object'){
		message = errorMessage.error.message;
	}

	store.dispatch(showBanner({
		color: ERROR_COLOR,
		message: mapError(message)
	}));
}

async function getProfileImage(userId){
	const userProfileImage = await AsyncStorage.getItem(PROFILE_IMAGE, handleAsyncStorageError);
	let profileImagePath = null;

	//check for image on server if not saved locally on device (no/deleted pic, different device than one pic taken on, etc)
	if(!userProfileImage){
		await RNFetchBlob.fetch(HTTP_GET, `http://${serverHost}:${config.serverPort}${config.user.serverEndpoint}${config.user.getProfileImage}${userId}.jpg`).then(response => {
	    if(response.info().status === HTTP_200){
	    	profileImagePath = configureProfileImagePath(response.base64());
	    	AsyncStorage.setItem(PROFILE_IMAGE, profileImagePath, handleAsyncStorageError);
	  	}
	  }).catch(error => {
 			handleError(config.user.retrieveProfileImageError);
	  });
	}
	else{
		profileImagePath = userProfileImage;
	}

  store.dispatch(setUserProfileImage(profileImagePath));
}

export async function initializeUser(){
	const userId = await AsyncStorage.getItem(USER_ID, handleAsyncStorageError);
	const userSignedIn = await AsyncStorage.getItem(USER_SIGNED_IN, handleAsyncStorageError);

	if(userId){
		try{
	    const response = await axios(`http://${serverHost}:${config.serverPort}${config.user.serverEndpoint}${config.user.getUser}`, {
	  	  params: {
	  		  userId
	  		}
	  	});

	  	console.log('user ' + JSON.stringify(response.data));
	   	console.log('signed in ' + userSignedIn);

	   	setUserInfo(response.data, userSignedIn);
	   	getProfileImage(userId);
	  }
	 	catch(error){
	 		handleError(error.response.data);
	 	}
 	}

}

export async function signUpUser(username, password, profileImageURL){
  try{
  	const userId = getUserId();

    const response = await axios(`http://${serverHost}:${config.serverPort}${config.user.serverEndpoint}${config.user.signUpUser}`, {
  	  params: {
  		  username,
  		  password,
  		  userId,
  		  //profileImageURL: 'https://i.picsum.photos/id/1049/200/300.jpg'
  	  }
  	});

    setUserInfo(response.data, true);
    return true;
  }
 	catch(error){
 		handleError(error.response.data);
 		return false;
 	}
}


//!!!!!!!!!!
//TODO: ABILITY TO UPDATE USERNAME (SETTINGS?)
//!!!!!!!!!!


export async function signInUser(username, password){
  try{
    const response = await axios(`http://${serverHost}:${config.serverPort}${config.user.serverEndpoint}${config.user.signInUser}`, {
  	  params: {
  		  username,
  		  password
  	  }});

   	setUserInfo(response.data, true);
   	getProfileImage(response.data.uid);
  }
 	catch(error){
 		handleError(error.response.data);
 	}
}

/*function determineImageType(uri){
	const typeMapping = {
		jpg: 'image/jpeg',
		png: 'image/png'
	}

	return uri.substring(uri.length - 3);
}*/

export async function setProfileImage(picture){
	try{
		let data = new FormData();
		let userId = getUserId();
		let anonymousSignUpResponse = null;

  	if(!userId){
  		anonymousSignUpResponse = await axios.post(`${config.user.accountsEndpoint}${config.user.anonymousSignUp}?key=${account.apiKey}`, {
    		returnSecureToken: true
  		});

  		userId = anonymousSignUpResponse.data.localId;

	    //only update userId as user could be newly created (all other user data is already stored)
			store.dispatch(setUserId(userId));
	 		AsyncStorage.setItem(USER_ID, userId, handleAsyncStorageError);
  	}

  	data.append(USER_ID, userId);

  	data.append('profileImage', {
  		uri: picture.uri,
  		name: 'profileImage',
  		type: 'image/jpeg'///////////TODO: UPLOAD SCREENSHOT FROM IOS AS THAT APPARENTLY IS PNG
  	});

    await axios.post(`http://${serverHost}:${config.serverPort}${config.user.serverEndpoint}${config.user.setProfileImage}`, data, {
	  	headers: {
	  		'content-type': 'multipart/form-data'
	  	}
		});
  }
  catch(error){
 		handleError(error.response.data);
 	}
}

export async function removeProfileImage(){
	try{
		let userId = getUserId();

		await axios(`http://${serverHost}:${config.serverPort}${config.user.serverEndpoint}${config.user.removeProfileImage}`, {
			params: {
				profileImage: `${userId}.jpg`
			}
		});
 	}
 	catch(error){
 		handleError(error.response.data);
 	}
}
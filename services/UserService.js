import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import config from '../server/config';
import {serverHost} from '../constants/AppConstants';
import store from '../redux';
import {setUserProfileImage, setUsername, setUserFollowers, setUserFollowing} from '../redux/actions/UserActions';

export async function signUpUser(username, password){
  try{
    const response = await axios(`http://${serverHost}:${config.serverPort}${config.user.serverEndpoint}${config.user.signUpUser}`, {
  	  params: {
  		  username,
  		  password
  	  }});

	//10 unsuccessful login attempts locks user out
	//auto unlocked after 2 hours

	  response
	    .then(response => {
	  	  //if ok
	  	  return response.json();
	    })
	    .then(response => {
	  	  console.log(JSON.stringify(response));
	    })
	    .catch(error => {
	  	  console.log('user error: ' + error)
	    });

	     //sign in then update state
	//store.dispatch(setUsername())
  }
 catch(error){
 	console.log('caught error: ' + error);
 }
}
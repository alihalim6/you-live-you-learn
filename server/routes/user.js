import express from 'express';
import admin from 'firebase-admin';
import config from '../config.js';

const user = express.Router();

user.use(config.user.signUpUser, (req, res) => {
  admin.auth().createUser({
  	displayName: req.query.username,
  	password: req.query.password,
  	//photoURL: req.query.profileImageURL
  })
  .then(function(userRecord) {
    // See the UserRecord reference doc for the contents of userRecord.
    console.log('Successfully created new user:', userRecord.uid);
  })
  .catch(function(error) {
    console.log('Error creating new user:', error);
  });
});

export default user;
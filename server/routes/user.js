import express from 'express';
import axios from 'axios';
import admin from 'firebase-admin';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import config from '../config.js';
import account from '../account.json';

const user = express.Router();
const profileImagePath = (config.uploadPath + config.user.profileImagePath);

const storage = multer.diskStorage({
   destination: profileImagePath,
   filename: config.user.profileImageFileName
});

const upload = multer({storage});

function isDefined(param){
  return ((param !== 'null') && (param !== undefined));
}

function setUserEmail(username){
  return (username + config.appEmail);
}

function signInUser(username, password){
  const email = setUserEmail(username);

  return axios.post(`${config.user.accountsEndpoint}${config.user.signIn}?key=${account.apiKey}`, {
    email,
    password,
    returnSecureToken: true
  }).then(signedInUser => {
    return lookupUser(signedInUser.data.localId);
  }, error => {
    return Promise.reject(error.response.data.error.message);
  });
}

async function lookupUser(userId){
  return await admin.auth().getUser(userId);
}

function updateUser(res, next, userId, params){
  admin.auth().updateUser(userId, {
    email: params.email,
    displayName: params.displayName,
    password: params.password
  }).then(updatedUser => {
    res.json(updatedUser);
  }, error => {
    next(error.errorInfo.code);
  });
}

//reusable for delete account
function removeProfileImage(req, res, next){
  fs.unlink((profileImagePath + req.query.profileImage), error => {
    if(error){
      next(config.user.removeProfileImageError);
    }
    else{
      res.end();
    }
  });
}

/* SIGN UP */
user.use(config.user.signUpUser, (req, res, next) => {
  const params = {
    email: setUserEmail(req.query.username),
    displayName: req.query.username,
    password: req.query.password
  };

  if(isDefined(req.query.userId)){
    updateUser(res, next, req.query.userId, params);
  }
  else{
    admin.auth().createUser(params).then(userInfo => {
      signInUser(userInfo.displayName, req.query.password).then(() => {
        res.json(userInfo);
      }, error => {
        next(error);
      });
    }, error => {
      next(error.errorInfo.code);
    });
  }
});

/* SIGN IN */
user.use(config.user.signInUser, (req, res, next) => {
  signInUser(req.query.username, req.query.password).then(signedInUser => {
    res.json(signedInUser);
  }, error => {
    next(error);
  });
});

/* GET USER */
user.use(config.user.getUser, (req, res, next) => {
  lookupUser(req.query.userId).then(user => {
    res.json(user);
  }, error => {
    next(error.errorInfo.code);
  });
});

/* GET PROFILE IMAGE */
user.use(config.user.getProfileImage, express.static(profileImagePath));

/* SET PROFILE IMAGE */
user.use(config.user.setProfileImage, upload.single('profileImage'), (req, res) => {
  res.end();
});

/* REMOVE PROFILE IMAGE */
user.use(config.user.removeProfileImage, removeProfileImage);

export default user;
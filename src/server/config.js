import account from './account.json';

export default {
  //app
  userDatabaseURL: account.databaseURL,
  appEmail: '@yl2.com',

  //node
  serverPort: '9000',

  //disk
  uploadPath: 'src/server/uploads',////////

  user: {
    //server
    serverEndpoint: '/user',
    signUpUser: '/signUpUser',
    signInUser: '/signInUser',
    getProfileImage: '/getProfileImage/',
    setProfileImage: '/setProfileImage',
    removeProfileImage: '/removeProfileImage',
    getUser: '/getUser',
    updateUser: '/updateUser',

    //api
    accountsEndpoint: 'https://identitytoolkit.googleapis.com/v1/accounts:',
    signIn: 'signInWithPassword',
    anonymousSignUp: 'signUp',

    profileImagePath: '/profileImages/',
    profileImageFileName: function(req, file, cb){
      cb(null, (req.body.userId + '.jpg'));
    },

    //error
    retrieveProfileImageError: 'ERROR_RETRIEVING_PROFILE_IMAGE',
    removeProfileImageError: 'ERROR_REMOVING_PROFILE_IMAGE',

    //testing
    newlySignedUp: {
      
    }
  }
};
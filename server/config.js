export default {
  //app
  userDatabaseURL: 'https://you-live-you-learn.firebaseio.com/',
  
  //node
  serverPort: '9000',

  //api
  auth: {
    serverEndpoint: '/auth',
    init: '/init'
  },
  user: {
    serverEndpoint: '/user',
    signUpUser: '/signUpUser'
  }
};
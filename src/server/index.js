import express from 'express';
import cors from 'cors';
import admin from 'firebase-admin';
import config from './config.js';
import user from './routes/user.js';
import account from './account.json';
import errorHandler from './errorHandler.js';

admin.initializeApp({
  credential: admin.credential.cert(account),
  databaseURL: config.userDatabaseURL
});

const app = express();

//middleware
//app.use(express.json());
app.use(cors());

//endpoints
app.use(config.user.serverEndpoint, user);
app.use(errorHandler);

app.listen(config.serverPort, () => {
  console.log(`Server listening on port ${config.serverPort}`);
});
/**
 * @format
 */

import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider as ReduxProvider} from 'react-redux';
import store from './src/redux';

const YL2 = () => {
  return (
  	<ReduxProvider store={store}>
  	  <App/>
  	</ReduxProvider>
  );
};


AppRegistry.registerComponent(appName, () => YL2);

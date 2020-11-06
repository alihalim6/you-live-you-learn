import '@testing-library/jest-dom';
import * as AsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock';
import {setUserId, setUserSignedIn, setUserProfileImage} from '../src/redux/actions/UserActions';
//import {hideOverlay, hidePopup} from '../src/redux/actions/OverlayActions';
import {clearOverlays} from '../src/redux/actions/OverlayActions';
import store from '../src/redux';
import {IS_TEST} from '../src/constants/AppConstants';

beforeEach(() => {
  return AsyncStorage.setItem(IS_TEST, 'true');
});

afterEach(() => {
  store.dispatch(setUserId(null));
  store.dispatch(setUserSignedIn(false));
  store.dispatch(setUserProfileImage(null));
  /*store.dispatch(hideOverlay());
  store.dispatch(hidePopup());*/
  store.dispatch(clearOverlays());
  
  return AsyncStorage.clear();
});

jest.mock('@react-native-community/async-storage', () => {
  return require('@react-native-community/async-storage/jest/async-storage-mock');
});

//unable to get RNFetchBlob to work for tests, so nullify it;
//if no profile pic, no call to RNFetchBlob; if profile pic, use test path from AsyncStorage
jest.mock('rn-fetch-blob', () => {
  return {
    fetch: null
  }
});

global.console = {
  // toggle console.logs
  log: jest.fn(), 
  //log: console.log,

  // Keep native behaviour for other methods, use those to print out things in your own tests, not `console.log`
  error: console.error,
  warn: console.warn,
  info: console.info,
  debug: console.debug
};

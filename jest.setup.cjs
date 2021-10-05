import * as AsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock';
import {setUserId, setUserSignedIn} from './src/redux/actions/UserActions';
import store from './src/redux';

afterEach(() => {
	store.dispatch(setUserId(null));
	store.dispatch(setUserSignedIn(false));
	return AsyncStorage.clear();
});
import store from '../redux';
import AsyncStorage from '@react-native-community/async-storage';
import {PICTURE_CAMERA, isIOS, PROFILE_IMAGE, handleAsyncStorageError} from '../constants/AppConstants';
import {setProfileImage, removeProfileImage} from '../services/UserService';
import {setUserProfileImage} from '../redux/actions/UserActions';

const editProfileImageContainerTop = (isIOS ? '7%' : '5%');
const editProfileImageCloseButtonTop = (isIOS ? 26 : 13);

//immediately display picture taken using local file (or clear it)
function setLocalProfileImage(source){
	const storedSource = (source ? source : '');
	store.dispatch(setUserProfileImage(source));
	AsyncStorage.setItem(PROFILE_IMAGE, storedSource, handleAsyncStorageError);
}

function pictureCallback(picture){
	setLocalProfileImage(picture.uri);
	setProfileImage(picture);
}

export const NEW_PROFILE_IMAGE = {
	options: [
		{
			id: '1',
			label: 'TAKE A PROFILE PIC',
			usesCamera: true,
			cameraType: PICTURE_CAMERA,
			pictureCallback
		},
		{
			id: '2',
			label: 'UPLOAD A PROFILE PIC',
			isLast: true,
			handlerFn: () => {}
		}
	],
	containerStyles: {
		top: '7%',
		left: 45
	},
	closeButtonStyles: {
		top: 26,
    left: 235
	}
};

export const EDIT_PROFILE_IMAGE = {
	options: [
		{
			id: '1',
			label: 'TAKE A NEW PROFILE PIC',
			usesCamera: true,
			cameraType: PICTURE_CAMERA,
			pictureCallback
		},
		{
			id: '2',
			label: 'UPLOAD A DIFFERENT PROFILE PIC',
			handlerFn: () => {}
		},
		{
			id: '3',
			label: 'REMOVE PROFILE PIC',
			isLast: true,
			labelStyles: {
				color: 'red'
			},
			handlerFn: () => {
				setLocalProfileImage(null);
				removeProfileImage();
			}
		}
	],
	containerStyles: {
		top: editProfileImageContainerTop,
		left: 40
	},
	closeButtonStyles: {
		top: editProfileImageCloseButtonTop,
    left: 306
	}
};

//MAY BE NEEDED FOR OLDER ANDROID VERSIONS?
/*
export const ANDROID_CAMERA_PERMISSION = {
	title: 'ACCESS TO CAMERA',
	message: 'YL2 needs access to the camera for you to take pictures and videos',
	buttonPositive: 'OK',
	buttonNegative: 'CANCEL'         
};

export const ANDROID_AUDIO_PERMISSION = {
	title: 'ACCESS TO MICROPHONE',
	message: 'YL2 needs access to the microphone for you to record audio',
	buttonPositive: 'OK',
	buttonNegative: 'CANCEL'
};*/
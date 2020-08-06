import store from '../redux';
import AsyncStorage from '@react-native-community/async-storage';
import {PICTURE_CAMERA, isIOS, PROFILE_IMAGE, handleAsyncStorageError, TRANSPARENT_COLOR} from '../constants/AppConstants';
import {setProfileImage, removeProfileImage} from '../services/UserService';
import {setUserProfileImage} from '../redux/actions/UserActions';

const newProfileImageContainerMarginTop = (isIOS ? '19%' : '15%');
const editProfileImageContainerTop = (isIOS ? '39%' : '23%');

const newProfileImageCloseButtonTop = (isIOS ? 51 : 40);
const editProfileImageCloseButtonTop = (isIOS ? 38 : 14);

const defaultNewProfileImageCloseButtonLeft = (isIOS ? 264 : 282);
const defaultEditProfileImageCloseButtonLeft = (defaultNewProfileImageCloseButtonLeft + 25);

const profileImagePopupContainerTop = 0;

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

export const PROFILE_IMAGE_A11Y_LABEL = 'profile pic';
export const NO_PROFILE_IMAGE_A11Y_LABEL = 'no profile pic';
export const TAKE_A_PIC_A11Y_LABEL = 'take a pic';
export const UPLOAD_A_PIC_A11Y_LABEL = 'upload a pic';
export const TAKE_A_NEW_PIC_A11Y_LABEL = 'take a new pic';
export const UPLOAD_A_DIFFERENT_PIC_A11Y_LABEL = 'upload a different pic';
export const REMOVE_PIC_A11Y_LABEL = 'remove pic';

export const NEW_PROFILE_IMAGE = {
	options: [
		{
			id: '1',
			label: 'TAKE A PIC',
			a11yLabel: TAKE_A_PIC_A11Y_LABEL,
			usesCamera: true,
			cameraType: PICTURE_CAMERA,
			pictureCallback
		},
		{
			id: '2',
			label: 'UPLOAD A PIC',
			a11yLabel: UPLOAD_A_PIC_A11Y_LABEL,
			isLast: true,
			handlerFn: () => {}
		}
	],
	containerStyles: {
		top: profileImagePopupContainerTop
	},
	itemContainerStyles: {
		marginTop: newProfileImageContainerMarginTop,
		left: 58,
		alignSelf: 'flex-start'
	},
	closeButtonStyles: {
		top: newProfileImageCloseButtonTop,
    left: 228
	},
	defaultCloseButtonStyles: {
		left: defaultNewProfileImageCloseButtonLeft
	}
};

export const EDIT_PROFILE_IMAGE = {
	options: [
		{
			id: '1',
			label: 'TAKE A NEW PIC',
			a11yLabel: TAKE_A_NEW_PIC_A11Y_LABEL,
			usesCamera: true,
			cameraType: PICTURE_CAMERA,
			pictureCallback
		},
		{
			id: '2',
			label: 'UPLOAD A DIFFERENT PIC',
			a11yLabel: UPLOAD_A_DIFFERENT_PIC_A11Y_LABEL,
			handlerFn: () => {}
		},
		{
			id: '3',
			label: 'REMOVE PIC',
			a11yLabel: REMOVE_PIC_A11Y_LABEL,
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
		top: profileImagePopupContainerTop
	},
	itemContainerStyles: {
	  top: editProfileImageContainerTop,
		left: 38,
		alignSelf: 'flex-start'
	},
	closeButtonStyles: {
		top: editProfileImageCloseButtonTop,
    left: 262
	},
	defaultCloseButtonStyles: {
		left: defaultEditProfileImageCloseButtonLeft
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
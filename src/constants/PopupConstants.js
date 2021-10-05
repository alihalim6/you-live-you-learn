import store from '../redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showOverlay, closeOverlay} from '../redux/actions/OverlayActions';
import {
	isIOS, 
	PROFILE_IMAGE,
	handleAsyncStorageError,
	TRANSPARENT_COLOR,
	getCurrentPage,
	getCurrentPopup,
	PAGE,
	POPUP
} from '../constants/AppConstants';
import {PICTURE_CAMERA, PHOTO_GALLERY, GALLERY} from '../constants/CameraConstants';
import {setProfileImage, removeProfileImage} from '../services/UserService';
import {setUserProfileImage} from '../redux/actions/UserActions';

const newProfileImageContainerMarginTop = (isIOS ? '19%' : '15%');
const editProfileImageContainerTop = (isIOS ? '39%' : '23%');

const profileImagePopupContainerTop = 0;
const profileImagePopupLeft = 38;
const firstItemMarginTop = -28;

//immediately display picture using local file (or clear it)
function setLocalProfileImage(source){
	const storedSource = (source ? source : '');
	store.dispatch(setUserProfileImage(source));
	AsyncStorage.setItem(PROFILE_IMAGE, storedSource, handleAsyncStorageError);
}

function pictureCallback(picture){
	store.dispatch(closeOverlay());
	setLocalProfileImage(picture.uri);
	setProfileImage(picture);
}

function openPictureGallery(){
	store.dispatch(showOverlay({
		name: GALLERY,
		type: PAGE,
		galleryType: PHOTO_GALLERY,
		mediaCallback: pictureCallback,
		previousOverlay: getCurrentPage(),
		previousPopup: getCurrentPopup(),
		clearable: true
	}));
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
			label: 'TAKE PICTURE',
			a11yLabel: TAKE_A_PIC_A11Y_LABEL,
			usesCamera: true,
			cameraType: PICTURE_CAMERA,
			mediaCallback: pictureCallback,
			labelStyles: {
				marginTop: firstItemMarginTop
			}
		},
		{
			id: '2',
			label: 'CHOOSE PICTURE',
			a11yLabel: UPLOAD_A_PIC_A11Y_LABEL,
			isLast: true,
			handlerFn: openPictureGallery
		}
	],
	containerStyles: {
		top: profileImagePopupContainerTop
	},
	itemContainerStyles: {
		marginTop: newProfileImageContainerMarginTop,
		left: profileImagePopupLeft,
		alignSelf: 'flex-start'
	},
	type: POPUP
};

export const EDIT_PROFILE_IMAGE = {
	options: [
		{
			id: '1',
			label: 'TAKE PICTURE',
			a11yLabel: TAKE_A_NEW_PIC_A11Y_LABEL,
			usesCamera: true,
			cameraType: PICTURE_CAMERA,
			mediaCallback: pictureCallback,
			labelStyles: {
				marginTop: firstItemMarginTop
			}
		},
		{
			id: '2',
			label: 'CHOOSE PICTURE',
			a11yLabel: UPLOAD_A_DIFFERENT_PIC_A11Y_LABEL,
			handlerFn: openPictureGallery
		},
		{
			id: '3',
			label: 'REMOVE PICTURE',
			a11yLabel: REMOVE_PIC_A11Y_LABEL,
			isLast: true,
			labelStyles: {
				color: 'red'
			},
			handlerFn: () => {
				setLocalProfileImage(null);
				removeProfileImage();
				store.dispatch(closeOverlay());
			}
		}
	],
	containerStyles: {
		top: profileImagePopupContainerTop
	},
	itemContainerStyles: {
	  top: editProfileImageContainerTop,
		left: profileImagePopupLeft,
		alignSelf: 'flex-start'
	},
	type: POPUP
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
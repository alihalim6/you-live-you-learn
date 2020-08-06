import {randomColor} from 'randomcolor';
import store from '../redux';
import AsyncStorage from '@react-native-community/async-storage';
import {showBanner} from '../redux/actions/BannerActions';
import mapError from '../utilities/ErrorMapper';
import {Platform} from 'react-native';

//booleans
export const isIOS = (Platform.OS === 'ios');
export const isAndroid = (Platform.OS === 'android');

//strings

//REAL DEVICE
//export const serverHost = '192.168.2.13';
//EMULATOR
export const serverHost = (isIOS ? 'localhost' : '10.0.2.2');

export const HTTP_GET = 'GET';
export const HTTP_200 = 200;
export const BLUR_BACKGROUND_TYPE = 'dark';
export const BLUR_BACKGROUND_AMOUNT = 4;
export const BLUR_BACKGROUND_FALLBACK_COLOR = 'white';
export const USER_ID = 'userId';
export const USER_SIGNED_UP = 'userSignedUp';
export const USER_SIGNED_IN = 'userSignedIn';
export const PROFILE_IMAGE = 'profileImage';
export const IS_TEST = 'IS_TEST';

//colors
export const BASE_COLOR_DARK = 'black';
export const BASE_COLOR_LIGHT = 'white';
export const LIGHT_GRAY = '#DDDDDD';
export const BASE_GRAY = '#888888';
export const ERROR_COLOR = 'red';
export const TRANSPARENT_COLOR = 'transparent';

//numbers
export const BORDER_WIDTH = 2;
export const THICKER_BORDER_WIDTH = 3;
export const BORDER_RADIUS = 1;
export const COLOR_FADE_OPACITY = 0.1;
export const LOGO_ASPECT_RATIO = (354 / 735);

//overlays
export const SIGN_UP = 'SIGN_UP';
export const ABOUT = 'ABOUT';

//cameras
export const PICTURE_CAMERA = 'PICTURE_CAMERA';
export const VIDEO_CAMERA = 'VIDEO_CAMERA';

//functions
export function getRandomFadeColor(){
  return randomColor({
    format: 'rgba',
		alpha: COLOR_FADE_OPACITY
  });
}

export function getRandomDarkColor(){
	return randomColor({
		luminosity: 'dark'
	});
}

export function getRandomBrightColor(){
	return randomColor({
		luminosity: 'bright'
	});
}

export function configureProfileImagePath(path){
	return ('data:image/jpg;base64,' + path);
}

export function handleAsyncStorageError(errorMessage){
	store.dispatch(showBanner({
		color: ERROR_COLOR,
		message: mapError(errorMessage)
	}));
}

export async function isTest(){
	return await AsyncStorage.getItem(IS_TEST, handleAsyncStorageError);
}

//a11y
export const PROFILE_IMAGE_A11Y_LABEL = 'profile pic';
export const NO_PROFILE_IMAGE_A11Y_LABEL = 'no profile pic';
export const CAMERA_TAKE_PICTURE_A11Y_LABEL = 'press to take a picture';
export const CAMERA_ICON_A11Y_LABEL = 'camera icon';
export const MENU_USERNAME_A11Y_LABEL = 'username';
export const MENU_FOLLOW_A11Y_LABEL = 'following and followers';
export const MENU_FOLLOWING_A11Y_LABEL = 'number of following';
export const MENU_FOLLOWERS_A11Y_LABEL = 'number of followers';

//fonts
const APP_FONT_IOS = 'AppleSDGothicNeo-Regular';
const APP_FONT_BOLD_IOS = 'AppleSDGothicNeo-Bold';
const APP_FONT_ANDROID = 'sans-serif';
const APP_FONT_BOLD_ANDROID = 'sans-serif-medium';
export const appFont = (isIOS ? APP_FONT_IOS : APP_FONT_ANDROID);
export const appFontBold = (isIOS ? APP_FONT_BOLD_IOS : APP_FONT_BOLD_ANDROID);
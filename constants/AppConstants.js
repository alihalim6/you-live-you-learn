import {randomColor} from 'randomcolor';
import store from '../redux';
import {showBanner} from '../redux/actions/BannerActions';
import mapError from '../utilities/ErrorMapper';

//booleans
export const isIOS = (Platform.OS === 'ios');
export const isAndroid = (Platform.OS === 'android');

//strings

//REAL DEVICE
export const serverHost = '192.168.2.13';
//EMULATOR
//export const serverHost = (isIOS ? 'localhost' : '10.0.2.2');

export const HTTP_GET = 'GET';
export const HTTP_200 = 200;
export const BLUR_BACKGROUND_TYPE = 'dark';
export const BLUR_BACKGROUND_AMOUNT = 1;
export const BLUR_BACKGROUND_FALLBACK_COLOR = 'white';
export const USER_ID = 'userId';
export const USER_SIGNED_UP = 'userSignedUp';
export const USER_SIGNED_IN = 'userSignedIn';
export const PROFILE_IMAGE = 'profileImage';

//colors
export const BASE_COLOR_DARK = 'black';
export const BASE_COLOR_LIGHT = 'white';
export const LIGHT_GRAY = '#DDDDDD';
export const BASE_GRAY = '#888888';
export const ERROR_COLOR = 'red';

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

//fonts
const APP_FONT_IOS = 'AppleSDGothicNeo-Regular';
const APP_FONT_BOLD_IOS = 'AppleSDGothicNeo-Bold';
const APP_FONT_ANDROID = 'sans-serif';
const APP_FONT_BOLD_ANDROID = 'sans-serif-medium';
export const appFont = (isIOS ? APP_FONT_IOS : APP_FONT_ANDROID);
export const appFontBold = (isIOS ? APP_FONT_BOLD_IOS : APP_FONT_BOLD_ANDROID);
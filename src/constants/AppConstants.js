import {Animated, Easing} from 'react-native';
import {randomColor} from 'randomcolor';
import store from '../redux';
import {check, checkMultiple, PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import {Platform} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {showBanner} from '../redux/actions/BannerActions';
import mapError from '../utilities/ErrorMapper';

//booleans
export const isIOS = (Platform.OS === 'ios');
export const isAndroid = (Platform.OS === 'android');

//strings
//export const serverHost = '192.168.2.13';//REAL DEVICE
export const serverHost = (isIOS ? 'localhost' : '10.0.2.2');//EMULATOR

export const HTTP_GET = 'GET';
export const BLUR_BACKGROUND_TYPE = 'dark';
export const BLUR_BACKGROUND_TYPE_LIGHT = 'light';
export const BLUR_BACKGROUND_FALLBACK_COLOR = 'white';
export const USER_ID = 'userId';
export const USER_SIGNED_UP = 'userSignedUp';
export const USER_SIGNED_IN = 'userSignedIn';
export const PROFILE_IMAGE = 'profileImage';
export const IS_TEST = 'IS_TEST';
export const POPUP = 'POPUP';
export const PAGE = 'PAGE';

//objects
export const APP_PERMISSIONS = {
	camera: (isIOS ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA),
	gallery: (isIOS ? PERMISSIONS.IOS.PHOTO_LIBRARY : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE),
	microphone: (isIOS ? PERMISSIONS.IOS.MICROPHONE : PERMISSIONS.ANDROID.RECORD_AUDIO)
};

export const BUTTON_STYLES = {
	width: 150,
	padding: 9,
	marginTop: 8
};

//colors
export const BASE_COLOR_DARK = 'black';
export const BASE_COLOR_LIGHT = 'white';
export const LIGHT_GRAY = '#DDDDDD';
export const MID_GRAY = '#BBBBBB';
export const BASE_GRAY = '#888888';
export const ERROR_COLOR = 'red';
export const TRANSPARENT_COLOR = 'transparent';
export const BLACK_COLOR = 'black';

//numbers
export const OVERLAY_ANIM_KEYFRAME_LENGTH = 5;
export const HTTP_200 = 200;
export const BLUR_BACKGROUND_AMOUNT = 4;
export const BORDER_WIDTH = 2;
export const THICKER_BORDER_WIDTH = 3;
export const BORDER_RADIUS = 1;
export const COLOR_FADE_OPACITY = 0.1;
export const BUTTON_PADDING_TOP = (isIOS ? 4: 0);
export const searchBarPaddingLeft = 12;
export const FINAL_OVERLAY_Y = -255;
const SIGN_UP_ANIM_DURATION = 1400;
const SIGN_IN_ANIM_DURATION = 320;

//pages
export const SIGN_UP = 'SIGN_UP';
export const ABOUT = 'ABOUT';
//export const GALLERY = 'GALLERY';//circular dep with ErrorMapper
export const NEW_POST = 'NEW_POST';

//arrays
export const OVERLAY_ANIM_KEYFRAME_ARRAY = [...Array(OVERLAY_ANIM_KEYFRAME_LENGTH).keys()];
export const OVERLAY_HIDE_OPACITY = [1, 0.5, 0, 0, 0];
export const OVERLAY_REVEAL_OPACITY = [0, 0, 0, 0.5, 1];
export const OVERLAY_X = [0, -170, -240, -400, -600];
export const OVERLAY_Y = [0, -180, -245, FINAL_OVERLAY_Y, FINAL_OVERLAY_Y];

const signUpAnimationProps = {
	toValue: (OVERLAY_ANIM_KEYFRAME_LENGTH - 1),
	duration: SIGN_UP_ANIM_DURATION,
	easing: Easing.ease,
	useNativeDriver: false
}

//functions
export const signInAnimationProps = {
	toValue: (OVERLAY_ANIM_KEYFRAME_LENGTH - 1),
	duration: SIGN_IN_ANIM_DURATION,
	easing: Easing.ease,
	useNativeDriver: false
}

export function signUpAnimationFn(prop, delay){
	return Animated.timing(prop, {
		...signUpAnimationProps,
		delay
	});
}

export function signInAnimationFn(prop, delay){
	return Animated.timing(prop, {
		...signInAnimationProps,
		delay
	});
}

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

export function getRandomBrightColor(alpha){
	return randomColor({
		luminosity: 'bright',
		format: 'rgba',
		alpha
	});
}

export function getRandomAnimatedColor(){
	return OVERLAY_ANIM_KEYFRAME_ARRAY.map(() => {
		return getRandomBrightColor();
	});
}

export function configureProfileImagePath(path){
	return ('data:image/jpg;base64,' + path);
}

export function handleAsyncStorageError(errorMessage){
	//TODO: HAVE NOT SEEN AN ERROR MESSAGE PASSED IN; GET RID OF THIS?
}

export async function isTest(){
	return await AsyncStorage.getItem(IS_TEST, handleAsyncStorageError);
}

export async function hasPermission(permission, isRequest){
	const permissionValue = APP_PERMISSIONS[permission];
	//const isMultiplePermissions = false;//(typeof permissionValue === 'array');
	//const checkFn = (isMultiplePermissions ? checkMultiple : check);
	const checkFn = (isRequest ? request : check);

	try{
		let permissionResult = await checkFn(permissionValue);

/*TODO: adnroid write to storage permission needed?
		if(isMultiplePermissions){
			permissionResult = (permissionResult[permissionValue[0]] || permissionResult[1]);
		}*/

    switch(permissionResult){
      case RESULTS.UNAVAILABLE :
      case RESULTS.DENIED :
      case RESULTS.BLOCKED :
        return false;
      case RESULTS.GRANTED :
       return true;
      default :
        return false;
    }
  }
  catch(error){
    return false;
  }
}

export function interpolateOverlayAnimProp(prop, propOutput){
	return prop.interpolate({
	  inputRange: OVERLAY_ANIM_KEYFRAME_ARRAY,
	  outputRange: propOutput
	});
}

export function getCurrentPage(){
	const state = store.getState();
	const currentOverlay = state.overlay.nav.slice(-1);

	return currentOverlay.find(({type}) => (type === PAGE));
}

export function getCurrentPopup(){
	const state = store.getState();
	const currentOverlay = state.overlay.nav.slice(-1);

	return currentOverlay.find(({type}) => (type === POPUP));
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
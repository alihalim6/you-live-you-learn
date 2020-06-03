import {randomColor} from 'randomcolor';

//booleans
export const isIOS = (Platform.OS === 'ios');
export const isAndroid = (Platform.OS === 'android');

//strings
export const usernameRegex = {
  pattern: new RegExp(/[^-\w\.\@]/),
  invalidMessage: 'Invalid character(s)'
};

export const passwordRegex = {
  pattern: new RegExp(/(?=.*[0-9])(?=.*[A-Z])(?=.*[a-zA-Z])([a-zA-Z0-9]+)/),
  requirementMessage: '>= 8 characters, one of each: a-z A-Z 0-9',
  passwordsMatchMessage: 'Passwords must match'
};

export const PASSWORD_PLACEHOLDER = 'Password';
export const serverHost = (isIOS ? 'localhost' : '10.0.2.2');

//colors
export const BASE_COLOR_DARK = 'black';
export const BASE_COLOR_LIGHT = 'white';
export const BORDER_COLOR = '#DDDDDD';
export const BASE_GRAY = '#888888';
export const ERROR_COLOR = 'red';

//numbers
export const BORDER_WIDTH = 2;
export const THICKER_BORDER_WIDTH = 3;
export const BORDER_RADIUS = 2;
export const COLOR_FADE_OPACITY = 0.1;
export const LOGO_ASPECT_RATIO = (354 / 735);
export const MAX_USERNAME_LENGTH = 20;
export const MAX_PASSWORD_LENGTH = 50;

//overlays
export const SIGN_UP = 'SIGN_UP';
export const ABOUT = 'ABOUT';

//functions
export function getRandomFadeColor(){
  return randomColor({
    format: 'rgba',
	alpha: COLOR_FADE_OPACITY
  });
}

//fonts
const APP_FONT_IOS = 'AppleSDGothicNeo-Regular';
const APP_FONT_BOLD_IOS = 'AppleSDGothicNeo-Bold';
const APP_FONT_ANDROID = 'sans-serif';
const APP_FONT_BOLD_ANDROID = 'sans-serif-medium';

export const appFont = (isIOS ? APP_FONT_IOS : APP_FONT_ANDROID);
export const appFontBold = (isIOS ? APP_FONT_BOLD_IOS : APP_FONT_BOLD_ANDROID);
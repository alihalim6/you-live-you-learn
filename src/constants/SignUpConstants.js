import {Animated, Easing} from 'react-native';
import {getRandomBrightColor} from './AppConstants';

//strings
const MIN_PASSWORD_LENGTH = 8;

export const usernameRegex = {
  pattern: new RegExp(/[^-\w\.\@]/),
  invalidMessage: 'Invalid character(s)'
};

export const passwordRegex = {
  pattern: new RegExp(/(?=.*[0-9])(?=.*[A-Z])(?=.*[a-zA-Z])([a-zA-Z0-9]+)/),
  requirementMessage: '>= ' + MIN_PASSWORD_LENGTH + ' characters, one of each: a-z A-Z 0-9',
  passwordsMatchMessage: 'Passwords must match',
  minLength: MIN_PASSWORD_LENGTH
};

export const USERNAME_PLACEHOLDER = 'Username';
export const PASSWORD_PLACEHOLDER = 'Password';
export const CONFIRM_PASSWORD_PLACEHOLDER = 'Confirm Password';

//a11y
export const SIGN_UP_BUTTON_A11Y_LABEL = 'press to sign up';
export const SIGN_UP_LOADING_A11Y_LABEL = 'sign up in progess';

//numbers
export const MAX_USERNAME_LENGTH = 20;
export const MAX_PASSWORD_LENGTH = 50;
export const TRANSITION_TRANSLATEX_ANIM_DELAY = 600;

const TRANSITION_ANIM_KEYFRAME_LENGTH = 5;
const TRANSITION_ANIM_DURATION = 1700;


//arrays
export const TRANSITION_ANIM_KEYFRAME_ARRAY = [...Array(TRANSITION_ANIM_KEYFRAME_LENGTH).keys()];
export const TRANSITION_SCALEX_ANIM_OUTPUT = [0, 700, 1700, 2700, 3700];
export const TRANSITION_BAR_TRANSLATEX_ANIM_OUTPUT = [0, 1.3, 2.3, 3.3, 4.4];
export const TRANSITION_FORM_OPACITY_ANIM_OUTPUT = [1, 1, 0, 0, 0];
export const TRANSITION_FORM_TRANSLATEX_ANIM_OUTPUT = [0, -270, -540, -1000, -1200];

//objects
export const transitionAnimationProps = {
	toValue: (TRANSITION_ANIM_KEYFRAME_LENGTH - 1),
	duration: TRANSITION_ANIM_DURATION,
	easing: Easing.ease,
	useNativeDriver: false
}

//functions
export function transitionRandomColorAnimOutput(){
	return TRANSITION_ANIM_KEYFRAME_ARRAY.map(() => {
		return getRandomBrightColor();
	});
}

export function transitionAnimationFn(prop, delay){
	return Animated.timing(prop, {
		...transitionAnimationProps,
		delay
	});
}
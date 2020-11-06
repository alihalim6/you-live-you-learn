import {Easing} from 'react-native';

//styles
export const BANNER_HEIGHT = 42;
export const BANNER_INITIAL_TOP = -BANNER_HEIGHT;

//animation
export const ANIMATION_FRAME_LENGTH = 9;
export const ANIMATION_INPUT = [...Array(ANIMATION_FRAME_LENGTH).keys()];
export const ANIMATION_OUTPUT = [0, BANNER_HEIGHT, BANNER_HEIGHT, BANNER_HEIGHT, BANNER_HEIGHT, BANNER_HEIGHT, BANNER_HEIGHT, BANNER_HEIGHT, 0];
export const ANIMATION_DURATION = 4500;
export const ANIMATION_FUNCTION = Easing.elastic(0.48);
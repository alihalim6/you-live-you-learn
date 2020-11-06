import {Animated, Easing} from 'react-native';
import {OVERLAY_ANIM_KEYFRAME_ARRAY, OVERLAY_ANIM_KEYFRAME_LENGTH} from './AppConstants';
import {
  PICTURE_CAMERA, 
  VIDEO_CAMERA, 
  PHOTO_GALLERY, 
  VIDEO_GALLERY,
  PICTURE,
  VIDEO
} from '../constants/CameraConstants';

const POST_ANIM_DURATION = 400;

export const POST_PAGE_INITIAL_HEIGHT = 495;
export const POST_PAGE_FINAL_HEIGHT = 145;
export const POST_PAGE_INITIAL_TOP = 232;
export const TEXT_INPUT_PLACEHOLDER = 'What\'s new?';
export const MEDIA_TEXT_INPUT_PLACEHOLDER = 'Caption...';
export const URL_INPUT_PLACEHOLDER = 'URL...';
export const TAG_PLACEHOLDER = 'e.g. Science, Black History...';

//must be tall enough to contain buttons (for buttons to work on android)
export const POST_PAGE_HEIGHT = [495, 345, 185, POST_PAGE_FINAL_HEIGHT, POST_PAGE_FINAL_HEIGHT];

export const PICTURE_OPTION_CONFIG = {
  cameraType: PICTURE_CAMERA,
  galleryType: PHOTO_GALLERY,
  optionLabelCameraType: PICTURE,
  optionButtons: true
};

export const VIDEO_OPTION_CONFIG = {
	cameraType: VIDEO_CAMERA,
	galleryType: VIDEO_GALLERY,
	optionLabelCameraType: VIDEO,
	optionButtons: true
};

const postAnimationProps = {
	toValue: (OVERLAY_ANIM_KEYFRAME_LENGTH - 1),
	duration: POST_ANIM_DURATION,
	easing: Easing.ease,
	useNativeDriver: false
};

export const POST_CONFIG_OPTIONS = {
  postSubmitFormShowing: false,
  postConfigShowing: true,
  fromBackNav: true,
  postContainerPosition: 'relative'
};

export function postAnimationFn(prop, delay){
	return Animated.timing(prop, {
		...postAnimationProps,
		delay
	});
}
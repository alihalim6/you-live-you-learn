import {Animated, Easing} from 'react-native';
import {OVERLAY_ANIM_KEYFRAME_ARRAY, OVERLAY_ANIM_KEYFRAME_LENGTH, WHITE} from './AppConstants';
import {
  PICTURE_CAMERA, 
  VIDEO_CAMERA, 
  PHOTO_GALLERY, 
  VIDEO_GALLERY,
  PICTURE,
  VIDEO
} from '../constants/CameraConstants';

///////////////////
//not sure why I put comment lines: too fast?  or duplicate values?
const POST_ANIM_DURATION = 10;
const SELECT_POST_ANIM_DURATION = 10;

export const POST_PAGE_INITIAL_HEIGHT = 495;
export const POST_PAGE_FINAL_HEIGHT = 145;
export const POST_PAGE_INITIAL_TOP = 232;
export const TEXT_INPUT_PLACEHOLDER = 'What\'s new?';
export const MEDIA_TEXT_INPUT_PLACEHOLDER = 'Caption this...';
export const URL_INPUT_PLACEHOLDER = 'URL...';
export const TAG_PLACEHOLDER = 'e.g. Science, Black History...';
export const PUBLIC = 'PUBLIC';
export const PRIVATE = 'PRIVATE';
export const TEXT = 'TEXT';
export const COLOR = 'COLOR';
export const RECENTLY_USED = 'RECENTLY USED';
export const RECENTLY_USED_TAGS_PLACEHOLDER = 'Lorem ipsum you can see me fore you hear me.'
export const LIVE_AUDIO_LABEL = 'RECORD AUDIO';
export const UPLOAD_AUDIO_LABEL = 'UPLOAD AUDIO';
export const RECORD_AUDIO = 'RECORD_AUDIO';

//a11y

export const UNSELECTED_POST_TYPE_OPACITY = [1, 0.2, 0.2, 0.15, 0.15];
//must be tall enough to contain buttons (for buttons to work on android)
export const POST_PAGE_HEIGHT = [495, 345, 185, POST_PAGE_FINAL_HEIGHT, POST_PAGE_FINAL_HEIGHT];

export const PICTURE_OPTION_CONFIG = {
  galleryType: PHOTO_GALLERY
};

export const MEDIA_OPTION_CONFIG = {
  optionURL: true,
  captionPlaceholder: URL_INPUT_PLACEHOLDER
};

export const TEXT_OPTION_CONFIG = {
  captionPlaceholder: TEXT_INPUT_PLACEHOLDER,
  noPreview: true
};

const postAnimationProps = {
	toValue: (OVERLAY_ANIM_KEYFRAME_LENGTH - 1),
	duration: POST_ANIM_DURATION,
	easing: Easing.ease,
	useNativeDriver: false
};

const selectPostAnimationProps = {
  toValue: (OVERLAY_ANIM_KEYFRAME_LENGTH - 1),
  duration: SELECT_POST_ANIM_DURATION,
  easing: Easing.ease,
  useNativeDriver: false
};

export const POST_CONFIG_OPTIONS = {
  postSubmitFormShowing: false,
  postConfigShowing: true,
  fromBackNav: true,
  postContainerPosition: 'relative'
};

export const TAG_COLORS = [WHITE, '#ff2600', '#40c900', '#0873ff', '#fff712', '#ffbc36'];

export function postAnimationFn(prop){
	return Animated.timing(prop, postAnimationProps);
}

export function selectPostAnimationFn(prop){
  return Animated.timing(prop, selectPostAnimationProps);
}
import {Easing} from 'react-native';
import {OVERLAY_ANIM_KEYFRAME_LENGTH} from './AppConstants';

//strings
export const PHOTO_GALLERY = 'PHOTO_GALLERY';
export const VIDEO_GALLERY = 'VIDEO_GALLERY';
export const CAMERA_NOT_AUTHORIZED = 'CAMERA_NOT_AUTHORIZED';
export const INIT_USER_PROFILE_IMAGE = 'INIT_USER_PROFILE_IMAGE';
export const PICTURE = 'PICTURE';
export const VIDEO = 'VIDEO';
export const GALLERY = 'GALLERY';
export const ZERO_RECORDING_TIME = '0:00';

//numbers
export const MEDIA_UPLOAD_FETCH_FIRST = 99999;
export const MEDIA_FETCH_MORE_THRESHOLD = 0.9;
export const NUM_OF_MEDIA_INIT_RENDER = 6;
export const NUM_OF_VIEW_COLUMNS = 2;
export const MEDIA_FETCH_TO_TIME = 31556926000;//1 year

//animation
export const RECORDING_STATUS_OPACITY = [0, 1, 1, 1, 0];
export const RECORDING_STATUS_ANIM_DURATION = 2500;

export const recordingStatusAnimationProps = {
	toValue: (OVERLAY_ANIM_KEYFRAME_LENGTH - 1),
	duration: RECORDING_STATUS_ANIM_DURATION,
	easing: Easing.ease,
	useNativeDriver: false
};
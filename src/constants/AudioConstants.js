import {Animated, Easing} from 'react-native';

const audioTransitionAnimationProps = {
	toValue: 1,
	duration: 110,
	easing: Easing.ease,
	useNativeDriver: false
}

const audioOpacityAnimationProps = {
	toValue: 1,
	duration: 1000,
	easing: Easing.linear,
	useNativeDriver: false
}

export function audioTransitionAnimationFn(prop, delay){
	return Animated.timing(prop, {
		...audioTransitionAnimationProps,
		delay
	});
}

export function audioOpacityAnimationFn(prop, delay){
	return Animated.timing(prop, {
		...audioOpacityAnimationProps,
		delay
	});
}

export const RECORD_AUDIO = 'RECORD_AUDIO';
export const ZERO_RECORDING_TIME = '0:00';
export const PLAYBACK_REWIND_TIME = ':05';
export const PLAYBACK_REWIND_AMOUNT = 5000;
export const PLAYBACK_FAST_FORWARD_TIME = ':10';
export const PLAYBACK_FAST_FORWARD_AMOUNT = 10000;
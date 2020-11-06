import React from 'react';
import * as AsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock';
import {render} from '../testing/jest.app.js';
import {initializeUser} from '../src/services/UserService';
import Menu from '../src/components/Menu';
import {
	USER_ID,
	PROFILE_IMAGE_A11Y_LABEL,
	NO_PROFILE_IMAGE_A11Y_LABEL,
	PROFILE_IMAGE,
	MENU_USERNAME_A11Y_LABEL,
	MENU_FOLLOW_A11Y_LABEL
} from '../src/constants/AppConstants';
import {TAKE_A_PIC_A11Y_LABEL} from '../src/constants/PopupConstants';

const anonymousUserId = 'YCgfIL7IgbS36BNSE76dcJIv7mC2';
const signedUpUserId = 'D6t7HjaPL6M4NdVthx0ivyqZik83';
const anonymousProfileImage = '/Users/alihalim/Development/YL2/testing/profileImages/' + anonymousUserId + '.jpg';
const signedUpProfileImage = '/Users/alihalim/Development/YL2/testing/profileImages/' + signedUpUserId + '.jpg';

export async function getMenuItems(){
	const userId = await AsyncStorage.getItem(USER_ID);
	const navigation = {closeDrawer: jest.fn()};

	const {debug, queryByA11yLabel, queryByText} = render(<Menu navigation={navigation}/>, {});

	const noProfileImageItem = queryByA11yLabel(NO_PROFILE_IMAGE_A11Y_LABEL);
	const profileImageItem = queryByA11yLabel(PROFILE_IMAGE_A11Y_LABEL);
	const usernameItem = queryByA11yLabel(MENU_USERNAME_A11Y_LABEL);
	const followItem = queryByA11yLabel(MENU_FOLLOW_A11Y_LABEL);
	const liveMenuHeaderItem = queryByText('LIVE');
	const learnMenuHeaderItem = queryByText('LEARN');
	const signUpMenuItem = queryByText('Sign Up');
	const signOutMenuItem = queryByText('Sign Out');
	const takePicPopupItem = queryByA11yLabel(TAKE_A_PIC_A11Y_LABEL);

	return {
		debug,
		userId,
		noProfileImageItem,
		profileImageItem,
		usernameItem,
		followItem,
		liveMenuHeaderItem,
		learnMenuHeaderItem,
		signUpMenuItem,
		signOutMenuItem,
		takePicPopupItem
	};
}

export async function initializeAnonymousUserTest(hasProfileImage){
	await AsyncStorage.setItem(USER_ID, anonymousUserId);

	if(hasProfileImage){
		await AsyncStorage.setItem(PROFILE_IMAGE, anonymousProfileImage);
	}

	await initializeUser();
}
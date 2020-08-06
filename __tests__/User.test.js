import React from 'react';
import * as AsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock';
import {PICTURE_CAMERA} from '../src/constants/AppConstants';
import {initializeUser} from '../src/services/UserService';
import {render, fireEvent} from '../testing/jest.app.js';
import {getMenuItems, initializeAnonymousUserTest} from '../testing';
import {
	NEW_PROFILE_IMAGE, 
	EDIT_PROFILE_IMAGE,
	TAKE_A_PIC_A11Y_LABEL,
	REMOVE_PIC_A11Y_LABEL,
	TAKE_A_NEW_PIC_A11Y_LABEL
} from '../src/constants/PopupConstants';
import store from '../src/redux';
import Popup from '../src/components/Popup';

test('no user id should see you pic placeholder, new pic popup on placeholder press, live learn menu header and sign up', async () => {
	await initializeUser();

	const {userId, noProfileImageItem, liveMenuHeaderItem, learnMenuHeaderItem, signUpMenuItem} = await getMenuItems();
	let currentState = null;

	expect(userId).toBeFalsy();
	expect(noProfileImageItem).toBeTruthy();
	expect(liveMenuHeaderItem).toBeTruthy();
	expect(learnMenuHeaderItem).toBeTruthy();
	expect(signUpMenuItem).toBeTruthy();

	fireEvent.press(noProfileImageItem);

	currentState = store.getState();

	expect(currentState.overlay.currentPopup).toStrictEqual({
		...NEW_PROFILE_IMAGE,
		defaultPositioning: false
	});
});

describe('anonymous user', async () => {
	test('should have userId and see live learn menu header and sign up', async () => {
		await initializeAnonymousUserTest();
		const {userId, liveMenuHeaderItem, learnMenuHeaderItem, signUpMenuItem} = await getMenuItems();

		expect(userId).toBeTruthy();
		expect(liveMenuHeaderItem).toBeTruthy();
		expect(learnMenuHeaderItem).toBeTruthy();
		expect(signUpMenuItem).toBeTruthy();
	});

	test('removed profile pic should see you pic placeholder and new pic popup on placeholder press', async () => {
		await initializeAnonymousUserTest();
		const {noProfileImageItem} = await getMenuItems();
		let currentState = null;

		expect(noProfileImageItem).toBeTruthy();

		fireEvent.press(noProfileImageItem);

		currentState = store.getState();

		expect(currentState.overlay.currentPopup).toStrictEqual({
			...NEW_PROFILE_IMAGE,
			defaultPositioning: false
		});
	});

	test('has profile pic should see pic and edit pic popup on pic press', async () => {
		await initializeAnonymousUserTest(true);
		const {profileImageItem} = await getMenuItems();
		let currentState = null;

		expect(profileImageItem).toBeTruthy();

		fireEvent.press(profileImageItem);

		currentState = store.getState();
		
		expect(currentState.overlay.currentPopup).toStrictEqual({
			...EDIT_PROFILE_IMAGE,
			defaultPositioning: false
		});
	});
});

describe('profile image', async () => {
	test('no profile image should launch camera on take pic press', async () => {
		await initializeUser();
		const {noProfileImageItem} = await getMenuItems();
		let currentState = null;

		expect(noProfileImageItem).toBeTruthy();

		fireEvent.press(noProfileImageItem);

		const {getByA11yLabel} = render(<Popup/>, {});
		const takePicPopupItem = getByA11yLabel(TAKE_A_PIC_A11Y_LABEL);

		fireEvent.press(takePicPopupItem);

		currentState = store.getState();

		expect(currentState.camera.currentCamera).toBe(PICTURE_CAMERA);
	});

	//TODO: test exiting out of camera

	test('profile image should launch camera on take new pic press', async () => {
		await initializeAnonymousUserTest(true);
		const {profileImageItem} = await getMenuItems();
		let currentState = null;

		expect(profileImageItem).toBeTruthy();
		fireEvent.press(profileImageItem);

		const {getByA11yLabel} = render(<Popup/>, {});
		const takeNewPicPopupItem = getByA11yLabel(TAKE_A_NEW_PIC_A11Y_LABEL);
		fireEvent.press(takeNewPicPopupItem);

		currentState = store.getState();
		expect(currentState.camera.currentCamera).toBe(PICTURE_CAMERA);
	});

	test('profile image should be removed on remove pic press', async () => {
		await initializeAnonymousUserTest(true);
		let {profileImageItem} = await getMenuItems();

		expect(profileImageItem).toBeTruthy();

		fireEvent.press(profileImageItem);

		let {getByA11yLabel} = render(<Popup/>, {});
		const removePicPopupItem = getByA11yLabel(REMOVE_PIC_A11Y_LABEL);

		fireEvent.press(removePicPopupItem);

		({profileImageItem} = await getMenuItems());
		
		expect(profileImageItem).toBeFalsy();
	});
});
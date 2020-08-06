import React from 'react';
import {
	PICTURE_CAMERA,
	CAMERA_ICON_A11Y_LABEL,
	PROFILE_IMAGE_A11Y_LABEL
} from '../src/constants/AppConstants';
import {
	SIGN_UP_BUTTON_A11Y_LABEL,
	USERNAME_PLACEHOLDER,
	PASSWORD_PLACEHOLDER,
	CONFIRM_PASSWORD_PLACEHOLDER,
	SIGN_UP_LOADING_A11Y_LABEL
} from '../src/constants/SignUpConstants';
import {initializeUser} from '../src/services/UserService';
import {
	NEW_PROFILE_IMAGE, 
	EDIT_PROFILE_IMAGE,
	TAKE_A_PIC_A11Y_LABEL,
	REMOVE_PIC_A11Y_LABEL
} from '../src/constants/PopupConstants';
import store from '../src/redux';
import Popup from '../src/components/Popup';
import {getMenuItems, initializeAnonymousUserTest} from '../testing';
import {render, fireEvent, waitForElementToBeRemoved} from '../testing/jest.app.js';
import SignUp from '../src/components/SignUp';
import Menu from '../src/components/Menu';

async function initializeSignUp(){
	const {signUpMenuItem} = await getMenuItems();
	fireEvent.press(signUpMenuItem);
}

describe('profile image', async () => {
	test('no profile pic should see camera placeholder and camera launched on take pic press', async () => {
		await initializeUser();
		await initializeSignUp();

		let currentState = null;
		let {getByA11yLabel} = render(<SignUp/>, {});
		const noProfileImageItem = getByA11yLabel(CAMERA_ICON_A11Y_LABEL);

		expect(noProfileImageItem).toBeTruthy();

		fireEvent.press(noProfileImageItem);

		({getByA11yLabel} = render(<Popup/>, {}));
		const takePicPopupItem = getByA11yLabel(TAKE_A_PIC_A11Y_LABEL);

		fireEvent.press(takePicPopupItem);

		currentState = store.getState();

		expect(currentState.camera.currentCamera).toBe(PICTURE_CAMERA);
	});

	test('has profile pic should see pic then camera placeholder after removal', async () => {
		await initializeAnonymousUserTest(true);
		await initializeSignUp();

		let {getByA11yLabel} = render(<SignUp/>, {});
		const profileImageItem = getByA11yLabel(PROFILE_IMAGE_A11Y_LABEL);

		expect(profileImageItem).toBeTruthy();

		fireEvent.press(profileImageItem);

		({getByA11yLabel} = render(<Popup/>, {}));
		const removePicPopupItem = getByA11yLabel(REMOVE_PIC_A11Y_LABEL);

		fireEvent.press(removePicPopupItem);

	  ({getByA11yLabel} = render(<SignUp/>, {}));
		const noProfileImageItem = getByA11yLabel(CAMERA_ICON_A11Y_LABEL);

		expect(noProfileImageItem).toBeTruthy();
	});
});

describe('sign up form', async () => {
	test('incomplete form should not see sign up button', async () => {
		await initializeUser();
		await initializeSignUp();
		
		let {queryByA11yLabel, getByPlaceholderText} = render(<SignUp/>, {});
		let signUpButtonItem = queryByA11yLabel(SIGN_UP_BUTTON_A11Y_LABEL);

		expect(signUpButtonItem).toBeFalsy();

		const signUpUsernameItem = getByPlaceholderText(USERNAME_PLACEHOLDER);
		const signUpPasswordItem = getByPlaceholderText(PASSWORD_PLACEHOLDER);

		fireEvent.changeText(signUpUsernameItem, 'username1');
		fireEvent.changeText(signUpPasswordItem, 'Password2020');

		signUpButtonItem = queryByA11yLabel(SIGN_UP_BUTTON_A11Y_LABEL);

		expect(signUpButtonItem).toBeFalsy();
	});

	test('invalid form should not see sign up button', async () => {
		await initializeUser();
		await initializeSignUp();
		
		let {queryByA11yLabel, getByPlaceholderText, queryByPlaceholderText} = render(<SignUp/>, {});
		const signUpUsernameItem = getByPlaceholderText(USERNAME_PLACEHOLDER);
		const signUpPasswordItem = getByPlaceholderText(PASSWORD_PLACEHOLDER);

		//invalid username
		fireEvent.changeText(signUpUsernameItem, '$username1');
		fireEvent.changeText(signUpPasswordItem, 'Password2020');

		let signUpConfirmPasswordItem = getByPlaceholderText(CONFIRM_PASSWORD_PLACEHOLDER);

		fireEvent.changeText(signUpConfirmPasswordItem, 'Password2020');

		let signUpButtonItem = queryByA11yLabel(SIGN_UP_BUTTON_A11Y_LABEL);

		expect(signUpButtonItem).toBeFalsy();

		//invalid password
		fireEvent.changeText(signUpUsernameItem, 'username1');
		fireEvent.changeText(signUpPasswordItem, 'Pass');

		signUpConfirmPasswordItem = queryByPlaceholderText(CONFIRM_PASSWORD_PLACEHOLDER);
		signUpButtonItem = queryByA11yLabel(SIGN_UP_BUTTON_A11Y_LABEL);

		expect(signUpConfirmPasswordItem).toBeFalsy();
		expect(signUpButtonItem).toBeFalsy();

		//valid form
		fireEvent.changeText(signUpUsernameItem, 'username1');
		fireEvent.changeText(signUpPasswordItem, 'Password2020');

		signUpConfirmPasswordItem = queryByPlaceholderText(CONFIRM_PASSWORD_PLACEHOLDER);

		fireEvent.changeText(signUpConfirmPasswordItem, 'Password2020');

		signUpConfirmPasswordItem = queryByPlaceholderText(CONFIRM_PASSWORD_PLACEHOLDER);
		signUpButtonItem = queryByA11yLabel(SIGN_UP_BUTTON_A11Y_LABEL);

		expect(signUpConfirmPasswordItem).toBeTruthy();
		expect(signUpButtonItem).toBeTruthy();

		//invalid confirm password
		fireEvent.changeText(signUpConfirmPasswordItem, 'password2020');

		signUpButtonItem = queryByA11yLabel(SIGN_UP_BUTTON_A11Y_LABEL);

		expect(signUpButtonItem).toBeFalsy();
	});

	test('valid form should see sign up button', async () => {
		await initializeUser();
		await initializeSignUp();
		
		let {getByA11yLabel, getByPlaceholderText} = render(<SignUp/>, {});
		const signUpUsernameItem = getByPlaceholderText(USERNAME_PLACEHOLDER);
		const signUpPasswordItem = getByPlaceholderText(PASSWORD_PLACEHOLDER);

		fireEvent.changeText(signUpUsernameItem, 'username1');
		fireEvent.changeText(signUpPasswordItem, 'Password2020');

		const signUpConfirmPasswordItem = getByPlaceholderText(CONFIRM_PASSWORD_PLACEHOLDER);

		fireEvent.changeText(signUpConfirmPasswordItem, 'Password2020');

		const signUpButtonItem = getByA11yLabel(SIGN_UP_BUTTON_A11Y_LABEL);

		expect(signUpButtonItem).toBeTruthy();
	});
});

describe('submit sign up', async () => {
	test('no userid no profile pic should see you pic placeholder, username and followers in menu header and sign out in menu after sign up', async () => {
		await initializeUser();
		await initializeSignUp();
		
		let {getByA11yLabel, getByPlaceholderText} = render(<SignUp/>, {});
		const signUpUsernameItem = getByPlaceholderText(USERNAME_PLACEHOLDER);
		const signUpPasswordItem = getByPlaceholderText(PASSWORD_PLACEHOLDER);

		fireEvent.changeText(signUpUsernameItem, 'username1');
		fireEvent.changeText(signUpPasswordItem, 'Password2020');

		const signUpConfirmPasswordItem = getByPlaceholderText(CONFIRM_PASSWORD_PLACEHOLDER);

		fireEvent.changeText(signUpConfirmPasswordItem, 'Password2020');

		const signUpButtonItem = getByA11yLabel(SIGN_UP_BUTTON_A11Y_LABEL);

	  fireEvent.press(signUpButtonItem);

		await waitForElementToBeRemoved(() => getByA11yLabel(SIGN_UP_LOADING_A11Y_LABEL));//loading gif removed when sign up animation over
		const {noProfileImageItem, usernameItem, followItem, signOutMenuItem} = await getMenuItems();

		expect(noProfileImageItem).toBeTruthy();
		expect(usernameItem).toBeTruthy();
		expect(followItem).toBeTruthy();
		expect(signOutMenuItem).toBeTruthy();
	});
});

//SignUp.test.js
//on sign up expect
	//image to carry over onto sign up if has profile pic
	//sign up button to show only when creds valid
	//sign up success with valid mock
	//sign up fail with invalid mock
//if no signed in
	//sign up label
//if signed in
	//sign out label

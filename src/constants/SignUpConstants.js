//numbers
const MIN_PASSWORD_LENGTH = 8;

export const MAX_USERNAME_LENGTH = 20;
export const MAX_PASSWORD_LENGTH = 50;
export const COLOR_BAR_TRANSLATEX_ANIM_DELAY = 600;
export const TRANSLATEY_ANIM_DELAY = 240;
export const CHANGE_TITLE_ANIM_DELAY = 315;
export const FORM_FINAL_HEIGHT = 334;

//objects
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

//strings
export const USERNAME_PLACEHOLDER = 'Username';
export const PASSWORD_PLACEHOLDER = 'Password';
export const CONFIRM_PASSWORD_PLACEHOLDER = 'Confirm Password';
export const INVALID_INPUT = 'INVALID_INPUT';

//a11y
export const SIGN_UP_BUTTON_A11Y_LABEL = 'press to sign up'; 
export const SIGN_UP_LOADING_A11Y_LABEL = 'sign up in progess';

//arrays
export const COLOR_BAR_SCALE_X = [0, 700, 1700, 2700, 3700];
export const COLOR_BAR_X= [0, 1.3, 2.3, 3.3, 4.4];
export const SIGN_IN_TITLE_Y = [0, -25, -30, -40, -40];
export const PAGE_HEIGHT = [650, 390, 350, FORM_FINAL_HEIGHT, FORM_FINAL_HEIGHT];
import {
	appFontBold,
	appFont, 
	BORDER_WIDTH, 
	BASE_COLOR_DARK, 
	BORDER_RADIUS, 
	BASE_COLOR_LIGHT, 
	ERROR_COLOR, 
	BASE_GRAY,
	isIOS
} from '../constants/AppConstants';

const credentialsFieldPaddingTop = (isIOS ? 4 : 10);
const signUpButtonPaddingTop = (isIOS ? 4: 0);
const credentialsMessageFontSize = 12;
const transitionBarTop = (isIOS ? 65: 74);

const SignUpStyles = {
	title: {
	  marginBottom: 22
	},
	transitionBar: {
		width: 1,
		height: 14,
		position: 'absolute',
		backgroundColor: 'blue',
		top: transitionBarTop
	},
	form: {
	  flex: 1,
	  alignItems: 'center',
	  position: 'relative',
	  top: '3%'
	},
	prompt: {
    margin: 24,
    marginBottom: 8,
    marginTop: 28,
    fontFamily: appFont,
    color: BASE_COLOR_DARK,
    textAlign: 'center'
	},
	credentialsField: {
    width: '75%',
	  height: 44,
	  marginTop: 10,
	  marginBottom: 14,
	  borderWidth: BORDER_WIDTH,
	  borderTopWidth: 0,
	  borderLeftWidth: 0,
	  borderRightWidth: 0,
	  paddingTop: credentialsFieldPaddingTop,
	  paddingLeft: 12,
	  fontSize: 14,
	  fontFamily: appFont
	},
	signUpButton: {
	  width: 150,
	  padding: 9,
	  marginTop: 8,
	  backgroundColor: BASE_COLOR_DARK,
	  borderRadius: BORDER_RADIUS
	},
	signUpLabel: {
	  fontFamily: appFontBold,
	  fontSize: 20,
	  color: BASE_COLOR_LIGHT,
	  textAlign: 'center',
	  paddingTop: signUpButtonPaddingTop
	},
	invalidMessage: {
	  alignSelf: 'flex-end',
	  fontSize: credentialsMessageFontSize,
	  color: ERROR_COLOR,
	  marginRight: '13%'
	},
	centerMessage: {
	  alignSelf: 'center',
	  marginRight: 0
	},
	requirementMessage: {
	  fontSize: credentialsMessageFontSize,
      color: BASE_GRAY
	},
	loading: {
	  width: 90,
	  height: 90,
	  bottom: 14
	},
	errorMessage: {
		fontFamily: appFontBold,
		color: ERROR_COLOR,
		textAlign: 'center',
		padding: '5%'
	}
};

export default SignUpStyles;
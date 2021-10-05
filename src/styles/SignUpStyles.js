import {StyleSheet} from 'react-native';
import {
	appFontBold,
	appFont, 
	BORDER_WIDTH, 
	BASE_COLOR_DARK, 
	BORDER_RADIUS, 
	BASE_COLOR_LIGHT, 
	ERROR_COLOR, 
	BASE_GRAY,
	isIOS,
	BUTTON_STYLES,
	BUTTON_PADDING_TOP
} from '../constants/AppConstants';

const credentialsFieldPaddingTop = (isIOS ? 4 : 10);
const credentialsMessageFontSize = 12;
const transitionBarTop = (isIOS ? 65: 74);

const SignUpStyles = StyleSheet.create({
	title: {
	  marginBottom: 22
	},
	signInTitle: {
		marginTop: 40,
		marginBottom: 0
	},
	colorBar: {
		width: 1,
		height: 14,
		position: 'absolute',
		top: transitionBarTop
	},
	form: {
	  alignItems: 'center',
	  top: '3%',
	  height: 'auto',
	  paddingBottom: 200
	},
	profileImageText: {
		width: '100%'
	},
	prompt: {
    margin: 24,
    marginBottom: 18,
    marginTop: 28,
    fontSize: 16,
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
	submitButton: {
	  ...BUTTON_STYLES,
	  backgroundColor: BASE_COLOR_DARK,
	  borderRadius: BORDER_RADIUS
	},
	signUpLabel: {
	  fontFamily: appFontBold,
	  fontSize: 20,
	  color: BASE_COLOR_LIGHT,
	  textAlign: 'center',
	  paddingTop: BUTTON_PADDING_TOP
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
	},
	signInText: {
		fontFamily: appFontBold,
		color: BASE_COLOR_DARK,
		textDecorationLine: 'underline'
	},
	signInStyles: {
		height: 'auto'
	}
});

export default SignUpStyles;
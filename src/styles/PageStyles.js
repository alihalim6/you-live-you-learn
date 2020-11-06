import {StyleSheet} from 'react-native';
import {appFontBold, BASE_COLOR_LIGHT, BASE_COLOR_DARK, isIOS, BORDER_RADIUS} from '../constants/AppConstants';

const pageTop = (isIOS ? '2%' : '3%');
const pageButtonTop = (isIOS ? 20 : 29);
const touchableCloseSize = 50;

const pageButton = {
  width: touchableCloseSize,
  height: touchableCloseSize,
  position: 'absolute',
  top: pageButtonTop
};

const pageButtonEdgeMargin = 12;
const pageButtonThickness = 4;

const backButtonArrowLine = {
  width: 20,
  height: 4,
  left: 6
};

const PageStyles = StyleSheet.create({
  container: {
  	flex: 1,
    justifyContent: 'center'
  },
  page: {
  	position: 'relative',
  	top: pageTop,
  	alignSelf: 'center',
    width: '96%',
    height: '80%',
    borderRadius: BORDER_RADIUS,
    backgroundColor: BASE_COLOR_LIGHT,
    elevation: 15
  },
  scrollView: {
  	flexGrow: 1
  },
  closeButton: {
		...pageButton,
  	right: pageButtonEdgeMargin
  },
  closeButtonLine: {
  	width: pageButtonThickness,
  	height: 34,
  	position: 'absolute',
  	right: 23
  },
  closeButtonLineOne: {
  	transform: [{rotate: '45deg'}]
  },
  closeButtonLineTwo: {
  	transform: [{rotate: '135deg'}]
  },
  backButton: {
    ...pageButton,
    left: pageButtonEdgeMargin
  },
  arrowOneStyle: {
    marginTop: 14,
    marginLeft: 12,
    width: 30,
    height: pageButtonThickness
  },
  arrowTwoStyle: {
    ...backButtonArrowLine,
    transform: [{rotate: '135deg'}],
    top: -10,
    left: 6
  },
  arrowThreeStyle: {
    ...backButtonArrowLine,
    transform: [{rotate: '225deg'}],
    top: -2
  },
  title: {
  	color: BASE_COLOR_DARK,
  	fontSize: 38,
  	fontFamily: appFontBold,
  	paddingTop: '4.5%',
  	textAlign: 'center'
  }
});

const closeButtonOneStyle = [
	PageStyles.closeButtonLine, 
	PageStyles.closeButtonLineOne
];

const closeButtonTwoStyle = [
	PageStyles.closeButtonLine, 
	PageStyles.closeButtonLineTwo
];

export {PageStyles, closeButtonOneStyle, closeButtonTwoStyle};
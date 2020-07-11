import {StyleSheet} from 'react-native';
import {appFontBold, BASE_COLOR_LIGHT, BASE_COLOR_DARK, isIOS, BORDER_RADIUS} from '../constants/AppConstants';

const overlayTop = (isIOS ? '7%' : '8%');
const closeButtonTop = (isIOS ? 10 : 15);
const touchableCloseSize = 50;

const OverlayStyles = StyleSheet.create({
  container: {
  	flex: 1
  },
  overlay: {
  	position: 'relative',
  	top: overlayTop,
  	alignSelf: 'center',
    width: '96%',
    height: '89%',
    borderRadius: BORDER_RADIUS,
    backgroundColor: BASE_COLOR_LIGHT,
    elevation: 15
  },
  scrollView: {
  	flexGrow: 1
  },
  touchableClose: {
		width: touchableCloseSize,
  	height: touchableCloseSize,
  	position: 'absolute',
  	top: closeButtonTop,
  	right: 12
  },
  closeButton: {
  	width: 4,
  	height: 34,
  	position: 'absolute',
  	top: closeButtonTop,
  	right: 23
  },
  closeButtonLineOne: {
  	transform: [{rotate: '45deg'}]
  },
  closeButtonLineTwo: {
  	transform: [{rotate: '135deg'}]
  },
  title: {
  	color: BASE_COLOR_DARK,
  	fontSize: 38,
  	fontFamily: appFontBold,
  	paddingTop: '5%',
  	textAlign: 'center'
  }
});

const closeButtonOneStyle = [
	OverlayStyles.closeButton, 
	OverlayStyles.closeButtonLineOne
];

const closeButtonTwoStyle = [
	OverlayStyles.closeButton, 
	OverlayStyles.closeButtonLineTwo
];

export {OverlayStyles, closeButtonOneStyle, closeButtonTwoStyle};
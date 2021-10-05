import {StyleSheet} from 'react-native';
import {appFontBold, BASE_COLOR_LIGHT, BASE_COLOR_DARK, isIOS, BORDER_RADIUS} from '../constants/AppConstants';

const pageTop = (isIOS ? '2%' : '3%');
const buttonSize = 44;

const pageButton = {
  fontSize: buttonSize
};

const pageButtonEdgeMargin = 12;
const pageButtonThickness = 3;
const backButtonSize = 20;

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
  backButton: {
    ...pageButton,
    left: pageButtonEdgeMargin
  },
  title: {
  	color: BASE_COLOR_DARK,
  	fontSize: 38,
  	fontFamily: appFontBold,
  	paddingTop: '4.5%',
  	textAlign: 'center'
  },
  closeButton: {
    ...pageButton,
    right: pageButtonEdgeMargin
  },
  buttonContainer: {
    width: '100%',
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16
  }
});

export default PageStyles;
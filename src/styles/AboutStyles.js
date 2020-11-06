import {StyleSheet} from 'react-native';
import {appFont, appFontBold, BASE_COLOR_DARK, BASE_GRAY, LOGO_ASPECT_RATIO} from '../constants/AppConstants';

const AboutStyles = StyleSheet.create({
  container: {
  	flex: 1,
  	alignItems: 'center',
    justifyContent: 'flex-start'
  },
  appName: {
  	color: BASE_COLOR_DARK,
  	fontSize: 30,
  	fontFamily: appFontBold,
  	textAlign: 'center',
  	paddingBottom: 8,
    marginTop: 54
  },
  author: {
    paddingBottom: 48,
    fontFamily: appFont
  },
  version: {
  	color: BASE_GRAY,
    fontSize: 14,
    fontFamily: appFontBold,
  	paddingBottom: 20
  },
  rateReview: {
  	color: BASE_COLOR_DARK,
  	padding: 28,
  	paddingBottom: 110,
    fontFamily: appFont,
    textAlign: 'center'
  },
  dedication: {
  	position: 'absolute',
  	bottom: 20,
  	color: BASE_COLOR_DARK,
  	fontSize: 14,
  	fontStyle: 'italic',
  	fontFamily: appFont
  },
  page: {
    height: 'auto'
  }
});

export default AboutStyles;
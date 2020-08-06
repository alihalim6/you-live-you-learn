import {StyleSheet} from 'react-native';
import {appFont, appFontBold, BASE_COLOR_DARK, BASE_GRAY, LOGO_ASPECT_RATIO} from '../constants/AppConstants';

const AboutStyles = StyleSheet.create({
  container: {
  	flex: 1,
  	alignItems: 'center'
  },
  logo: {
  	width: '100%',
  	height: undefined,
  	aspectRatio: (LOGO_ASPECT_RATIO * 2.5),
  	marginTop: -34
  },
  appName: {
  	color: BASE_COLOR_DARK,
  	fontSize: 22,
  	fontFamily: appFontBold,
  	textAlign: 'center',
  	paddingBottom: 8
  },
  author: {
    paddingBottom: 28,
    fontFamily: appFont
  },
  version: {
  	color: BASE_GRAY,
    fontSize: 14,
    fontFamily: appFontBold,
  	paddingBottom: 6
  },
  rateReview: {
  	color: BASE_COLOR_DARK,
  	padding: 24,
  	paddingBottom: 50,
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
  heart: {
  	fontStyle: 'normal'
  }
});

export default AboutStyles;
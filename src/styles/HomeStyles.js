import {StyleSheet} from 'react-native';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import {
	BASE_COLOR_LIGHT, 
	MID_GRAY, 
	THICKER_BORDER_WIDTH, 
	appFontBold, 
	BASE_COLOR_DARK,
	LIGHT_GRAY
} from '../constants/AppConstants';
import {TAB_BAR_FONT_SIZE, TAB_BAR_BRAIN_ASPECT_RATIO, NUMBER_OF_CONTENT_TABS} from '../constants/HomeConstants';

const HomeStyles = StyleSheet.create({
  container: {
    flex: 1
  },
  tabBar: {
  	backgroundColor: BASE_COLOR_LIGHT,
  	height: 51
  },
  tabBarIndicator: {
  	backgroundColor: BASE_COLOR_DARK,
  	height: THICKER_BORDER_WIDTH
  },
  userTabBarIcon: {
  	width: 23,
  	height: 25
  },
  followingTabBarIcon: {
  	width: 38,
  	height: 40,
  	marginTop: -9
  },
  newsTabBarIcon: {
  	width: 27,
  	height: 30
  },
  tabBarLabel: {
    fontSize: TAB_BAR_FONT_SIZE,
    fontFamily: appFontBold,
    alignSelf: 'center',
    textAlign: 'center',
    paddingTop: 5,
    color: MID_GRAY,
    width: responsiveWidth(100 / NUMBER_OF_CONTENT_TABS)
  }
});

export default HomeStyles;
import {StyleSheet} from 'react-native';
import {BASE_COLOR_LIGHT, appFontBold} from '../constants/AppConstants';
import {BANNER_HEIGHT, BANNER_INITIAL_TOP} from '../constants/BannerConstants';

const BannerStyles = StyleSheet.create({
  container: {
    width: '100%',
    height: BANNER_HEIGHT,
    position: 'absolute',
    top: BANNER_INITIAL_TOP
  },
  text: {
    color: BASE_COLOR_LIGHT,
    fontSize: 12,
    fontFamily: appFontBold,
    textAlign: 'center',
    paddingTop: 26
  }
});

export default BannerStyles;
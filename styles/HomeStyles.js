import {StyleSheet} from 'react-native';
import {BASE_COLOR_LIGHT, BORDER_COLOR, BORDER_WIDTH} from '../constants/AppConstants';

const HomeStyles = StyleSheet.create({
  container: {
    flex: 1
  },
  blurBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
});

export default HomeStyles;
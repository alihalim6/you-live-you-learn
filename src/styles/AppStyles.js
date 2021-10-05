import {StyleSheet} from 'react-native';
import {BASE_COLOR_DARK} from '../constants/AppConstants';

const AppStyles = StyleSheet.create({
	blurBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  overlay: {
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    position: 'absolute',
    width: '100%',
    height: '150%'
  }
});

export default AppStyles;
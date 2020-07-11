import {StyleSheet} from 'react-native';
import {BASE_COLOR_DARK} from '../constants/AppConstants';

const CameraStyles = StyleSheet.create({
  container: {
    height: '100%'
  },
  pendingAuth: {
    height: '100%',
    backgroundColor: BASE_COLOR_DARK
  },
  takePicture: {
    width: 50,
    height: 50,
    backgroundColor: 'white',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 40,
    borderRadius: 100
  }
});

export default CameraStyles;
import {StyleSheet} from 'react-native';
import {BASE_COLOR_DARK, BASE_COLOR_LIGHT, isIOS} from '../constants/AppConstants';

const actionButtonSize = 75;
const closeButtonTop = (isIOS ? 40 : 28);

const CameraStyles = StyleSheet.create({
  container: {
    height: '100%'
  },
  pendingAuth: {
    height: '100%',
    backgroundColor: BASE_COLOR_DARK
  },
  actionContainer: {
    width: '100%',
    height: 120,
    backgroundColor: BASE_COLOR_DARK,
    opacity: 0.2,
    position: 'absolute',
    bottom: 0
  },
  actionButton: {
    width: actionButtonSize,
    height: actionButtonSize,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 20,
    borderRadius: 100
  },
  takePictureButton: {
    backgroundColor: 'white',
    zIndex: 1
  },
  closeButton: {
    top: closeButtonTop,
    right: 16
  },
  closeButtonStyle: {
    backgroundColor: BASE_COLOR_LIGHT
  }
});

export default CameraStyles;
import {StyleSheet} from 'react-native';
import {BASE_COLOR_DARK, BASE_COLOR_LIGHT, isIOS, appFontBold, THICKER_BORDER_WIDTH} from '../constants/AppConstants';

const actionButtonSize = 80;
const headerTop = (isIOS ? 34 : 28);
const actionButtonBottom = 34;
const actionLabelBottom = (actionButtonBottom + 80);
const redDotSize = 20;
const actionIconButtonPosition = 36;
const actionIconButtonSize = (actionButtonSize * 0.8);

const shadowStyles = {
  shadowColor: BASE_COLOR_DARK,
  shadowRadius: 18,
  shadowOpacity: 0.65,
  shadowOffset: {
    height: 1
  }
};

const actionButton = {
  ...shadowStyles,
  width: actionButtonSize,
  height: actionButtonSize,
  position: 'absolute',
  bottom: actionButtonBottom,
  borderRadius: 100
};

const actionIconButton = {
  ...actionButton,
  width: actionIconButtonSize,
  height: actionIconButtonSize,
  backgroundColor: 'transparent',
  borderColor: BASE_COLOR_LIGHT,
  borderWidth: THICKER_BORDER_WIDTH,
  justifyContent: 'center',
  alignItems: 'center'
};

const headerButton = {
  ...shadowStyles,
  fontSize: 38
};

const CameraStyles = StyleSheet.create({
  container: {
    height: '100%'
  },
  pendingAuth: {
    height: '100%',
    backgroundColor: BASE_COLOR_DARK
  },
  takePictureButton: {
    ...actionButton,
    backgroundColor: 'white',
    alignSelf: 'center'
  },
  reCaptureButton: {
    ...actionButton,
  },
  actionLabel: {
    ...shadowStyles,
    marginBottom: 12,
    fontFamily: appFontBold,
    fontSize: 14, 
    color: BASE_COLOR_LIGHT,
    alignSelf: 'center',
    position: 'absolute',
    bottom: actionLabelBottom
  },
  recordingStatusContainer: {
    paddingTop: 2,
    width: 100,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    opacity: 0
  },
  redDot: {
    width: redDotSize,
    height: redDotSize,
    borderRadius: 100,
    backgroundColor: 'red'
  },
  recordingStatusTime: {
    fontFamily: appFontBold,
    fontSize: 26,
    color: BASE_COLOR_LIGHT
  },
  headerContainer: {
    top: headerTop,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    width: '100%'
  },
  actionIcon: {
    fontSize: 40
  },
  reCaptureButtonContainer: {
    ...actionIconButton,
    left: actionIconButtonPosition
  },
  useCaptureButtonContainer: {
    ...actionIconButton,
    right: actionIconButtonPosition
  },
  rotateCameraButton: {
    ...headerButton
  },
  closeButton: {
    ...headerButton,
    alignSelf: 'flex-end'
  }
});

export default CameraStyles;
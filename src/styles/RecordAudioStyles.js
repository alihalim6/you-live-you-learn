import {StyleSheet} from 'react-native';
import {
  ACTION_RED, 
  BASE_COLOR_LIGHT, 
  BORDER_WIDTH,
  BASE_COLOR_DARK,
  appFont,
  appFontBold,
  BUTTON_STYLES,
  BUTTON_PADDING_TOP,
  BORDER_RADIUS,
  THICKER_BORDER_WIDTH,
  MID_GRAY,
  BASE_GRAY,
  LIGHT_GRAY
} from '../constants/AppConstants';

const recordButtonSize = 64;
const recordButtonDotSize = (recordButtonSize * .3);
const audioLineOpacity = 0.2;
const mainComponentMargin = 36;
const recordingActionFontSize = 16;
const recordingActionSize = 140;
const playButtonHeight = 32;
const playButtonLength = 54;
const timelineThickness = 3;
const recordingTimeMargin = 14;
const playbackControlMarginBottom = 30;
const seekControlSize = 34;
const seekArrowLength = 10;
const seekArrowHeight = 6;
const dotSize = 4;

const recordingActionLabelStyles = {
  textAlign: 'center',
  fontFamily: appFontBold,
  fontSize: recordingActionFontSize,
  color: BASE_COLOR_LIGHT,
  paddingTop: BUTTON_PADDING_TOP
};

const playbackSeekStyles = {
  borderRadius: 100,
  width: seekControlSize,
  height: seekControlSize,
  borderWidth: BORDER_WIDTH,
  borderTopColor: BASE_COLOR_DARK,
  justifyContent: 'center'
};

const playbackSeekArrowStyles = {
  width: 0,
  height: 0,
  backgroundColor: 'transparent',
  borderTopWidth: seekArrowHeight,
  borderBottomWidth: seekArrowHeight,
  borderTopColor: 'transparent',
  borderBottomColor: 'transparent',
  position: 'absolute',
  top: -5
};

function timelinePositionStyles(props){
  return {
    backgroundColor: props.pageRandomColor
  };
}

const RecordAudioStyles = StyleSheet.create({
  recordAudioContainer: {
    marginTop: 36,
    marginBottom: 46,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  recordButton: {
    width: recordButtonSize,
    height: recordButtonSize,
    borderRadius: 100,
    borderColor: ACTION_RED,
    borderWidth: BORDER_WIDTH,
    backgroundColor: BASE_COLOR_LIGHT,
    alignItems: 'center',
    justifyContent: 'center'
  },
  recordButtonDot: {
    width: recordButtonDotSize,
    height: recordButtonDotSize,
    backgroundColor: ACTION_RED,
    borderRadius: 100
  },
  pageStyles: {
    height: 'auto'
  },
  durationContainer: {
    opacity: 0
  },
  recordingDuration: {
    color: MID_GRAY,
    fontSize: 48,
    fontFamily: appFont
  },
  recordingDashboard: {
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  recordingActionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%'
  },  
  deleteRecording: {
    ...BUTTON_STYLES,
    width: recordingActionSize,
    borderWidth: BORDER_WIDTH,
    borderColor: MID_GRAY,
    borderRadius: BORDER_RADIUS
  },
  deleteRecordingLabel: {
    ...recordingActionLabelStyles,
    color: MID_GRAY
  },
  doneRecording: {
    ...BUTTON_STYLES,
    width: recordingActionSize,
    backgroundColor: BASE_COLOR_DARK,
    borderRadius: BORDER_RADIUS
  },
  doneRecordingLabel: {
    ...recordingActionLabelStyles,
    color: BASE_COLOR_LIGHT
  },
  playbackContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  playbackControl: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderLeftWidth: playButtonLength,
    borderTopWidth: playButtonHeight,
    borderBottomWidth: playButtonHeight,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: BASE_COLOR_DARK,
    marginBottom: playbackControlMarginBottom
  },
  pauseControlContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: 50,
    marginBottom: playbackControlMarginBottom
  },
  pauseControl: {
    backgroundColor: BASE_COLOR_DARK,
    width: 14,
    height: (playButtonHeight * 2)
  },
  recordingTimeContainer: {
    flexDirection: 'row',
    marginBottom: 10
  },
  recordingTime: {
    fontSize: 16,
    color: MID_GRAY,
    fontFamily: appFontBold,
    marginLeft: recordingTimeMargin,
    marginRight: recordingTimeMargin
  },
  timelineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '60%'
  },
  timeline: {
    width: '100%',
    height: timelineThickness,
    backgroundColor: MID_GRAY,
    borderRadius: BORDER_RADIUS
  },
  timelinePosition: {
    width: '100%',
    height: '100%',
    zIndex: 2,
    position: 'absolute',
    left: 0
  },
  playbackSeekContainer: {
    flexDirection: 'row',
    width: '40%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  rewindControlContainer: {
    ...playbackSeekStyles,
    borderRightColor: BASE_COLOR_DARK,
    borderLeftColor: 'transparent'
  },
  fastForwardControl: {
    ...playbackSeekStyles,
    borderRightColor: 'transparent',
    borderLeftColor: BASE_COLOR_DARK
  },
  playbackSeekTime: {
    fontFamily: appFontBold,
    alignSelf: 'center',
    paddingTop: 4
  },
  playbackRewindArrow: {
    ...playbackSeekArrowStyles,
    borderRightWidth: seekArrowLength,
    borderRightColor: BASE_COLOR_DARK,
    left: -1
  },
  playbackFastForwardArrow: {
    ...playbackSeekArrowStyles,
    borderLeftWidth: seekArrowLength,
    borderLeftColor: BASE_COLOR_DARK,
    left: 22
  },
  dot: {
    backgroundColor: BASE_COLOR_DARK,
    width: dotSize,
    height: dotSize,
    borderRadius: 100
  }
});

export {RecordAudioStyles, timelinePositionStyles};
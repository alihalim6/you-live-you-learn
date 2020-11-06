import {StyleSheet} from 'react-native';
import {
  appFontBold, 
  BASE_GRAY, 
  LIGHT_GRAY, 
  BASE_COLOR_LIGHT, 
  BORDER_WIDTH,
  BASE_COLOR_DARK,
  BUTTON_STYLES,
  BORDER_RADIUS,
  BUTTON_PADDING_TOP,
  appFont,
  searchBarPaddingLeft,
  isIOS
} from '../constants/AppConstants';

const postTypeIconSize = 40;
const inputBarPaddingTop = (isIOS ? 9 : 0);
const postConfigSideMargin = 14;
const postConfigBaseBottom = 385;
const optionElementTop = 20;
const inputBarTextTop = (isIOS ? 11 : 3);
const captionHeight = '100%';
const captionMarginTop = 30;
const expandMediaContainerSize = 30;
const expandMediaContainerMargin = 4;
const expandMediaSize = 24;
const textPostInputHeight = 100;
const optionButtonMargin = 16;

const optionLabel = {
  textAlign: 'center',
  fontFamily: appFont,
  fontSize: 20,
  color: BASE_COLOR_DARK,
  paddingTop: BUTTON_PADDING_TOP
};

const optionButtonContainer = {
  flexDirection: 'row',
  alignSelf: 'center',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginLeft: postConfigSideMargin,
  flex: 1,
  width: '90%'
};

function captionBarStyles(props){
  const styles = {};

  if(props.noPreview){
    styles.width = '90%';
    styles.height = textPostInputHeight;
    styles.alignSelf = 'stretch';
  }

  return styles;
}

function upperContainerStyles(props){
  const styles = {};

  if(props.noPreview){
    styles.height = textPostInputHeight;
    styles.flexDirection = 'column';
  }

  return styles;
}

const PostStyles = StyleSheet.create({
  prompt: {
    paddingTop: 20,
    paddingBottom: 16,
    textAlign: 'center',
    fontSize: 16,
    fontFamily: appFont,
    color: BASE_GRAY
  },
  postTypeContainer: {
    margin: 26,
    marginTop: 10,
    marginLeft: 86,
    zIndex: 1
  },
  postType: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  postTypeIconContainer: {
    padding: 8,
    borderRadius: 100,
    borderWidth: BORDER_WIDTH,
    borderColor: BASE_GRAY,
    marginRight: 12
  },
  postTypeIcon: {
    width: postTypeIconSize,
    height: postTypeIconSize    
  },
  optionLabel,
  optionButtonContainer,
  optionButton: {
    ...BUTTON_STYLES,
    backgroundColor: BASE_COLOR_DARK,
    color: BASE_COLOR_LIGHT,
    flex: 1,
    marginTop: optionElementTop,
    marginRight: optionButtonMargin
  },
  optionButtonLabel: {
    ...optionLabel,
    fontFamily: appFontBold,
    fontSize: 15,
    color: BASE_COLOR_LIGHT
  },
  postConfigContainer: {
    width: '100%'
  },
  postConfigContainerPrompt: {
    paddingTop: 54,
    paddingBottom: 0
  },
  postSubmitFormUpperContainer: {
    flexDirection: 'row',
    marginTop: captionMarginTop,
    height: 220,
    marginBottom: 26
  },
  postImageContainer: {
    width: '34%',
    marginLeft: postConfigSideMargin,
    marginRight: 20
  },
  postImage: {
    width: '100%',
    height: captionHeight
  },
  captionBar: {
    width: '46%',
    height: '78%',
    marginLeft: postConfigSideMargin,
    borderWidth: BORDER_WIDTH,
    borderColor: BASE_COLOR_DARK,
    paddingTop: inputBarPaddingTop,
    paddingLeft: searchBarPaddingLeft,
    backgroundColor: 'transparent'
  },
  caption: {
    fontSize: 16,
    fontFamily: appFontBold
  },
  postVisiblityButtonContainer: {
    ...optionButtonContainer,
    alignSelf: 'stretch',
    marginBottom: 24
  },
  postVisiblityButton: {
    backgroundColor: 'transparent',
    borderColor: BASE_COLOR_DARK,
    borderWidth: BORDER_WIDTH,
    color: BASE_COLOR_DARK,
    flex: 1,
    marginRight: optionButtonMargin,
    marginTop: 0
  },
  postVisiblityButtonLabel: {
    color: BASE_COLOR_DARK
  },
  configTitle: {
    fontSize: 18,
    fontFamily: appFontBold,
    color: BASE_COLOR_DARK,
    marginLeft: postConfigSideMargin,
    marginBottom: 10
  },
  inputBar: {
    width: '56%',
    height: 40,
    borderWidth: BORDER_WIDTH,
    borderColor: BASE_COLOR_DARK,
    paddingLeft: searchBarPaddingLeft,
    backgroundColor: 'transparent',
    marginLeft: postConfigSideMargin,
    marginBottom: 75
  },
  inputBarText: {
    fontFamily: appFontBold,
    top: inputBarTextTop
  },
  urlInputBar: {
    bottom: 0,
    marginTop: optionElementTop,
    alignSelf: 'center',
    left: 0,
    width: '80%'
  },
  expandMediaContainer: {
    backgroundColor: BASE_COLOR_LIGHT,
    position: 'absolute',
    top: expandMediaContainerMargin,
    right: expandMediaContainerMargin,
    width: expandMediaContainerSize,
    height: expandMediaContainerSize,
    opacity: 0.7
  },
  expandMedia: {
   width: expandMediaSize,
   height: expandMediaSize,
   marginTop: 2,
   marginLeft: 2
  },
  submitButton: {
    alignSelf: 'center',
    marginBottom: 20
  }
});

export {PostStyles, captionBarStyles, upperContainerStyles};
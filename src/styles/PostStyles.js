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
  isIOS,
  THICKER_BORDER_WIDTH,
  BASE_COLOR_GREEN,
  WHITE,
  STRONGER_BORDER_RADIUS,
  MID_GRAY
} from '../constants/AppConstants';
import {PUBLIC, PRIVATE} from '../constants/PostConstants';

const postTypeIconSize = 36;
const inputBarPaddingTop = (isIOS ? 9 : 0);
const postConfigSideMargin = 12
const postConfigBaseBottom = 385;
const optionElementTop = 20;
const captionHeight = '100%';
const expandMediaContainerSize = 30;
const expandMediaContainerMargin = 4;
const expandMediaSize = 24;
const textPostInputHeight = 120;
const optionButtonMargin = 16;
const postImageSize = 120;
const postVisiblityIconSize = 18;
const addTextTagIconSize = 28;
const tagColorSize = 28;
const tagSelectionMarginBottom = 22;
const tagSelectionContainerHeight = 40;
const removeTextTagIconSize = 20;
const colorTagIndicatorSize = 14;

const optionButtonContainer = {
  flexDirection: 'row',
  alignSelf: 'center',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginLeft: postConfigSideMargin,
  width: '90%'
};

const textTag = {
  backgroundColor: BASE_COLOR_DARK,
  borderRadius: STRONGER_BORDER_RADIUS,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginRight: 14,
  marginBottom: tagSelectionMarginBottom
};

const tagLabel = {
  color: BASE_COLOR_LIGHT,
  fontFamily: appFontBold,
  fontSize: 16,
  padding: 10
};

function captionBarStyles(props, state){
  const styles = {};

  if(props.noPreview){
    styles.width = '90%';
    styles.height = textPostInputHeight;
    styles.alignSelf = 'stretch';
    styles.marginLeft = postConfigSideMargin;
  }

  if(state.captionBlurred){
    styles.borderWidth = 0;
  }
  else{
    styles.borderWidth = BORDER_WIDTH;
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

function postVisiblityDisabledLabel(disabled){
  const styles = {};

  if(disabled){
    styles.color = LIGHT_GRAY;
  }

  return styles;
}

function tagTypeStyles(state, type){
  const styles = {};

  if(state.viewingTagType === type){
    styles.textDecorationLine = 'underline';
  }

  return styles;
}

function tagColorStyles(state, color){
  const styles = {backgroundColor: color};

  if(color === WHITE){
    styles.borderWidth = 1;
    styles.borderColor = BASE_COLOR_DARK;
  }

  if(state.tagColorSelected === color){
    styles.borderWidth = THICKER_BORDER_WIDTH;
    styles.borderColor = BASE_COLOR_DARK;
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
    zIndex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
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
    borderColor: BASE_GRAY
  },
  postTypeIcon: {
    fontSize: postTypeIconSize  
  },
  postTypeImage: {
    width: postTypeIconSize,
    height: postTypeIconSize
  },
  optionButtonContainer: {
    ...optionButtonContainer,
    flexDirection: 'column',
    marginTop: -38
  },
  optionDivider: {
    borderWidth: BORDER_WIDTH,
    borderColor: LIGHT_GRAY,
    width: '40%',
    borderWidth: 1
  },
  optionLabel: {
    fontFamily: appFontBold,
    fontSize: 16,
    color: BASE_COLOR_DARK,
    padding: 18
  },
  optionButton: {
    ...BUTTON_STYLES,
    backgroundColor: BASE_COLOR_DARK,
    color: BASE_COLOR_LIGHT,
    marginTop: optionElementTop,
    marginRight: optionButtonMargin
  },
  buttonLabel: {
    textAlign: 'center',
    fontFamily: appFontBold,
    fontSize: 20,
    paddingTop: BUTTON_PADDING_TOP,
    fontFamily: appFontBold,
    fontSize: 15,
    color: BASE_COLOR_LIGHT
  },
  postConfigContainerPrompt: {
    paddingTop: 54,
    paddingBottom: 0
  },
  postSubmitFormUpperContainer: {
    flexDirection: 'row',
    marginTop: 20,
    height: postImageSize,
    marginBottom: 30,
  },
  postImageContainer: {
    marginLeft: postConfigSideMargin,
    marginRight: 16,
    width: postImageSize,
    height: postImageSize,
    borderColor: LIGHT_GRAY,
    borderWidth: THICKER_BORDER_WIDTH,
    borderRadius: 100,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center'
  },
  postImage: {
    width: '100%',
    height: '100%'
  },
  captionBar: {
    width: '51%',
    borderWidth: BORDER_WIDTH,
    borderColor: BASE_COLOR_DARK,
    paddingTop: inputBarPaddingTop,
    paddingLeft: searchBarPaddingLeft,
    backgroundColor: 'transparent',
    borderRadius: STRONGER_BORDER_RADIUS
  },
  caption: {
    fontSize: 16,
    fontFamily: appFontBold
  },
  postVisiblityContainer: {
    ...optionButtonContainer,
    alignSelf: 'stretch',
    justifyContent: 'flex-start',
    marginBottom: 16
  },
  postVisiblityOptionContainer: {
    height: 40,
    marginTop: -10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  postVisiblityLabel: {
    marginTop: 1,
    marginLeft: 8,
    marginRight: 38,
    color: BASE_GRAY,
    fontFamily: appFontBold
  },
  configTitle: {
    fontSize: 20,
    fontFamily: appFontBold,
    color: BASE_COLOR_DARK,
    marginLeft: postConfigSideMargin,
    marginBottom: 10
  },
  textTagInput: {
    width: '54%',
    height: tagSelectionContainerHeight,
    borderWidth: BORDER_WIDTH,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: BASE_COLOR_DARK,
    paddingLeft: searchBarPaddingLeft,
    backgroundColor: 'transparent',
    marginLeft: postConfigSideMargin,
    marginRight: 18,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 3
  },
  textTagInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: tagSelectionMarginBottom
  },
  textTagInputValue: {
    fontFamily: appFontBold,
    width: '100%'
  },
  urlInputBar: {
    bottom: 0,
    marginTop: optionElementTop,
    alignSelf: 'center',
    left: 0,
    width: '80%'
  },
  expandMedia: {
   width: expandMediaSize,
   height: expandMediaSize,
   marginTop: 2,
   marginLeft: 2
  },
  submitButton: {
    alignSelf: 'center',
    marginBottom: 20,
    backgroundColor: BASE_COLOR_DARK
  },
  postVisiblityIcon: {
    width: postVisiblityIconSize,
    height: postVisiblityIconSize
  },
  tagTypeContainer: {
    width: '76%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: postConfigSideMargin,
    marginBottom: tagSelectionMarginBottom
  },
  tagType: {
    fontFamily: appFontBold,
    marginRight: 24,
    fontSize: 14,
    color: BASE_GRAY
  },
  addTextTagIcon: {
    width: addTextTagIconSize,
    height: addTextTagIconSize
  },
  tagColorContainer: {
    width: '90%',
    height: tagSelectionContainerHeight,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: postConfigSideMargin,
    marginBottom: tagSelectionMarginBottom
  },
  tagColor: {
    width: tagColorSize,
    height: tagColorSize,
    borderRadius: 100,
    marginRight: 26
  },
  textTagsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: postConfigSideMargin,
    marginRight: postConfigSideMargin
  },
  textTag,
  tagLabel,
  textTagActionIcon: {
    width: removeTextTagIconSize,
    height: removeTextTagIconSize,
    marginLeft: 10,
    marginRight: 16
  },
  textTagContainer: {
    justifyContent: 'flex-start'
  },
  textTagNotAdded: {
    ...textTag,
    backgroundColor: BASE_COLOR_LIGHT,
    borderColor: BASE_COLOR_DARK,
    borderWidth: BORDER_WIDTH
  },
  tagLabelNotAdded: {
    ...tagLabel,
    color: BASE_COLOR_DARK,
    padding: (tagLabel.padding - BORDER_WIDTH)
  },
  recentlyUsedTagsPlaceholderContainer: {
    height: tagSelectionContainerHeight,
    justifyContent: 'center'
  },
  recentlyUsedTagsPlaceholder: {
    color: MID_GRAY,
    fontFamily: appFontBold,
    fontSize: 14,
    marginLeft: postConfigSideMargin
  },
  currentColorTag: {
    width: colorTagIndicatorSize,
    height: colorTagIndicatorSize,
    borderRadius: 100
  },
  colorTagTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  colorTagType: {
    marginRight: 6
  }
});

export {PostStyles, captionBarStyles, upperContainerStyles, postVisiblityDisabledLabel, tagTypeStyles, tagColorStyles};
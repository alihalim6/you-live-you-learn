import {
	appFont,
	appFontBold,
	BASE_COLOR_LIGHT,
	BASE_COLOR_DARK,
	LIGHT_GRAY,
	BORDER_WIDTH,
	BASE_GRAY,
	getRandomFadeColor,
  getRandomBrightColor,
	isIOS,
  COLOR_FADE_OPACITY
} from '../constants/AppConstants';

const noSignInContainerMarginTop = (isIOS ? 19 : 0);
const followingPadding = 12;
const learnPaddingTop = (isIOS ? 7 : 0);
const noSignInHeaderHeight = 264;
const itemPaddingTop = (isIOS ? 22 : 20);

function containerMarginTop(signedIn){
	return (signedIn ? (isIOS ? 46 : 18) : noSignInContainerMarginTop);
}

function headerHeight(signedIn){
	return (signedIn ? 230 : noSignInHeaderHeight);
}

const MenuStyles = {
  container: {
    flex: 1
  },
  header: {
    backgroundColor: BASE_COLOR_LIGHT,
    borderBottomWidth: BORDER_WIDTH,
    borderColor: LIGHT_GRAY
  },
  profileImage: {
  	paddingTop: 34
  },
  username: {
    margin: 12,
    marginBottom: 10,
    fontSize: 18,
    fontFamily: appFontBold,
    color: BASE_COLOR_DARK,
    alignSelf: 'center'
  },
  followContainer: {
    width: '100%',
    fontSize: 14,
    flex: 1,
    flexDirection: 'row'
  },
  followLabel: {
    color: BASE_GRAY,
    fontFamily: appFontBold,
    flex: 1
  },
  following: {
    textAlign: 'right',
    paddingRight: followingPadding
  },
  followers: {
    textAlign: 'left',
    paddingLeft: followingPadding
  },
  liveLearnContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  live: {
    alignSelf: 'flex-start',
    width: 32,
    fontSize: 44,
    fontFamily: appFontBold,
    textAlign: 'center',
    paddingTop: 12,
    marginTop: 14,
    marginRight: 46,
    color: BASE_COLOR_DARK,
    backgroundColor: getRandomFadeColor()
  },
  learn: {
    fontSize: 42,
    fontFamily: appFontBold,
    textAlign: 'center',
    letterSpacing: 14,
    paddingLeft: 20,
    paddingTop: learnPaddingTop,
    marginTop: -30,
    width: '100%',
    height: 54,
    color: BASE_COLOR_DARK,
    backgroundColor: getRandomBrightColor(COLOR_FADE_OPACITY)
  },
  item: {
    borderTopWidth: BORDER_WIDTH,
    borderColor: LIGHT_GRAY,
    paddingTop: itemPaddingTop,
    paddingLeft: 26,
    height: 60,
    backgroundColor: BASE_COLOR_LIGHT
  },
  topMenuItem: {
    borderTopWidth: 0
  },
  menuItemLabel: {
    color: BASE_COLOR_DARK,
    fontSize: 16,
    fontFamily: appFontBold
  }
};

export {MenuStyles, containerMarginTop, headerHeight};
import {appFont, appFontBold, BASE_COLOR_LIGHT, BASE_COLOR_DARK, BORDER_COLOR, BORDER_WIDTH, BASE_GRAY, getRandomFadeColor} from '../constants/AppConstants';
import {isIOS} from '../constants/AppConstants';

const menuContainerMarginTop = false ? (isIOS ? 38 : 18) : (isIOS ? 8 : 0);///isSignedIn////////////////
const followingPadding = 12;
const learnPaddingTop = (isIOS ? 7 : 0);

const headerHeight = false ? 230 : 264;///isSignedIn////////////////

const MenuStyles = {
  container: {
    flex: 1,
    marginTop: menuContainerMarginTop
  },
  header: {
    height: headerHeight,
    backgroundColor: BASE_COLOR_LIGHT,
    borderBottomWidth: BORDER_WIDTH,
    borderColor: BORDER_COLOR
  },
  userName: {
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
    backgroundColor: getRandomFadeColor()
  },
  item: {
    borderTopWidth: BORDER_WIDTH,
    borderColor: BORDER_COLOR,
    paddingTop: 20,
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
    fontFamily: appFont
  }
};

export default MenuStyles;
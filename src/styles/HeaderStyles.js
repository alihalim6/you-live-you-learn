import {StyleSheet, Platform} from 'react-native';
import {
  appFont, 
  BASE_COLOR_DARK, 
  BASE_COLOR_LIGHT, 
  LIGHT_GRAY, 
  BORDER_WIDTH, 
  isIOS,
  searchBarPaddingLeft
} from '../constants/AppConstants';

const hamburgerMenuButtonWidth = 25;
const searchBarPaddingTop = (isIOS ? 12 : 0);

const HeaderStyles = StyleSheet.create({
  container: {
  	flexDirection: 'row',
  	alignItems: 'flex-start',
  	backgroundColor: BASE_COLOR_LIGHT
  },
  hamburgerMenuButton: {
  	width: hamburgerMenuButtonWidth,
  	margin: 20,
  	marginRight: 26,
  	marginTop: 26
  },
  hamburgerMenuLine: {
  	width: hamburgerMenuButtonWidth,
  	height: 4,
  	marginBottom: 4,
    backgroundColor: BASE_COLOR_DARK
  },
  searchBar: {
  	width: '70%',
  	height: 45,
  	borderWidth: BORDER_WIDTH,
  	borderColor: LIGHT_GRAY,
  	marginTop: 15,
  	paddingTop: searchBarPaddingTop,
  	paddingLeft: searchBarPaddingLeft,
  	backgroundColor: BASE_COLOR_LIGHT
  },
  search: {
    fontSize: 16,
    fontFamily: appFont
  }
});

export default HeaderStyles;
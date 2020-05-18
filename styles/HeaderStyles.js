import {StyleSheet, Platform} from 'react-native';
import {isIOS} from '../utilities/PlatformHelper';
import {BASE_COLOR_DARK, BASE_COLOR_LIGHT, BORDER_COLOR, BORDER_WIDTH} from '../constants/AppConstants';

const hamburgerMenuButtonWidth = 25;
const searchBarPaddingTop = (isIOS() ? 13 : 0);

const HeaderStyles = StyleSheet.create({
  container: {
  	flex: 1,
  	flexDirection: 'row',
  	alignItems: 'flex-start',
  	height: 122,
  	backgroundColor: BASE_COLOR_LIGHT,
  	elevation: 10,
  	shadowColor: BASE_COLOR_DARK,
    shadowOffset: {
    	width: 0,
    	height: 4
    },
    shadowOpacity: 0.1,
    shadowRadius: 2
  },
  hamburgerMenuButton: {
  	width: hamburgerMenuButtonWidth,
  	margin: 20,
  	marginTop: 29
  },
  hamburgerMenuLine: {
  	width: hamburgerMenuButtonWidth,
  	height: 4,
  	marginBottom: 4
  },
  searchBar: {
  	width: '70%',
  	height: 46,
  	borderWidth: BORDER_WIDTH,
  	borderColor: BORDER_COLOR,
  	marginTop: 15,
  	paddingTop: searchBarPaddingTop,
  	paddingLeft: 12,
  	fontSize: 18,
  	backgroundColor: BASE_COLOR_LIGHT
  }
});

export default HeaderStyles;
import {StyleSheet} from 'react-native';
import {appFont, BASE_COLOR_LIGHT, BASE_GRAY, BASE_COLOR_DARK} from '../constants/AppConstants';

const plusButtonSize = 74;
const plusSignLength = 4;

const FeedStyles = StyleSheet.create({
  emptyFeed: {
  	width: '100%',
  	height: '100%',
  	backgroundColor: BASE_COLOR_LIGHT
  },
  emptyFeedMessage: {
  	fontFamily: appFont,
  	fontSize: 16,
  	textAlign: 'center',
  	color: BASE_GRAY,
  	padding: 28
  },
  plusButton: {
  	backgroundColor: BASE_COLOR_DARK,
  	borderRadius: 100,
  	width: plusButtonSize,
  	height: plusButtonSize,
  	bottom: 120,
  	right: 52,
  	shadowColor: BASE_COLOR_DARK,
    shadowOffset: {
    	width: 0,
    	height: 2 
    },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 4,
  	justifyContent: 'center',
  	alignItems: 'center',
  	alignSelf: 'flex-end'
  },
  plusSignLine: {
  	backgroundColor: BASE_COLOR_LIGHT,
  	width: 32,
  	height: plusSignLength
  }, 
  plusSignVerticalLine: {
  	marginTop: -plusSignLength,
  	transform: [{rotate: '90deg'}]
  },
  userFeedPage: {
  	height: 'auto'
  }
});

export default FeedStyles;
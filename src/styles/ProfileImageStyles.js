import {StyleSheet} from 'react-native';
import {appFontBold, LIGHT_GRAY, THICKER_BORDER_WIDTH, BASE_COLOR_DARK} from '../constants/AppConstants';

const profileImageSize = 150;

const ProfileImageStyles = StyleSheet.create({
  profileImageContainer: {
    width: profileImageSize,
    height: profileImageSize,
    borderColor: LIGHT_GRAY,
    borderWidth: THICKER_BORDER_WIDTH,
    borderRadius: 100,
    alignSelf: 'center',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center'
  },
  you: {
    fontSize: 42,
	  fontFamily: appFontBold,
	  color: BASE_COLOR_DARK,
	  marginTop: 24
  },
  camera: {
    width: 32,
    height: 26
  }
});

export default ProfileImageStyles;
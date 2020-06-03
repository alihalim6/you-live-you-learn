import {StyleSheet} from 'react-native';
import {appFontBold, BORDER_COLOR, THICKER_BORDER_WIDTH, BASE_COLOR_DARK} from '../constants/AppConstants';

const profileImageSize = 150;

const ProfileImageStyles = StyleSheet.create({
  profileImageContainer: {
    width: profileImageSize,
    height: profileImageSize,
    borderColor: BORDER_COLOR,
    borderWidth: THICKER_BORDER_WIDTH,
    borderRadius: 100,
    alignSelf: 'center',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center'
  },
  noSignUpImageContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  profileImage: {
    flex: 1,
    width: '100%'
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
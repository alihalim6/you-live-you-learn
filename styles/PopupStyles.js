import {StyleSheet} from 'react-native';
import {
  appFontBold, 
  BASE_COLOR_LIGHT, 
  BASE_COLOR_DARK,
  BORDER_RADIUS,
  BORDER_WIDTH, 
  LIGHT_GRAY,
  isIOS,
  getRandomDarkColor
} from '../constants/AppConstants';

function setBorder(item){
  return {
    width: '100%',
    height: (item.isLast ? 0 : BORDER_WIDTH),
    backgroundColor: LIGHT_GRAY
  }
}

const closeButtonContainerSize = 40;
const itemPaddingLeftRight = 30;
const touchableCloseSize = 39;

const PopupStyles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: BASE_COLOR_LIGHT,
    borderRadius: BORDER_RADIUS,
    position: 'absolute'
  },
  item: {
    paddingLeft: itemPaddingLeftRight,
    paddingRight: itemPaddingLeftRight,
    paddingTop: 18,
    paddingBottom: 16
  },
  label: {
    fontFamily: appFontBold,
    fontSize: 14,
    textAlign: 'center',
    color: BASE_COLOR_DARK
  },
  touchableClose: {
    position: 'absolute',
    width: touchableCloseSize,
    height: touchableCloseSize,
    backgroundColor: getRandomDarkColor()
  },
  closeButton: {
    backgroundColor: BASE_COLOR_LIGHT,
    position: 'absolute',
    top: 2.5,
    left: 18
  },
  camera: {
    height: '100%'
  }
});

export {PopupStyles, setBorder};
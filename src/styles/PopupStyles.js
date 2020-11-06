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

const PopupStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    top: '30%'
  },
  itemContainer: {
    backgroundColor: BASE_COLOR_LIGHT,
    borderRadius: BORDER_RADIUS,
    alignSelf: 'center'
  },
  item: {
    paddingLeft: itemPaddingLeftRight,
    paddingRight: itemPaddingLeftRight,
    paddingTop: 17,
    paddingBottom: 13,
    minWidth: 226
  },
  label: {
    padding: 5,
    fontFamily: appFontBold,
    fontSize: 16,
    color: BASE_COLOR_DARK,
    //backgroundColor: 'orange'
  },
  touchableClose: {
    alignSelf: 'flex-end',
    width: 60,
    height: 40
  },
  closeButton: {
    backgroundColor: getRandomDarkColor(),
    top: 8,
    right: 26,
    height: 32
  },
  camera: {
    height: '100%'
  }
});

export {PopupStyles, setBorder};
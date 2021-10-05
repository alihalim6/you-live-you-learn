import {StyleSheet} from 'react-native';
import {
  appFontBold, 
  BASE_COLOR_LIGHT, 
  BASE_COLOR_DARK,
  BORDER_RADIUS,
  BORDER_WIDTH, 
  LIGHT_GRAY,
  isIOS
} from '../constants/AppConstants';

function setBorder(item){
  return {
    width: '100%',
    height: (item.isLast ? 0 : BORDER_WIDTH),
    backgroundColor: LIGHT_GRAY
  }
}

const itemPaddingLeftRight = 30;
const closeButtonPadding = 4;

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
    paddingTop: 13,
    paddingBottom: 9,
    minWidth: 226
  },
  label: {
    padding: 5,
    fontFamily: appFontBold,
    fontSize: 16,
    color: BASE_COLOR_DARK,
    //backgroundColor: 'orange'
  },
  closeButton: {
    alignSelf: 'flex-end',
    fontSize: 36,
    paddingTop: closeButtonPadding,
    paddingRight: closeButtonPadding
  },
  camera: {
    height: '100%'
  }
});

export {PopupStyles, setBorder};
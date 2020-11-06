import {StyleSheet} from 'react-native';
import {appFontBold, BASE_GRAY} from '../constants/AppConstants';

const GalleryStyles = StyleSheet.create({
  mediaContainer: {
    flex: 1,
    marginTop: 22,
    paddingBottom: 20
  },
  mediaItem: {
    width: 175,
    height: 250,
    marginBottom: 8
  },
  mediaRow: {
    flex: 1,
    justifyContent: 'space-evenly'
  },
  noItemsMessage: {
    fontFamily: appFontBold,
    fontSize: 18,
    color: BASE_GRAY,
    alignSelf: 'center'
  },
  fetching: {
    width: 110,
    height: 110,
    alignSelf: 'center'
  }
});

export default GalleryStyles;
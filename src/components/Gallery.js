import React, {Component} from 'react';
import {connect} from 'react-redux';
import CameraRoll from "@react-native-community/cameraroll";
import {View, Text, Image, FlatList, TouchableOpacity} from 'react-native';
import {version} from '../../package.json';
import {PageStyles} from '../styles/PageStyles';
import GalleryStyles from '../styles/GalleryStyles';
import {closeOverlay} from '../redux/actions/OverlayActions';
import {
  MEDIA_UPLOAD_FETCH_FIRST,
  NUM_OF_MEDIA_INIT_RENDER,
  NUM_OF_VIEW_COLUMNS,
  PHOTO_GALLERY,
  MEDIA_FETCH_MORE_THRESHOLD,
  MEDIA_FETCH_TO_TIME,
  GALLERY
} from '../constants/CameraConstants';
import {showBanner} from '../redux/actions/BannerActions';
import {ERROR_COLOR, hasPermission, isAndroid, getCurrentPage} from '../constants/AppConstants';
import mapError from '../utilities/ErrorMapper';

class Gallery extends Component{
  state = {
    assetType: null,
    media: {
      items: []
    },
    fetchInProgress: false
  };

  handleError(){
    this.setState({fetchInProgress: false});
    this.props.closeOverlay();

    this.props.showBanner({
      color: ERROR_COLOR,
      message: mapError(GALLERY)
    });
  }

  async componentDidMount(){
    if(isAndroid){
      const hasGalleryPermission = await hasPermission('gallery', true);

      if(!hasGalleryPermission){
        this.handleInitializationError();
      }
    }

    const assetType = ((this.props.galleryType === PHOTO_GALLERY) ? 'Photos' : 'Videos');
    const date = new Date();
    const now = date.getTime();
    const aYearAgo = (now - MEDIA_FETCH_TO_TIME);

    this.setState({
      assetType,
      fetchInProgress: true
    });

    CameraRoll.getPhotos({
      first: MEDIA_UPLOAD_FETCH_FIRST,
      assetType,
      fromTime: aYearAgo,
      toTime: now
    }).then(response => {
      let media = this.state.media;
      media.currentFetchToTime = aYearAgo;

      if(response.edges.length){
        media.items = response.edges;

        this.setState({fetchInProgress: false});
        this.setState({media});
      }
      else{
        this.fetchMoreMedia(assetType);
      }
    }).catch(() => {
      this.handleError();
    });
  }

  fetchMoreMedia = (assetType) => {
    const date = new Date();
    const now = date.getTime();
    const nextFetchToTime = (this.state.media.currentFetchToTime - MEDIA_FETCH_TO_TIME);

    CameraRoll.getPhotos({
      first: MEDIA_UPLOAD_FETCH_FIRST,
      assetType,
      fromTime: nextFetchToTime,
      toTime: this.state.media.currentFetchToTime
    }).then(response => {
      if(response.edges.length){
        let media = this.state.media;
        media.items = media.items.concat(response.edges);
        media.currentFetchToTime = nextFetchToTime;

        this.setState({fetchInProgress: false});
        this.setState({media});
      }
      //if nothing returned, fetch another MEDIA_FETCH_TO_TIME back until results come back, and so on
      else if(nextFetchToTime > 0){
        let media = this.state.media;
        media.currentFetchToTime -= MEDIA_FETCH_TO_TIME;

        this.setState({media});
        this.fetchMoreMedia(assetType);
      }
    }).catch(() => {
      this.handleError();
    });
  }

  mediaItemPressed = (mediaItem) => {
    this.props.closeOverlay();
    this.props.mediaCallback(mediaItem);
  }

  keyExtractor = (item) => {
    return (item.node.image.timestamp + item.node.image.playbleDuration + item.node.image.uri);
  };

  render(){
    //TODO: dynamic title as will use for posting a Learning which can be video too?

    return (
      <>
        <Text style={PageStyles.title}>CHOOSE</Text>

          <View style={GalleryStyles.mediaContainer}>
            {(this.state.media.items.length > 0) &&
              <FlatList
                data={this.state.media.items}
                keyExtractor={item => this.keyExtractor(item)}
                initialNumToRender={NUM_OF_MEDIA_INIT_RENDER}
                numColumns={NUM_OF_VIEW_COLUMNS}
                columnWrapperStyle={GalleryStyles.mediaRow}
                onEndReached={() => this.fetchMoreMedia(this.state.assetType)}
                onEndReachedThreshold={MEDIA_FETCH_MORE_THRESHOLD}
                renderItem={({item}) => {
                  return (
                    <TouchableOpacity onPress={() => this.mediaItemPressed(item.node.image)}>
                      <Image style={GalleryStyles.mediaItem} source={{uri: item.node.image.uri}}/>
                    </TouchableOpacity>
                  );
                }}
              />
            }

            {this.state.fetchInProgress &&
              <View>
                <Image style={GalleryStyles.fetching} source={require('../assets/loading.gif')}/>
              </View>
            }

            {!this.state.fetchInProgress && !this.state.media.items.length &&
              <Text style={GalleryStyles.noItemsMessage}>No items to show.</Text>
            }
          </View>
  
      </>
    );
  }

}

function mapStateToProps(state){
  const currentPage = getCurrentPage();

  return {
    galleryType: currentPage.galleryType,
    mediaCallback: currentPage.mediaCallback
  };
}

const mapDispatchToProps = {
  closeOverlay,
  showBanner
};

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);
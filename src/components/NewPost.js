import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  Animated,
  TextInput
} from 'react-native';
import {showOverlay, closeOverlay, overlayInvisible, navigateOverlay} from '../redux/actions/OverlayActions';
import {PageStyles} from '../styles/PageStyles';
import {PostStyles, captionBarStyles, upperContainerStyles} from '../styles/PostStyles';
import {setPostPage} from '../redux/actions/PostActions';
import {
  postAnimationFn,
  POST_PAGE_HEIGHT,
  TEXT_INPUT_PLACEHOLDER,
  MEDIA_TEXT_INPUT_PLACEHOLDER,
  URL_INPUT_PLACEHOLDER,
  PICTURE_OPTION_CONFIG,
  VIDEO_OPTION_CONFIG,
  TAG_PLACEHOLDER,
  POST_PAGE_FINAL_HEIGHT,
  POST_PAGE_INITIAL_TOP,
  POST_CONFIG_OPTIONS
} from '../constants/PostConstants';
import FeedStyles from '../styles/FeedStyles';
import {
  interpolateOverlayAnimProp,
  OVERLAY_X, 
  OVERLAY_HIDE_OPACITY, 
  NEW_POST, 
  OVERLAY_Y,
  OVERLAY_REVEAL_OPACITY,
  getCurrentPage,
  PAGE,
  FINAL_OVERLAY_Y
} from '../constants/AppConstants';
import {PICTURE_CAMERA, GALLERY} from '../constants/CameraConstants';
import {showCamera} from '../redux/actions/CameraActions';

class NewPost extends Component{
  state = {
    animatedPostTypesX: new Animated.Value(0),
    animatedPostTypesOpacity: new Animated.Value(0),
    animatedPostConfigY: new Animated.Value(0),
    animatedPostConfigOpacity: new Animated.Value(0),
    animatedPostConfigHeight: new Animated.Value(0),

    get postTypesX(){
      return interpolateOverlayAnimProp(this.animatedPostTypesX, OVERLAY_X);
    },
    get postTypesOpacity(){
      return interpolateOverlayAnimProp(this.animatedPostTypesOpacity, OVERLAY_HIDE_OPACITY);
    },
    get postConfigY(){
      return interpolateOverlayAnimProp(this.animatedPostConfigY, OVERLAY_Y);
    },
    get postConfigOpacity(){
      return interpolateOverlayAnimProp(this.animatedPostConfigOpacity, OVERLAY_REVEAL_OPACITY);
    },
    get postConfigHeight(){
      return interpolateOverlayAnimProp(this.animatedPostConfigHeight, POST_PAGE_HEIGHT);
    }
  };

  componentDidMount(){
    if(this.props.currentPage.config){
      this.props.setPostPage(this.props.currentPage.config);
    }
    //initial state on overlay launch
    else{
      this.props.setPostPage({postContainerPosition: 'absolute'});
    }
  }

  componentWillUnmount(){
    this.props.setPostPage({});
  }

  navBackToPostTypes = () => {
    this.navigatePage({
      backButtonFn: this.backToPostTypes,
      enableBackButton: true
    });
  }

  backToPostTypes = () => {
    this.state.animatedPostTypesX.setValue(0);
    this.state.animatedPostTypesOpacity.setValue(0);
    this.state.animatedPostConfigY.setValue(0);
    this.state.animatedPostConfigOpacity.setValue(0);
    this.state.animatedPostConfigHeight.setValue(0);

    this.props.setPostPage({
      postContainerPosition: 'absolute',
      postConfigShowing: false,
      postSubmitFormShowing: false
    });

    this.props.navigateOverlay({
      name: NEW_POST,
      styles: FeedStyles.userFeedPage,
      type: PAGE
    });
  }

  navigatePage = (config) => {
    this.props.navigateOverlay({
      ...config,
      name: NEW_POST,
      enableBackButton: config.enableBackButton,
      backButtonFn: () => config.backButtonFn(),
      styles: FeedStyles.userFeedPage,
      type: PAGE
    });
  }

  handlePostPage = (config) => {
    Animated.parallel([
      postAnimationFn(this.state.animatedPostTypesX),
      postAnimationFn(this.state.animatedPostTypesOpacity),
    ]).start(() => {
      if(config.noOptions){
        this.props.setPostPage({
          ...config,
          postConfigShowing: true,
          postSubmitFormShowing: true
        });

        this.navBackToPostTypes();
      }
      else{
        //allow container to handle animation
        this.props.setPostPage({
          ...config,
          postContainerPosition: 'relative',
          postConfigShowing: true
        });

        Animated.parallel([
          postAnimationFn(this.state.animatedPostConfigHeight),
          postAnimationFn(this.state.animatedPostConfigY),
          postAnimationFn(this.state.animatedPostConfigOpacity),
        ]).start(this.navBackToPostTypes);
      }
    });
  }

  mediaConfig = () => {
    return ((this.props.cameraType === PICTURE_CAMERA) ? PICTURE_OPTION_CONFIG : VIDEO_OPTION_CONFIG);
  }

  mediaCloseCallbackConfig = () => {
    return {
      enableBackButton: true,
      backButtonFn: this.backToPostTypes,
      config: {
        ...this.mediaConfig(),
        ...POST_CONFIG_OPTIONS
      }
    };
  }

  mediaCallbackConfig = (media) => {
    return {
      enableBackButton: true,
      backButtonFn: () => {
        this.props.setPostPage({
          ...this.mediaConfig(),
          ...POST_CONFIG_OPTIONS
        });

        this.navBackToPostTypes();
      },
      config: {
        mediaUri: (media ? media.uri : null),
        captionPlaceholder: MEDIA_TEXT_INPUT_PLACEHOLDER,
        postSubmitFormShowing: true,
        postConfigShowing: true
      }
    };
  }

  cameraOptionPressed = () => {
    this.props.overlayInvisible(true);

    this.props.showCamera(this.props.cameraType, (media) => {
      this.navigatePage(this.mediaCallbackConfig(media));
      this.props.overlayInvisible(false);
    }, closeCallback => {
      this.navigatePage(this.mediaCloseCallbackConfig());
      this.props.overlayInvisible(false);
    });
  }

  galleryOptionPressed = () => {
    this.props.showOverlay({
      name: GALLERY,
      galleryType: this.props.galleryType,
      type: PAGE,
      mediaCallback: (media) => {
        this.navigatePage(this.mediaCallbackConfig(media));
      },
      closeCallback: () => {
        this.navigatePage(this.mediaCloseCallbackConfig());
      }
    });
  }

  expandPostMediaPressed = () => {

  }

  //CREATE ANON USER WHEN POST
  //ALL POSTS PRIVATE (SELECTED AND DISABLED W MSGING) UNTIL SIGN UP
  //DEFAULT TO PUBLIC AFTER SIGN UP WITH DIFF MSGING
  //WOULD HAVE TO GO BACK AND PUBLIC-IZE POSTS PRE-SIGN UP
  //HAVE TOGGLE IN SETTINGS TO SET ALL PUBLIC/SET ALL PRIVATE

  //CAPTION/TEXT => PRSITINE -> BORDER THEN AFTER GOING IN COMING OUT NO BORDER UNLESS EDITING (FOCUSED)...NO SAVE BUTTON

  //CHANGE MAG GLASS TO FOUR CORNER LINES

  render() {
    const postConfigTop = (POST_PAGE_INITIAL_TOP + FINAL_OVERLAY_Y);

    let postConfigStyles = {
      opacity: 1,
      height: POST_PAGE_FINAL_HEIGHT,
      transform: [{translateY: 0}],
      top: postConfigTop
    };

    //DOESN'T WORK OTHER WAY AROUND
    if(!this.props.fromBackNav){
      postConfigStyles.opacity = this.state.postConfigOpacity;
      postConfigStyles.height = this.state.postConfigHeight;
      postConfigStyles.transform = [{translateY: this.state.postConfigY}];
      postConfigStyles.top = POST_PAGE_INITIAL_TOP;
    }

    return (
      <>
        <Text style={PageStyles.title}>NEW POST</Text>

        {!this.props.postConfigShowing &&
          <>
            <Animated.View style={[
              {transform: [{translateX: this.state.postTypesX}]},
              {opacity: this.state.postTypesOpacity}
            ]}>
              <Text style={PostStyles.prompt}>Morbi convallis orci sed bibendum enim?</Text>
            </Animated.View>
          
            <Animated.View style={[
              PostStyles.postTypeContainer,
              {transform: [{translateX: this.state.postTypesX}]},
              {opacity: this.state.postTypesOpacity}
            ]}>
              <TouchableOpacity 
                style={PostStyles.postType} 
                onPress={() => this.handlePostPage({
                  noOptions: true,
                  captionPlaceholder: TEXT_INPUT_PLACEHOLDER,
                  noPreview: true
                })}
              >
                <View style={PostStyles.postTypeIconContainer}>
                  <Image style={PostStyles.postTypeIcon} source={require('../assets/text.png')}/>
                </View>
                <Text style={PostStyles.optionLabel}>Text</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={PostStyles.postType} 
                onPress={() => this.handlePostPage(PICTURE_OPTION_CONFIG)}
              >
                <View style={PostStyles.postTypeIconContainer}>
                  <Image style={PostStyles.postTypeIcon} source={require('../assets/camera.png')}/>
                </View>
                <Text style={PostStyles.optionLabel}>Picture</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={PostStyles.postType} 
                onPress={() => this.handlePostPage(VIDEO_OPTION_CONFIG)}
              >
                <View style={PostStyles.postTypeIconContainer}>
                  <Image style={PostStyles.postTypeIcon} source={require('../assets/video.png')}/>
                </View>
                <Text style={PostStyles.optionLabel}>Video</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={PostStyles.postType}
                onPress={() => this.handlePostPage({
                  optionURL: true,
                  captionPlaceholder: URL_INPUT_PLACEHOLDER
                })}
              >
                <View style={PostStyles.postTypeIconContainer}>
                  <Image style={PostStyles.postTypeIcon} source={require('../assets/media.png')}/>
                </View>
                <Text style={PostStyles.optionLabel}>Social Media</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={PostStyles.postType}>
                <View style={PostStyles.postTypeIconContainer}>
                  <Image style={PostStyles.postTypeIcon} source={require('../assets/microphone.png')}/>
                </View>
                <Text style={PostStyles.optionLabel}>Audio (+UPLOAD?)</Text>
              </TouchableOpacity>
            </Animated.View>
          </>
        }

        {!this.props.postSubmitFormShowing &&
          <Animated.View style={[
            PostStyles.postConfigContainer,
            {position: this.props.postContainerPosition},
            postConfigStyles
          ]}>
            {this.props.optionButtons &&
              <>
                <Text style={[PostStyles.prompt, PostStyles.postConfigContainerPrompt]}>Mauris eleifend leo faucibus?</Text>

                <View style={PostStyles.optionButtonContainer}>
                  <TouchableOpacity 
                    style={PostStyles.optionButton}
                    onPress={() => this.cameraOptionPressed()}>
                      <Text style={PostStyles.optionButtonLabel}>TAKE {this.props.optionLabelCameraType}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={PostStyles.optionButton}
                    onPress={() => this.galleryOptionPressed()}>
                      <Text style={PostStyles.optionButtonLabel}>CHOOSE {this.props.optionLabelCameraType}</Text>
                  </TouchableOpacity>
                </View>
              </>
            }

            {this.props.optionURL &&
              <>
                <Text style={[PostStyles.prompt, PostStyles.postConfigContainerPrompt]}>Donec pharetra nisi a sagittis?</Text>

                <View style={[PostStyles.inputBar, PostStyles.urlInputBar]}>
                  <TextInput style={PostStyles.inputBarText} placeholder={URL_INPUT_PLACEHOLDER}/>
                </View>
              </>
            }
          </Animated.View>
        }

        <>
          {this.props.postSubmitFormShowing &&
            <>
              <View style={[PostStyles.postSubmitFormUpperContainer, upperContainerStyles(this.props)]}>
                {this.props.mediaUri &&
                  <View style={PostStyles.postImageContainer}>
                    <Image style={PostStyles.postImage} source={{uri: this.props.mediaUri}}/>

                    <TouchableOpacity onPress={() => this.expandPostMediaPressed()} style={PostStyles.expandMediaContainer}>
                        <Image source={require('../assets/magnifyingGlass.png')} style={PostStyles.expandMedia}/>
                    </TouchableOpacity>
                  </View>
                }

                <View style={[PostStyles.captionBar, captionBarStyles(this.props)]}>
                  <TextInput style={PostStyles.caption} placeholder={this.props.captionPlaceholder} multiline={true}/>
                </View>
              </View>

              <Text style={PostStyles.configTitle}>POST VISIBILITY</Text>

              <View style={PostStyles.postVisiblityButtonContainer}>
                <TouchableOpacity
                  style={[PostStyles.optionButton, PostStyles.postVisiblityButton, {backgroundColor: 'black'}]}
                  onPress={() => null}>
                    <Text style={[PostStyles.optionButtonLabel, PostStyles.postVisiblityButtonLabel, {color: 'white'}]}>PRIVATE</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[PostStyles.optionButton, PostStyles.postVisiblityButton]}
                  onPress={() => null}>
                    <Text style={[PostStyles.optionButtonLabel, PostStyles.postVisiblityButtonLabel]}>PUBLIC</Text>
                </TouchableOpacity>
              </View>

              <Text style={PostStyles.configTitle}>TAGS</Text>

              <View style={PostStyles.inputBar}>
                <TextInput style={PostStyles.inputBarText} placeholder={TAG_PLACEHOLDER}/>
              </View>

              <TouchableOpacity
                style={[PostStyles.optionButton, PostStyles.submitButton, {backgroundColor: 'black'}]}
                onPress={() => null}>
                  <Text style={[PostStyles.optionButtonLabel, PostStyles.postVisiblityButtonLabel, {color: 'white'}]}>POST</Text>
              </TouchableOpacity>
            </>
          }
        </>
      </>
    );
  }
}

function mapStateToProps(state){
  return {
    ...state.post.page,
    currentPage: getCurrentPage(),
    currentCamera: state.camera.currentCamera
  }
}

const mapDispatchToProps = {
  showOverlay,
  showCamera,
  closeOverlay,
  overlayInvisible,
  setPostPage,
  navigateOverlay
};

export default connect(mapStateToProps, mapDispatchToProps)(NewPost);
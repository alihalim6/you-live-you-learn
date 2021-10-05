import React, {Component} from 'react';
import {View, TouchableOpacity, Animated, Text, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {connect} from 'react-redux';
import {showOverlay, closeOverlay, overlayInvisible} from '../redux/actions/OverlayActions';
import {PostStyles} from '../styles/PostStyles';
import {
	selectPostAnimationFn, 
	UNSELECTED_POST_TYPE_OPACITY, 
	TEXT_OPTION_CONFIG,
	PICTURE_OPTION_CONFIG
} from '../constants/PostConstants';
import PageStyles from '../styles/PageStyles';
import {interpolateOverlayAnimProp, PAGE, SUBMIT_POST} from '../constants/AppConstants';
import FeedStyles from '../styles/FeedStyles';
import {showCamera} from '../redux/actions/CameraActions';
import {PICTURE_CAMERA, GALLERY} from '../constants/CameraConstants';

class NewPost extends Component{
	state = {
		cameraOptionSelected: false,

		animatedPostTypesOpacity: new Animated.Value(0),

		get postTypesOpacity(){
      return interpolateOverlayAnimProp(this.animatedPostTypesOpacity, UNSELECTED_POST_TYPE_OPACITY);
    }
	};

	cameraOptionPressed = () => {
		Animated.parallel([
      selectPostAnimationFn(this.state.animatedPostTypesOpacity)
    ]).start(() => {
    	this.setState({cameraOptionSelected: true});
    });
	}

	textOptionPressed = () => {
		this.goToSubmitPost(TEXT_OPTION_CONFIG);
	}

	submitPostBackButtonFn = () => {
		this.props.closeOverlay();
	}

	picturePostMediaCallback = (media) => {
    this.goToSubmitPost({
    	enableBackButton: true,
    	mediaUri: (media ? media.uri : null),
    	backButtonFn: this.submitPostBackButtonFn,
    	captionPlaceholder: PICTURE_OPTION_CONFIG.captionPlaceholder
    });

    this.props.overlayInvisible(false);
  }

	takePicturePressed = () => {
		this.props.overlayInvisible(true);

		//can't use showOverlay() due to style needs of camera not working with Page
    this.props.showCamera(true, this.picturePostMediaCallback, closeCallback => {
      this.props.overlayInvisible(false);
    });
	}

	chooseFromGalleryPressed = () => {
		this.props.showOverlay({
      name: GALLERY,
      galleryType: PICTURE_OPTION_CONFIG.galleryType,
      type: PAGE,
      mediaCallback: this.picturePostMediaCallback,
      errorCallback: () => {}
    });
	}

	goToSubmitPost = (config) => {
		this.props.showOverlay({
			...config,
      name: SUBMIT_POST,
      styles: FeedStyles.userFeedPage,
      type: PAGE,
      enableBackButton: true,
      hideCloseButton: true,
     	backButtonFn: this.submitPostBackButtonFn
    });
	}

	render(){
		return (
			<>
	        <Text style={PageStyles.title}>NEW POST</Text>

	        <>
	          <View>
	            <Text style={PostStyles.prompt}>Morbi convallis orci sed bibendum enim?</Text>
	          </View>
	        
	          <View style={PostStyles.postTypeContainer}>
	            <TouchableOpacity 
	              style={PostStyles.postType} 
	              onPress={() => this.textOptionPressed()}
	            >
	              <Animated.View style={[PostStyles.postTypeIconContainer, {opacity: this.state.postTypesOpacity}]}>
	              	<Icon style={PostStyles.postTypeIcon} name="text-fields"/>
	              </Animated.View>
	            </TouchableOpacity>

	            <TouchableOpacity 
	              style={PostStyles.postType} 
	              onPress={() => this.cameraOptionPressed()}
	            >
	              <Animated.View style={PostStyles.postTypeIconContainer}>
	                <Icon style={PostStyles.postTypeIcon} name="photo-camera"/>
	              </Animated.View>
	            </TouchableOpacity>

	            <TouchableOpacity 
	              style={PostStyles.postType}
	              onPress={() => {}}
	            >
	              <Animated.View style={[PostStyles.postTypeIconContainer, {opacity: this.state. postTypesOpacity}]}>
	                <Image style={PostStyles.postTypeImage} source={require('../assets/media.png')}/>
	              </Animated.View>
	            </TouchableOpacity>
	          </View>

	          {this.state.cameraOptionSelected &&
	            <View style={PostStyles.optionButtonContainer}>
                <TouchableOpacity 
                  onPress={() => this.takePicturePressed()}>
                    <Text style={PostStyles.optionLabel}>TAKE PICTURE OR VIDEO</Text>
                </TouchableOpacity>

                <View style={PostStyles.optionDivider}></View>

                <TouchableOpacity
                  onPress={() => this.chooseFromGalleryPressed()}>
                    <Text style={PostStyles.optionLabel}>GALLERY</Text>
                </TouchableOpacity>
	            </View>
	          }
	        </>
	    </>
    );
	}
}


function mapStateToProps(state){
  return {}
}

const mapDispatchToProps = {
  showOverlay,
  closeOverlay,
 	showCamera,
 	overlayInvisible
};

export default connect(mapStateToProps, mapDispatchToProps)(NewPost);
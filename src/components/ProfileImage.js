import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  View, 
  ImageBackground, 
  Image, 
  TextInput, 
  Text, 
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ProfileImageStyles from '../styles/ProfileImageStyles';
import Popup from './Popup';
import {showOverlay} from '../redux/actions/OverlayActions';
import {NEW_PROFILE_IMAGE, EDIT_PROFILE_IMAGE} from '../constants/PopupConstants';
import {
  PROFILE_IMAGE_A11Y_LABEL,
  NO_PROFILE_IMAGE_A11Y_LABEL,
  SIGN_UP,
  CAMERA_ICON_A11Y_LABEL,
  getCurrentPage,
  POPUP
} from '../constants/AppConstants';

class ProfileImage extends Component{
  profileImagePressed = () => {
    const popupConfig = (this.props.profileImage ? EDIT_PROFILE_IMAGE : NEW_PROFILE_IMAGE);

    this.props.showOverlay({
      ...popupConfig,
      defaultPositioning: (this.props.currentPage ? (this.props.currentPage.name === SIGN_UP) : false),
      type: POPUP
    });
  }

  render(){
    const noProfileImageContents = (
      <View style={ProfileImageStyles.profileImageContainer}>
        {!this.props.cameraOnly && 
          <Text style={ProfileImageStyles.you}>YOU</Text>
        }

        <Icon style={ProfileImageStyles.camera} name="photo-camera" accessible={true} accessibilityLabel={CAMERA_ICON_A11Y_LABEL}/>
      </View>
    );

    return (
      <>
        {this.props.profileImage &&
          <TouchableOpacity onPress={() => this.profileImagePressed()} accessible={true} accessibilityLabel={PROFILE_IMAGE_A11Y_LABEL}>
            <ImageBackground style={ProfileImageStyles.profileImageContainer} source={{uri: this.props.profileImage}}/>
          </TouchableOpacity>
        }

       {!this.props.profileImage &&
          <TouchableOpacity onPress={() => this.profileImagePressed()} accessible={true} accessibilityLabel={NO_PROFILE_IMAGE_A11Y_LABEL}>
            {noProfileImageContents}
          </TouchableOpacity>
        }
      </>
    );
  }

}

function mapStateToProps(state){
  return {
    profileImage: state.user.profileImage,
    signedIn: state.user.signedIn,
    currentPage: getCurrentPage()
  };
}

const mapDispatchToProps = {
  showOverlay
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileImage);
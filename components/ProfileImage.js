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
import ProfileImageStyles from '../styles/ProfileImageStyles';
import Popup from './Popup';
import {showPopup} from '../redux/actions/OverlayActions';
import {NEW_PROFILE_IMAGE, EDIT_PROFILE_IMAGE} from '../constants/PopupConstants';

class ProfileImage extends Component{
  handleProfileImage = () => {
    const popupConfig = (this.props.profileImage ? EDIT_PROFILE_IMAGE : NEW_PROFILE_IMAGE);
    this.props.showPopup(popupConfig);
  }

  render(){
    const noProfileImageContents = (
      <View style={ProfileImageStyles.profileImageContainer}>
        {!this.props.cameraOnly && 
          <Text style={ProfileImageStyles.you}>YOU</Text>
        }

        <Image style={ProfileImageStyles.camera} source={require('../assets/camera.png')}/>
      </View>
    );

    return (
      <>
        {this.props.profileImage &&
          <TouchableOpacity onPress={() => this.handleProfileImage()}>
            <ImageBackground style={ProfileImageStyles.profileImageContainer} source={{uri: this.props.profileImage}}/>
          </TouchableOpacity>
        }

       {!this.props.profileImage &&
          <TouchableOpacity onPress={() => this.handleProfileImage()}>
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
    signedIn: state.user.signedIn
  };
}

const mapDispatchToProps = {
  showPopup
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileImage);
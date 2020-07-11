import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {RNCamera} from 'react-native-camera';
import CameraStyles from '../styles/CameraStyles';
import {hidePopup} from '../redux/actions/OverlayActions';
import {hideCamera} from '../redux/actions/CameraActions';
import {PICTURE_CAMERA, VIDEO_CAMERA} from '../constants/AppConstants';

class Camera extends Component{
	constructor(props) {
    super(props);
    this.camera = React.createRef();
  }

	state = {
		currentCameraType: RNCamera.Constants.Type.front
	};

	takePicturePressed = async () => {
		try{
      const picture = await this.camera.current.takePictureAsync({
      	base64: true
      });

      this.props.pictureCallback(picture);
      this.hideOverlays();
  	}
    catch(error){
    	console.log('error taking pic: ' + error);
    }
	}

	hideOverlays = () => {
		this.props.hidePopup();
		this.props.hideCamera();
	}

	handleCameraAuthChange = (auth) => {
		if(auth.cameraStatus === RNCamera.Constants.CameraStatus.NOT_AUTHORIZED){
			this.hideOverlays();
		}
	}

	handleAudioAuthChange = (auth) => {
		if(auth.recordAudioPermissionStatus === RNCamera.Constants.CameraStatus.NOT_AUTHORIZED){
			this.hideOverlays();
		}
	}

	render(){
		return (
				<>
					{(this.props.currentCamera === PICTURE_CAMERA) &&
						<RNCamera
								style={CameraStyles.container}
								ref={this.camera}
				        type={this.state.currentCameraType}
				        captureAudio={false}
				        onStatusChange={this.handleCameraAuthChange}
				        type={this.state.currentCameraType}
				        notAuthorizedView={<View></View>}
				        pendingAuthorizationView={<View style={CameraStyles.pendingAuth}></View>}
				      />
					}

					{(this.props.currentCamera === VIDEO_CAMERA) &&
						<RNCamera
								style={CameraStyles.container}
				        ref={this.camera}
				        type={this.state.currentCameraType}
				        onStatusChange={this.handleAudioAuthChange}
				        type={this.state.currentCameraType}
				        notAuthorizedView={<View></View>}
				        pendingAuthorizationView={<View style={CameraStyles.pendingAuth}></View>}
				      />
					}

					<TouchableOpacity style={CameraStyles.takePicture} onPress={() => this.takePicturePressed()}>
					</TouchableOpacity>
				</>
		);
	}
}

function mapStateToProps(state){
  return {
    currentCamera: state.camera.currentCamera,
    pictureCallback: state.camera.pictureCallback,
    videoCallback: state.camera.videoCallback
  };
}

const mapDispatchToProps = {
	hidePopup,
	hideCamera
}

export default connect(mapStateToProps, mapDispatchToProps)(Camera);
import React, {Component} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {RNCamera} from 'react-native-camera';
import CameraStyles from '../styles/CameraStyles';
import {hideCamera} from '../redux/actions/CameraActions';
import {CAMERA_TAKE_PICTURE_A11Y_LABEL, ERROR_COLOR} from '../constants/AppConstants';
import {PICTURE_CAMERA, VIDEO_CAMERA, CAMERA_NOT_AUTHORIZED} from '../constants/CameraConstants';
import mapError from '../utilities/ErrorMapper';
import {showBanner} from '../redux/actions/BannerActions';
import {PageStyles, closeButtonOneStyle, closeButtonTwoStyle} from '../styles/PageStyles';

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

      this.props.mediaCallback(picture);
      this.props.hideCamera();
  	}
    catch(error){
    	console.log('error taking pic: ' + error);
    }
	}

	handleCameraAuthChange = (auth) => {
		if(auth.cameraStatus === RNCamera.Constants.CameraStatus.NOT_AUTHORIZED){
			this.props.hideCamera();
		}
	}

	handleAudioAuthChange = (auth) => {
		if(auth.recordAudioPermissionStatus === RNCamera.Constants.CameraStatus.NOT_AUTHORIZED){
			this.props.hideCamera();
		}
	}

	closeButtonPressed = () => {
		this.props.hideCamera();

		if(this.props.closeCallback){
			this.props.closeCallback();
		}
	}

	render(){
		return (
			<>
				<View style={CameraStyles.actionContainer}></View>

				{(this.props.currentCamera === PICTURE_CAMERA) &&
					<>
						<RNCamera
							style={CameraStyles.container}
							ref={this.camera}
			        type={this.state.currentCameraType}
			        captureAudio={false}
			        onStatusChange={this.handleCameraAuthChange}
			        type={this.state.currentCameraType}
			        notAuthorizedView={<View></View>}
			        pendingAuthorizationView={<View style={CameraStyles.pendingAuth}></View>}
			      >
			      	{({status}) => {
		            if(status === RNCamera.Constants.CameraStatus.NOT_AUTHORIZED){
		            	this.props.showBanner({
						        color: ERROR_COLOR,
						        message: mapError(CAMERA_NOT_AUTHORIZED)
						      });
		            }
		          }}
					  </RNCamera>

						<TouchableOpacity 
							style={[CameraStyles.actionButton, CameraStyles.takePictureButton]}
							onPress={() => this.takePicturePressed()}
							accessible={true}
							accessibilityLabel={CAMERA_TAKE_PICTURE_A11Y_LABEL}
						>
						</TouchableOpacity>
					</>
				}

				{(this.props.currentCamera === VIDEO_CAMERA) &&
					<>
						<RNCamera
							style={CameraStyles.container}
			        ref={this.camera}
			        type={this.state.currentCameraType}
			        onStatusChange={this.handleAudioAuthChange}
			        type={this.state.currentCameraType}
			        notAuthorizedView={<View></View>}
			        pendingAuthorizationView={<View style={CameraStyles.pendingAuth}></View>}
				    >
				    	{({status}) => {
		            if(status === RNCamera.Constants.CameraStatus.NOT_AUTHORIZED){
		            	this.props.showBanner({
						        color: ERROR_COLOR,
						        message: mapError(CAMERA_NOT_AUTHORIZED)
						      });
		            }
		          }}
				    </RNCamera>

				    <TouchableOpacity 
							style={[CameraStyles.actionButton, CameraStyles.takePictureButton]}
							onPress={() => null}
							accessible={true}
						>
						</TouchableOpacity>
					</>
				}

				<TouchableOpacity 
					onPress={() => this.closeButtonPressed()} 
					style={[PageStyles.pageButton, PageStyles.closeButton, CameraStyles.closeButton]}
				>
          <View style={[closeButtonOneStyle, CameraStyles.closeButtonStyle]}></View>
          <View style={[closeButtonTwoStyle, CameraStyles.closeButtonStyle]}></View>
        </TouchableOpacity>
			</>
		);
	}
}

function mapStateToProps(state){
  return {
    currentCamera: state.camera.currentCamera,
    mediaCallback: state.camera.mediaCallback,
    closeCallback: state.camera.closeCallback
  };
}

const mapDispatchToProps = {
	hideCamera,
	showBanner
};

export default connect(mapStateToProps, mapDispatchToProps)(Camera);
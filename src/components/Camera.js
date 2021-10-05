import React, {Component} from 'react';
import {
	View,
	TouchableOpacity, 
	Image, 
	Pressable, 
	Text,
	Animated,
	Easing
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {connect} from 'react-redux';
import {RNCamera} from 'react-native-camera';
import CameraStyles from '../styles/CameraStyles';
import {hideCamera} from '../redux/actions/CameraActions';
import {
	CAMERA_TAKE_PICTURE_A11Y_LABEL, 
	ERROR_COLOR, 
	isAndroid, 
	hasPermission, 
	interpolateOverlayAnimProp,
	OVERLAY_ANIM_KEYFRAME_LENGTH
} from '../constants/AppConstants';
import {
	PICTURE_CAMERA, 
	VIDEO_CAMERA, 
	CAMERA_NOT_AUTHORIZED, 
	RECORDING_STATUS_OPACITY,
	RECORDING_STATUS_ANIM_DURATION,
	ZERO_RECORDING_TIME,
	recordingStatusAnimationProps,
	PICTURE,
	VIDEO
} from '../constants/CameraConstants';
import mapError from '../utilities/ErrorMapper';
import {showBanner} from '../redux/actions/BannerActions';
import PageStyles from '../styles/PageStyles';
import {RECORD_AUDIO} from '../constants/AudioConstants';

class Camera extends Component{
	constructor(props) {
    super(props);
    this.camera = React.createRef();
  }

  componentWillUnmount(){
  	clearInterval(this.state.recordingTimeInterval);
  }

	state = {
		currentCameraType: RNCamera.Constants.Type.back,
		cameraAuthStatus: null,
		recordingInProgress: false,
		recordingTimeInterval: null,
		recordingTimeDisplay: ZERO_RECORDING_TIME,
		recordingTime: 0,
		previewing: null,
		actionButtonOpacity: 1,

		animatedRecordingStatusOpacity: new Animated.Value(0),

		get recordingStatusOpacity(){
      return interpolateOverlayAnimProp(this.animatedRecordingStatusOpacity, RECORDING_STATUS_OPACITY);
    }
	};

	dimActionButton = () => {
		this.setState({actionButtonOpacity: 0.5});
	}

	reCapturePressed = () => {
		this.setState({previewing: false});
		this.camera.current.resumePreview();
	}

	useCapturePressed = (media) => {
		this.props.mediaCallback(media);
   	this.props.hideCamera();
	}

	takePicturePressed = async () => {
		try{
      const picture = await this.camera.current.takePictureAsync({
      	base64: true,
      	pauseAfterCapture: true
      });

      this.setState({previewing: {
      	type: PICTURE,
      	capture: picture
      }});
  	}
    catch(error){
    	console.log('error taking pic: ' + error);////////
    }
	}

	animateRecordingStatus = () => {
		this.setState({recordingInProgress: true});
		
		Animated.parallel([
      Animated.timing(this.state.animatedRecordingStatusOpacity, recordingStatusAnimationProps)
		]).start(({finished}) => {
			this.state.animatedRecordingStatusOpacity.setValue(0);
			this.animateRecordingStatus();
		});
	}

	takeVideoPressed = async () => {
		const hasAudioPermission = await hasPermission('microphone', isAndroid);

		if(!hasAudioPermission) this.closeCamera(RECORD_AUDIO);

		this.animateRecordingStatus();

		this.state.recordingTimeInterval = setInterval(() => {
      this.setState({
        recordingTimeDisplay: new Date(++this.state.recordingTime * 1000).toISOString().substr(15, 4).replace('.', ':')
      });
    }, 1000);

		try{
			const video = await this.camera.current.recordAsync({
				maxDuration: 1800 //30 mins
			});

			this.setState({recordingInProgress: false});

			this.setState({previewing: {
      	type: VIDEO,
      	capture: video
      }});
		}
		catch(error){
			this.setState({recordingInProgress: false});
			console.log('error taking video: ' + error);////////
		}
	}

	actionButtonPressOut = () => {
		this.setState({actionButtonOpacity: 1});
		this.camera.current.stopRecording();
	}

	handleCameraAuthChange = (auth) => {
		let error = false;

		if(auth.cameraStatus === RNCamera.Constants.CameraStatus.NOT_AUTHORIZED){
			error = CAMERA_NOT_AUTHORIZED;
		}
		else if(auth.recordAudioPermissionStatus === RNCamera.Constants.CameraStatus.NOT_AUTHORIZED){
			error = RECORD_AUDIO;
		}

		if(error) this.closeCamera(error);
	}

	closeCamera = (error) => {
		clearInterval(this.state.recordingTimeInterval);

		if(this.props.closeCallback){
			this.props.closeCallback();
		}

		if(error){
			this.props.showBanner({
        color: ERROR_COLOR,
        message: mapError(error)
      });
		}

		this.props.hideCamera();
	}

	checkCameraPermission = async () => {
		const hasCameraPermission = await hasPermission('camera', isAndroid);

		if(!hasCameraPermission) this.closeCamera(CAMERA_NOT_AUTHORIZED);
	}

	rotateCameraPressed = () => {
		//TODO: hide if recording in progress

		const newCameraType = (this.state.currentCameraType === RNCamera.Constants.Type.back) ? RNCamera.Constants.Type.front : RNCamera.Constants.Type.back;
		this.setState({currentCameraType: newCameraType});
	}

	//TODO: allow toggling of flash

	render(){
		//iOS handled well by FaCC/onStatusChange()
		if(isAndroid) this.checkCameraPermission();

		return (
			<>
				<RNCamera
					style={CameraStyles.container}
					ref={this.camera}
					flashMode={RNCamera.Constants.FlashMode.auto}
	        onStatusChange={this.handleCameraAuthChange}
	        type={this.state.currentCameraType}
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

          <View style={CameraStyles.headerContainer}>
	         	<TouchableOpacity onPress={() => this.rotateCameraPressed()}>
							<Icon style={[CameraStyles.rotateCameraButton, {opacity: !this.state.previewing}]} name="flip-camera-ios" color="#ffffff"/>
		        </TouchableOpacity>
		      	
		        {this.state.recordingInProgress && 
		        	<Animated.View style={[CameraStyles.recordingStatusContainer, {opacity: this.state.recordingStatusOpacity}]}>
		        		<View style={CameraStyles.redDot}></View>
		        		<Text style={CameraStyles.recordingStatusTime}>{this.state.recordingTimeDisplay}</Text>
		        	</Animated.View>
		        }

						<TouchableOpacity onPress={() => this.closeCamera()}>
		          <Icon style={CameraStyles.closeButton} name="close" color="#ffffff"/>
		        </TouchableOpacity>
	        </View>
			  </RNCamera>
			  	{!this.state.previewing &&
			  		<Text style={CameraStyles.actionLabel}>TAP FOR PIC  |  HOLD TO RECORD</Text>
			  	}

			  	{this.state.previewing &&
						<TouchableOpacity onPress={() => this.reCapturePressed()} style={CameraStyles.reCaptureButtonContainer}>
							<Icon style={CameraStyles.actionIcon} name="west" color="#ffffff"/>
		        </TouchableOpacity>
					}

					{!this.state.previewing &&
				  	<TouchableOpacity>
							<Pressable 
								style={[CameraStyles.takePictureButton, {opacity: this.state.actionButtonOpacity}]}
								onPressIn={() => this.dimActionButton()}
								onPress={() => this.takePicturePressed()}
								onLongPress={() => this.takeVideoPressed()}
								onPressOut={() => this.actionButtonPressOut()}
								accessible={true}
								accessibilityLabel={CAMERA_TAKE_PICTURE_A11Y_LABEL}
							>
							</Pressable>
						</TouchableOpacity>
					}

					{this.state.previewing &&
						<TouchableOpacity onPress={() => this.useCapturePressed()} style={CameraStyles.useCaptureButtonContainer}>
							<Icon style={CameraStyles.actionIcon} name="done" color="#ffffff"/>
		        </TouchableOpacity>
					}
			</>
		);
	}
}

function mapStateToProps(state){
  return {
    mediaCallback: state.camera.mediaCallback,
    closeCallback: state.camera.closeCallback,
    initFn: state.camera.initFn
  };
}

const mapDispatchToProps = {
	hideCamera,
	showBanner
};

export default connect(mapStateToProps, mapDispatchToProps)(Camera);
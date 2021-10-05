import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  Animated,
  Dimensions
} from 'react-native';
import {RecordAudioStyles, timelinePositionStyles} from '../styles/RecordAudioStyles';
import PageStyles from '../styles/PageStyles';
import {ERROR_COLOR, hasPermission, getCurrentPage} from '../constants/AppConstants';
import {
  audioTransitionAnimationFn, 
  audioOpacityAnimationFn, 
  RECORD_AUDIO, 
  ZERO_RECORDING_TIME,
  PLAYBACK_REWIND_TIME,
  PLAYBACK_FAST_FORWARD_TIME,
  PLAYBACK_REWIND_AMOUNT,
  PLAYBACK_FAST_FORWARD_AMOUNT
} from '../constants/AudioConstants';
import {closeOverlay} from '../redux/actions/OverlayActions';
import {showBanner} from '../redux/actions/BannerActions';
import mapError from '../utilities/ErrorMapper';

class RecordAudio extends Component{
  state = {
    readyToRecord: true,
    recordingInProgress: false,
    reviewingRecording: false,
    recordingTime: 0,
    recordingTimeDisplay: ZERO_RECORDING_TIME,
    //timelineWidth: 0,
    playbackPositionOpacity: 0,
    playbackPositionWidth: 0,
    playbackPaused: true,
    currentPlaybackTime: 0,
    playbackDuration: 0,

    animatedDurationY: new Animated.Value(0),
    durationOpacity: new Animated.Value(0),
    playbackOpacity: new Animated.Value(0),

    get durationY(){
      return this.animatedDurationY.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -18]
        });
      }
  };

  handleError(){
    this.props.closeOverlay();
    this.props.errorCallback();

    this.props.showBanner({
      color: ERROR_COLOR,
      message: mapError(RECORD_AUDIO)
    });
  }

   async componentDidMount(){
    /*Dimensions.addEventListener('change', () => {
      //dummy setState to trigger onLayout of timeline
      //TODO: IOS NOT ROTATING?
      console.log('Dimensions triggered')
      this.setState({timelineWidth: 0});
    });*/

    clearInterval(this.state.recordingTimeInterval);
    this.props.audioRecorderPlayer.stopPlayer();

    const hasMicrophonePermission = await hasPermission('microphone', true);

    if(!hasMicrophonePermission){
      this.handleError();
    }
  }

  recordPressed = async () => {
    const hasMicrophonePermission = await hasPermission('microphone');

    //make sure user did not disable permission after loading this page
    if(!hasMicrophonePermission){
      this.handleError();
    }
    else{
      await this.props.audioRecorderPlayer.startRecorder();

      this.props.audioRecorderPlayer.addRecordBackListener((e) => {    
        return;
      });

      this.state.recordingTimeInterval = setInterval(() => {
        this.setState({
          recordingTimeDisplay: new Date(++this.state.recordingTime * 1000).toISOString().substr(15, 4).replace('.', ':')
        });
      }, 1000);

      this.setState({
        readyToRecord: false,
        recordingInProgress: true
      });

      audioTransitionAnimationFn(this.state.animatedDurationY).start();
      Animated.loop(audioOpacityAnimationFn(this.state.durationOpacity)).start();
    }
  }

  deleteRecordingPressed = async () => {
    await this.props.audioRecorderPlayer.stopRecorder();
    await this.props.audioRecorderPlayer.stopPlayer();
    this.props.audioRecorderPlayer.removeRecordBackListener();
    clearInterval(this.state.recordingTimeInterval);

    this.state.animatedDurationY.setValue(0);
    this.state.durationOpacity.setValue(0);
    this.state.playbackOpacity.setValue(0);
    
    this.setState({
      readyToRecord: true,
      recordingInProgress: false,
      reviewingRecording: false,
      recordingTimeDisplay: ZERO_RECORDING_TIME,
      playbackPositionOpacity: 0,
      playbackPositionWidth: 0 + '%',
      currentPlaybackTime: 0,
      playbackDuration: 0
    });

    //delete file?
  }

  doneRecordingPressed = async () => {
    await this.props.audioRecorderPlayer.stopRecorder();
    this.props.audioRecorderPlayer.removeRecordBackListener();
    clearInterval(this.state.recordingTimeInterval);
   
    this.setState({
      recordingInProgress: false,
      reviewingRecording: true,
      recordingTime: null
    });

    //////////parallel?
    Animated.parallel([
      audioTransitionAnimationFn(this.state.playbackOpacity)
    ]).start();
  }

  playbackPressed = async () => {
    if(!this.state.playbackPaused){
      await this.props.audioRecorderPlayer.pausePlayer();

      this.setState({
        playbackPaused: true
      });
    }
    else{
      await this.props.audioRecorderPlayer.startPlayer();
      
      this.props.audioRecorderPlayer.addPlayBackListener(async (e) => {
        let pausePlayback = false;
        e.current_position = parseFloat(e.current_position);
        e.duration = parseFloat(e.duration);
        let fillPercentage = (e.current_position / e.duration) * 100;

        if(e.current_position >= e.duration){
          await this.props.audioRecorderPlayer.stopPlayer();
          pausePlayback = true;
        }

        this.setState({
          playbackPositionOpacity: 1,
          playbackPositionWidth: (fillPercentage + '%'),
          playbackPaused: pausePlayback,
          currentPlaybackTime: e.current_position,
          playbackDuration: e.duration
        });
        
        return;
      });
    }
  }

  saveRecordingPressed = () => {

  }

//needed? was going to be used to make sure fill width always good?  but should be good as it's a % within timeline
/*  timelineLayoutCalculated = event => {
    const {width} = event.nativeEvent.layout;
        console.log('onLayout triggered with width ' + width)

    this.setState({timelineWidth: width});
  }*/

  rewindPressed = async () => {
        console.log('playback pos ' + this.state.currentPlaybackTime)

    let rewindPosition = Math.ceil(this.state.currentPlaybackTime - PLAYBACK_REWIND_AMOUNT);
        console.log('rewind pos ' + rewindPosition)

    rewindPosition = (rewindPosition < 0) ? 0 : rewindPosition;

    this.setState({currentPlaybackTime: rewindPosition});

    await this.props.audioRecorderPlayer.seekToPlayer(rewindPosition).catch(async () => {
      //a rewind attempted after playback ended so rewind from end of playback
      let seekToPosition = Math.ceil(this.state.playbackDuration) - PLAYBACK_REWIND_AMOUNT;

      //await this.props.audioRecorderPlayer.stopPlayer();
      this.playbackPressed();
      console.log(seekToPosition)

      if(seekToPosition > 0){
        this.fastForwardPressed(seekToPosition);
      }
    });
  }

  fastForwardPressed = async (seekToPosition) => {
    let fastForwardPosition = Math.floor(this.state.currentPlaybackTime) + PLAYBACK_FAST_FORWARD_AMOUNT;
    fastForwardPosition = (fastForwardPosition >= this.state.playbackDuration) ? this.state.playbackDuration : fastForwardPosition;
    
    if(seekToPosition !== undefined) fastForwardPosition = seekToPosition;

    this.setState({currentPlaybackTime: fastForwardPosition});

    ///////////
    await this.props.audioRecorderPlayer.seekToPlayer(fastForwardPosition).catch(e => {
      console.log('error' + e)
    });
  }

  //TODO: SIZE/LENGTH LIMITS
  //new Date(SECONDS * 1000).toISOString().substr(11, 8);

  render(){
    return (
      <>
        <Text style={PageStyles.title}>RECORD</Text>
      	
        <View style={RecordAudioStyles.recordAudioContainer}>
          {this.state.readyToRecord &&
            <TouchableOpacity onPress={() => this.recordPressed()} style={RecordAudioStyles.recordButton}>
              <View style={RecordAudioStyles.recordButtonDot}></View>
            </TouchableOpacity>
          }

          {this.state.recordingInProgress &&
            <View style={RecordAudioStyles.recordingDashboard}>
              <Animated.View style={[
                RecordAudioStyles.durationContainer, 
                {transform: [{translateY: this.state.durationY}]},
                {opacity: this.state.durationOpacity}
              ]}>
                <Text style={RecordAudioStyles.recordingDuration}>{this.state.recordingTimeDisplay}</Text>
              </Animated.View>

              <View style={RecordAudioStyles.recordingActionContainer}>
                <TouchableOpacity style={RecordAudioStyles.deleteRecording} onPress={() => this.deleteRecordingPressed()}>
                  <Text style={RecordAudioStyles.deleteRecordingLabel}>DELETE</Text>
                </TouchableOpacity>

                <TouchableOpacity style={RecordAudioStyles.doneRecording} onPress={() => this.doneRecordingPressed()}>
                  <Text style={RecordAudioStyles.doneRecordingLabel}>DONE</Text>
                </TouchableOpacity>
              </View>
            </View>
          }

          {this.state.reviewingRecording &&
            <Animated.View style={[
              RecordAudioStyles.playbackContainer, 
              {opacity: this.state.playbackOpacity}
            ]}>
              {this.state.playbackPaused &&
                <TouchableOpacity onPress={() => this.playbackPressed()} style={RecordAudioStyles.playbackControl}></TouchableOpacity>
              }

              {!this.state.playbackPaused &&
                <TouchableOpacity onPress={() => this.playbackPressed()} style={RecordAudioStyles.pauseControlContainer}>
                  <View style={RecordAudioStyles.pauseControl}></View><View style={RecordAudioStyles.pauseControl}></View>
                </TouchableOpacity>
              }

              <View style={RecordAudioStyles.recordingTimeContainer}>
                <Text style={RecordAudioStyles.recordingTime}>0:00</Text>

                <View style={RecordAudioStyles.timelineContainer}>
                  <View style={RecordAudioStyles.timeline} onLayout={this.timelineLayoutCalculated}>
                    <Animated.View style={[
                      RecordAudioStyles.timelinePosition, 
                      timelinePositionStyles(this.props),
                      {opacity: this.state.playbackPositionOpacity},
                      {width: this.state.playbackPositionWidth}
                    ]}></Animated.View>
                  </View>
                </View>

                <Text style={RecordAudioStyles.recordingTime}>{this.state.recordingTimeDisplay}</Text>
              </View>

              <View style={RecordAudioStyles.playbackSeekContainer}>
                <TouchableOpacity style={RecordAudioStyles.rewindControlContainer} onPress={() => this.rewindPressed()}>
                  <Text style={RecordAudioStyles.playbackSeekTime}>{PLAYBACK_REWIND_TIME}</Text><View style={RecordAudioStyles.playbackRewindArrow}></View>
                </TouchableOpacity>

                <View style={RecordAudioStyles.dot}></View>
                
                <TouchableOpacity style={RecordAudioStyles.fastForwardControl} onPress={() => this.fastForwardPressed()}>
                  <Text style={RecordAudioStyles.playbackSeekTime}>{PLAYBACK_FAST_FORWARD_TIME}</Text><View style={RecordAudioStyles.playbackFastForwardArrow}></View>
                </TouchableOpacity>
              </View>

              <View style={RecordAudioStyles.recordingActionContainer}>
                <TouchableOpacity style={RecordAudioStyles.deleteRecording} onPress={() => this.deleteRecordingPressed()}>
                  <Text style={RecordAudioStyles.deleteRecordingLabel}>DELETE</Text>
                </TouchableOpacity>

                <TouchableOpacity style={RecordAudioStyles.doneRecording} onPress={() => this.saveRecordingPressed()}>
                  <Text style={RecordAudioStyles.doneRecordingLabel}>CONTINUE</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          }
        </View>
      </>
    );
  }
}

function mapStateToProps(state){
  const currentPage = getCurrentPage();

  return {
    mediaCallback: currentPage.mediaCallback,
    errorCallback: currentPage.errorCallback
  };
}

const mapDispatchToProps = {
  closeOverlay,
  showBanner
};

export default connect(mapStateToProps, mapDispatchToProps)(RecordAudio);
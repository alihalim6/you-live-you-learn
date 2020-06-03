import React, {Component} from 'react';
import {
	Modal,
	View, 
	TouchableOpacity, 
	ScrollView, 
	Text, 
	KeyboardAvoidingView, 
	SafeAreaView
} from 'react-native';
import {randomColor} from 'randomcolor';
import {connect} from 'react-redux';
import {hideOverlay} from '../redux/actions/OverlayActions';
import OverlayStyles from '../styles/OverlayStyles';
import About from './About';
import SignUp from './SignUp';
import {SIGN_UP, ABOUT, isIOS} from '../constants/AppConstants';

class Overlay extends Component{
  closeModal = () => {
  	this.props.hideOverlay();
  }

  render(){
  	const closeButtonColor = randomColor({luminosity: 'dark'});
  	const keyboardAvoidingBehavior = (isIOS ? 'padding' : 'height');

  	return (
  	  <Modal animationType="fade" transparent={true} statusBarTranslucent={true} onRequestClose={() => this.closeModal()}>
        <KeyboardAvoidingView style={OverlayStyles.container} behavior={keyboardAvoidingBehavior}>
          <SafeAreaView style={OverlayStyles.overlay}>
            <ScrollView contentContainerStyle={OverlayStyles.scrollView}>
              {(this.props.currentOverlay === ABOUT) && <About/>}
              {(this.props.currentOverlay === SIGN_UP) && <SignUp/>}

			  <TouchableOpacity onPress={() => this.closeModal()} style={OverlayStyles.touchableClose}>
                <View style={[OverlayStyles.closeButton, OverlayStyles.closeButtonLineOne, {backgroundColor: closeButtonColor}]}></View>
                <View style={[OverlayStyles.closeButton, OverlayStyles.closeButtonLineTwo, {backgroundColor: closeButtonColor}]}></View>
              </TouchableOpacity>
            </ScrollView>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </Modal>
    );
  }
}

const mapDispatchToProps = {
  hideOverlay
}

export default connect(null, mapDispatchToProps)(Overlay);
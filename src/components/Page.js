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
import {closeOverlay} from '../redux/actions/OverlayActions';
import {PageStyles, closeButtonOneStyle, closeButtonTwoStyle} from '../styles/PageStyles';
import About from './About';
import SignUp from './SignUp';
import Gallery from './Gallery';
import NewPost from './NewPost';
import {
  SIGN_UP,
  ABOUT,
  isIOS,
  getRandomDarkColor,
  NEW_POST
} from '../constants/AppConstants';
import {GALLERY} from '../constants/CameraConstants';

class Page extends Component{
  state = {
    pageButtonColor: getRandomDarkColor()
  };

  backArrowPressed = () => {
    this.props.page.backButtonFn();
  }

  closeButtonPressed = () => {
  	this.props.closeOverlay();

    if(this.props.page.closeCallback){
      this.props.page.closeCallback();
    }
  }

  render(){
//  TODO: HANDLE ROTATION OF DEVICE (PAGE SHRINKS AND MOVES) (see supportedOrientations on Modal API?)

  	const keyboardAvoidingBehavior = (isIOS ? 'padding' : 'height');
    const enableBackButton = this.props.page.enableBackButton;
    const disableKeyboardAvoidingView = this.props.page.disableKeyboardAvoidingView;

  	return (
  	  <Modal 
        animationType="fade" 
        transparent={true} 
        statusBarTranslucent={true} 
        onRequestClose={() => this.closeModal()} 
        visible={!this.props.overlayInvisible}
      >
        <KeyboardAvoidingView style={PageStyles.container} behavior={keyboardAvoidingBehavior} enabled={!disableKeyboardAvoidingView}>
          <SafeAreaView style={[PageStyles.page, this.props.page.styles]}>
            {(this.props.page.name !== GALLERY) &&
              <ScrollView contentContainerStyle={PageStyles.scrollView}>
                {(this.props.page.name === ABOUT) && <About/>}
                {(this.props.page.name === SIGN_UP) && <SignUp/>}
                {(this.props.page.name === NEW_POST) && <NewPost/>}
  			 		  </ScrollView>
            }

            {(this.props.page.name === GALLERY) && <Gallery/>}

            {enableBackButton &&
              <TouchableOpacity onPress={() => this.backArrowPressed()} style={[PageStyles.pageButton, PageStyles.backButton]}>
                <View style={[PageStyles.arrowOneStyle, {backgroundColor: this.state.pageButtonColor}]}></View>
                <View style={[PageStyles.arrowTwoStyle, {backgroundColor: this.state.pageButtonColor}]}></View>
                <View style={[PageStyles.arrowThreeStyle, {backgroundColor: this.state.pageButtonColor}]}></View>
              </TouchableOpacity>
            }

            <TouchableOpacity onPress={() => this.closeButtonPressed()} style={[PageStyles.overlayButton, PageStyles.closeButton]}>
              <View style={[closeButtonOneStyle, {backgroundColor: this.state.pageButtonColor}]}></View>
              <View style={[closeButtonTwoStyle, {backgroundColor: this.state.pageButtonColor}]}></View>
            </TouchableOpacity>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </Modal>
    );
  }

}

function mapStateToProps(state){
  return {
    overlayInvisible: state.overlay.overlayInvisible
  };
}

const mapDispatchToProps = {
  closeOverlay
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);
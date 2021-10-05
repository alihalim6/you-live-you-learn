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
import Icon from 'react-native-vector-icons/MaterialIcons';
import {randomColor} from 'randomcolor';
import {connect} from 'react-redux';
import {closeOverlay} from '../redux/actions/OverlayActions';
import PageStyles from '../styles/PageStyles';
import About from './About';
import SignUp from './SignUp';
import Gallery from './Gallery';
import NewPost from './NewPost';
import SubmitPost from './SubmitPost';
import {
  SIGN_UP,
  ABOUT,
  isIOS,
  getRandomDarkColor,
  NEW_POST,
  PAGE_CLOSE_BUTTON_A11Y_LABEL,
  SUBMIT_POST,
  booleanToNumber
} from '../constants/AppConstants';
import {GALLERY} from '../constants/CameraConstants';
import {RECORD_AUDIO} from '../constants/PostConstants';
import RecordAudio from '../components/RecordAudio';

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
// iOS DOESN'T EVEN ROTATE?

  	const keyboardAvoidingBehavior = (isIOS ? 'padding' : 'height');
    const enableBackButton = this.props.page.enableBackButton;
    const hideCloseButton = this.props.page.hideCloseButton;
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
                {(this.props.page.name === SUBMIT_POST) && <SubmitPost/>}
              </ScrollView>
            }

            {(this.props.page.name === GALLERY) && <Gallery/>}

            <View style={PageStyles.buttonContainer}>
              <TouchableOpacity onPress={() => this.backArrowPressed()}>
                <Icon style={[PageStyles.pageButton, PageStyles.backButton, {opacity: booleanToNumber(enableBackButton)}]} name="west" color={this.state.pageButtonColor}/>
              </TouchableOpacity>
                  
              
              {!hideCloseButton &&
                <TouchableOpacity 
                  onPress={() => this.closeButtonPressed()} 
                  accessible={true}
                  accessibilityLabel={PAGE_CLOSE_BUTTON_A11Y_LABEL}
                >
                  <Icon style={PageStyles.closeButton} name="close" color={this.state.pageButtonColor}/>
                </TouchableOpacity>
              }
            </View>
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
import React, {Component} from 'react';
import {
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Image,
  Animated,
  Keyboard
} from 'react-native';
import {connect} from 'react-redux';
import {PageStyles} from '../styles/PageStyles';
import SignUpStyles from '../styles/SignUpStyles';
import {signUpUser, signInUser} from '../services/UserService';
import ProfileImage from './ProfileImage';
import {
  BASE_COLOR_DARK, 
  ERROR_COLOR, 
  isIOS, 
  BLACK_COLOR, 
  SIGN_UP,
  OVERLAY_Y,
  OVERLAY_X,
  OVERLAY_HIDE_OPACITY,
  OVERLAY_REVEAL_OPACITY,
  interpolateOverlayAnimProp,
  PAGE,
  getCurrentPage,
  getRandomAnimatedColor,
  signInAnimationProps,
  signUpAnimationFn,
  signInAnimationFn
} from '../constants/AppConstants';

import {
  MAX_USERNAME_LENGTH, 
  MAX_PASSWORD_LENGTH, 
  usernameRegex, 
  passwordRegex, 
  PASSWORD_PLACEHOLDER,
  COLOR_BAR_SCALE_X,
  COLOR_BAR_X,
  COLOR_BAR_TRANSLATEX_ANIM_DELAY,
  USERNAME_PLACEHOLDER,
  CONFIRM_PASSWORD_PLACEHOLDER,
  SIGN_UP_BUTTON_A11Y_LABEL,
  SIGN_UP_LOADING_A11Y_LABEL,
  TRANSLATEY_ANIM_DELAY,
  SIGN_IN_TITLE_Y,
  CHANGE_TITLE_ANIM_DELAY,
  PAGE_HEIGHT
} from '../constants/SignUpConstants';
import {showBanner} from '../redux/actions/BannerActions';
import {closeOverlay, showOverlay, navigateOverlay} from '../redux/actions/OverlayActions';

class SignUp extends Component{
  state = {
    signUpInProgress: false,
    signInShowing: false,
    signInInProgress: false,
    signInTitleShowing: false,

    //credentials
    username: {},
    password: {
      placeholder: PASSWORD_PLACEHOLDER
    },
    confirmPassword: {},

    //animations
    animatedColorBarScale_X: new Animated.Value(0),
    animatedColorBarColor: new Animated.Value(0),
    animatedColorBarX: new Animated.Value(0),
    animatedFormOpacity: new Animated.Value(0),
    animatedFormX: new Animated.Value(0),
    animatedFormY: new Animated.Value(0),
    animatedPageHeight: new Animated.Value(0),
    animatedProfileImageTextX: new Animated.Value(0),
    animatedProfileImageTextOpacity: new Animated.Value(0),
    animatedSignInOpacity: new Animated.Value(0),
    animatedSignInTitleY: new Animated.Value(0),

    get colorBarSCALE_X(){
      return interpolateOverlayAnimProp(this.animatedColorBarScale_X, COLOR_BAR_SCALE_X);
    },
    get colorBarColor(){
      return interpolateOverlayAnimProp(this.animatedColorBarColor, getRandomAnimatedColor());
    },
    get colorBarX(){
      return interpolateOverlayAnimProp(this.animatedColorBarX, COLOR_BAR_X);
    },
    get formOpacity(){
      return interpolateOverlayAnimProp(this.animatedFormOpacity, OVERLAY_HIDE_OPACITY);
    },
    get formX(){
      return interpolateOverlayAnimProp(this.animatedFormX, OVERLAY_X);
    },
    get formY(){
      return interpolateOverlayAnimProp(this.animatedFormY, OVERLAY_Y);
    },
    get pageHeight(){
      return interpolateOverlayAnimProp(this.animatedPageHeight, PAGE_HEIGHT);
    },
    get profileImageTextX(){
      return interpolateOverlayAnimProp(this.animatedProfileImageTextX, OVERLAY_X);
    },
    get profileImageTextOpacity(){
      return interpolateOverlayAnimProp(this.animatedProfileImageTextOpacity, OVERLAY_HIDE_OPACITY);
    },
    get signInOpacity(){
      return interpolateOverlayAnimProp(this.animatedSignInOpacity, OVERLAY_REVEAL_OPACITY);
    },
    get signInTitleY(){
      return interpolateOverlayAnimProp(this.animatedSignInTitleY, SIGN_IN_TITLE_Y);
    }
  };

  usernameChanged = (value) => {
  	let username = this.state.username;
  	username.touched = true;
  	username.value = value;
  	username.valid = !usernameRegex.pattern.test(value);
  	
    this.setState({username});
  }

  passwordValid = (value) => {
  	return (value ? ((value.length >= passwordRegex.minLength) && passwordRegex.pattern.test(value)) : false);
  }

  passwordChanged = (value) => {
  	const isValid = this.passwordValid(value);
  	let password = this.state.password;
  	password.touched = true;
    password.value = value;

    //only set validity during typing when requirements met (and reveal confirm password field) and vice versa
    if(!password.valid && isValid){
    	password.valid = true;
    }
    else if(password.valid && !isValid){
    	password.valid = false;
    }
 
    this.setState(password);
  }

  confirmPasswordChanged = (value) => {
  	let confirmPassword = this.state.confirmPassword;
  	let passwordsMatch = (value === this.state.password.value);
  	confirmPassword.value = value;
  	confirmPassword.showPasswordsMustMatchMessage = !passwordsMatch;
    confirmPassword.valid = passwordsMatch;

    this.setState(confirmPassword);
  }

  revealConfirmPassword = () => {
  	return ((this.state.password.value && !this.state.signInShowing) ? 
      (this.state.password.touched && this.state.password.valid) : false);
  }

  passwordFieldFocused = () => {
  	let password = this.state.password;

  	//reset confirm password field
  	this.confirmPasswordFieldFocused();

  	if(isIOS){
  		password.value = null;
  	}

    if(!this.state.signInShowing){
  	  password.placeholder = passwordRegex.requirementMessage;
    }

    this.setState({password});
  }

  confirmPasswordFieldFocused = () => {
  	let confirmPassword = this.state.confirmPassword;
  	confirmPassword.value = null;
  	confirmPassword.showPasswordsMustMatchMessage = false;
  	confirmPassword.valid = true;

  	this.setState({confirmPassword});
  }

  passwordFieldBlurred = () => {
  	let password = this.state.password;

  	if(password.touched){
  	  password.valid = this.passwordValid(password.value);
  	}
  	else{
  	  password.placeholder = PASSWORD_PLACEHOLDER;
  	}

  	this.setState(password);
  }

  allCredentialsValid = () => {
  	const credentials = [this.state.username, this.state.password, this.state.confirmPassword];
  	let allValid = true;

  	credentials.forEach(credential => {
  		allValid = ((allValid && credential.value) ? credential.valid : false);
  	});

  	return allValid;
  }

  credentialValidity = (credential) => {
    return ((credential.valid === false && !this.state.signInShowing) ? ERROR_COLOR : BASE_COLOR_DARK);
  }

  signInCredentialsValid = () => {
    const credentials = [this.state.username, this.state.password];
    let allValid = true;

    credentials.forEach(credential => {
      allValid = ((allValid && credential.value) ? true : false);
    });

    return allValid;
  }

  backButtonPressed = () => {
    this.setState({
      signInShowing: false,
      signInTitleShowing: false
    });

    this.state.animatedPageHeight.setValue(0);

    this.props.navigateOverlay({
      name: SIGN_UP,
      enableBackButton: false,
      type: PAGE
    });

    this.state.animatedProfileImageTextX.setValue(0);
    this.state.animatedProfileImageTextOpacity.setValue(0);
    this.state.animatedFormY.setValue(0);
    this.state.animatedSignInOpacity.setValue(0);
    this.state.animatedSignInTitleY.setValue(0);
  }

  signInTextPressed = () => {
    this.setState({signInShowing: true});

    //clear out field in case it has a value on sign in press (which hides field), then user presses back to sign up (re-shown empty on iOS)
    this.confirmPasswordFieldFocused();

    setTimeout(() => {
      this.setState({signInTitleShowing: true});
    }, CHANGE_TITLE_ANIM_DELAY);

    Animated.parallel([
      signInAnimationFn(this.state.animatedProfileImageTextX),
      signInAnimationFn(this.state.animatedProfileImageTextOpacity),
      signInAnimationFn(this.state.animatedFormY, TRANSLATEY_ANIM_DELAY),
      signInAnimationFn(this.state.animatedSignInOpacity, TRANSLATEY_ANIM_DELAY),
      signInAnimationFn(this.state.animatedSignInTitleY, TRANSLATEY_ANIM_DELAY)
    ]).start(() => {
            //make height auto
      this.props.navigateOverlay({
        name: SIGN_UP,
        styles: SignUpStyles.signInStyles,
        type: PAGE
      });
      
      Animated.timing(this.state.animatedPageHeight, signInAnimationProps)
        .start(() => {
          this.props.navigateOverlay({
            name: SIGN_UP,
            enableBackButton: true,
            backButtonFn: () => this.backButtonPressed(),
            styles: SignUpStyles.signInStyles,
            type: PAGE
          });
        });
    });
  }

  signUpPressed = () => {
    this.setState({signUpInProgress: true});
    
    signUpUser(this.state.username.value, this.state.password.value).then(signUpSucceeded => {
      if(signUpSucceeded){
        Animated.parallel([
          signUpAnimationFn(this.state.animatedColorBarScale_X),
          signUpAnimationFn(this.state.animatedColorBarColor),
          signUpAnimationFn(this.state.animatedColorBarX, COLOR_BAR_TRANSLATEX_ANIM_DELAY),
          signUpAnimationFn(this.state.animatedFormOpacity),
          signUpAnimationFn(this.state.animatedFormX)
        ]).start(() => {
          this.setState({signUpInProgress: false});
        });
      }
      else{
        this.setState({signUpInProgress: false});
      }
    });
  }

  signInPressed = () => {
    //allow user to attempt sign in with invalid credentials
    const invalidSignIn = (!this.state.username.valid || !this.state.password.valid);

    this.setState({signInInProgress: true});
    
    signInUser(this.state.username.value, this.state.password.value, invalidSignIn).then(signInSucceeded => {
      if(signInSucceeded){
        this.props.showBanner({
          color: BLACK_COLOR,
          message: 'WELCOME BACK!'
        });

        this.props.closeOverlay();
      }
      else{
        this.setState({signInInProgress: false});
      }
    });
  }

  render(){
  	return (
  	  <Animated.View style={{height: this.state.pageHeight}}>
        {!this.state.signInTitleShowing &&
    	    <Text style={[PageStyles.title, SignUpStyles.title]}>
            SIGN UP
          </Text>
        }

        {this.state.signInTitleShowing &&
          <Animated.Text style={[
            PageStyles.title, 
            SignUpStyles.title,
            SignUpStyles.signInTitle,
            {opacity: this.state.signInOpacity},
            {transform: [{translateY: this.state.signInTitleY}]}
          ]}>
            SIGN IN
          </Animated.Text>
        }

  	    <Animated.View style={[
  	      SignUpStyles.colorBar,
  	      {backgroundColor: this.state.colorBarColor},
  	      {transform: [
  	      	{scaleX: this.state.colorBarSCALE_X},
  	      	{translateX: this.state.colorBarX}
  	      ]}
  	    ]}>
  	    </Animated.View>

  	    <Animated.View style={[
	    		SignUpStyles.form,
	    		{opacity: this.state.formOpacity},
	    		{transform: [
            {translateX: this.state.formX},
            {translateY: this.state.formY}
          ]}
	    	]}>
          <Animated.View style={[
            {opacity: this.state.profileImageTextOpacity},
            {transform: [{translateX: this.state.profileImageTextX}]}
          ]}>
    	      <ProfileImage cameraOnly={true} defaultPositioning={true}/>

            <TouchableOpacity onPress={() => this.signInTextPressed()}>
      	      <Text style={SignUpStyles.prompt}>
                Lorem ipsum dolor sit amet, sed do eiusmod tempor incididunt. Ut labore? <Text style={SignUpStyles.signInText}>SIGN IN</Text>
              </Text>
            </TouchableOpacity>
          </Animated.View>

  	      <TextInput style={[SignUpStyles.credentialsField, {borderColor: this.credentialValidity(this.state.username)}]}
  	        placeholder={USERNAME_PLACEHOLDER}
  	        disabled={this.state.signUpInProgress}
  	        textContentType="username"
  	        maxLength={MAX_USERNAME_LENGTH} 
  	        onChangeText={value => this.usernameChanged(value)}/>
  	    
	  	    {((this.state.username.valid === false) && (!this.state.signInShowing)) &&
	  	    	<Text style={SignUpStyles.invalidMessage}>{usernameRegex.invalidMessage}</Text>
	  	    }

	  	    <TextInput style={[SignUpStyles.credentialsField, {borderColor: this.credentialValidity(this.state.password)}]} 
	  	      placeholder={this.state.password.placeholder}
	  	      disabled={this.state.signUpInProgress}
	  	      blurOnSubmit={false}
						onSubmitEditing={() => Keyboard.dismiss()}
	  	      secureTextEntry={true}
	  	      textContentType="password"
	  	      maxLength={MAX_PASSWORD_LENGTH}
	  	      clearTextOnFocus={true}
	  	      onFocus={() => this.passwordFieldFocused()}
	  	      onBlur={() => this.passwordFieldBlurred()}
	  	      onChangeText={value => this.passwordChanged(value)}/>

  	  	  {this.revealConfirmPassword() &&
            <>
			  	    <TextInput style={[SignUpStyles.credentialsField, {borderColor: this.credentialValidity(this.state.confirmPassword)}]}
			  	      placeholder={CONFIRM_PASSWORD_PLACEHOLDER}
			  	      disabled={this.state.signUpInProgress}
			  	      blurOnSubmit={false}
								onSubmitEditing={() => Keyboard.dismiss()}
			  	      secureTextEntry={true}
			  	      textContentType="password"
			  	      maxLength={MAX_PASSWORD_LENGTH}
			  	      clearTextOnFocus={true}
			  	      onFocus={() => this.confirmPasswordFieldFocused()}
			  	      onChangeText={value => this.confirmPasswordChanged(value)}/>  

			  	    {this.state.confirmPassword.showPasswordsMustMatchMessage &&
			  	    	<Text style={SignUpStyles.invalidMessage}>{passwordRegex.passwordsMatchMessage}</Text>
			  	    }
            </>
  	  	  }
  	  	  
	  	    {this.allCredentialsValid() && !this.state.signUpInProgress && !this.state.signInShowing &&
	  	      <TouchableOpacity 
              style={SignUpStyles.submitButton}
              onPress={() => this.signUpPressed()}
              accessible={true}
              accessibilityLabel={SIGN_UP_BUTTON_A11Y_LABEL}>
	  	          <Text style={SignUpStyles.signUpLabel}>SIGN UP</Text>
	  	      </TouchableOpacity>
	  	    }

          {this.signInCredentialsValid() && this.state.signInShowing && !this.state.signInInProgress &&
            <Animated.View style={{opacity: this.state.signInOpacity}}>
              <TouchableOpacity 
                style={SignUpStyles.submitButton}
                onPress={() => this.signInPressed()}>
                  <Text style={SignUpStyles.signUpLabel}>SIGN IN</Text>
              </TouchableOpacity>
            </Animated.View>
          }

	  	    {(this.state.signUpInProgress || this.state.signInInProgress) &&
            <View accessible={true} accessibilityLabel={SIGN_UP_LOADING_A11Y_LABEL}>
	  	        <Image style={SignUpStyles.loading} source={require('../assets/loading.gif')}/>
            </View>
	  	    }
	  	  </Animated.View>
  	  </Animated.View>
  	);
  }

}

const mapDispatchToProps = {
  closeOverlay,
  showBanner,
  showOverlay,
  navigateOverlay
};

export default connect(null, mapDispatchToProps)(SignUp);
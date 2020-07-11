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
import {OverlayStyles} from '../styles/OverlayStyles';
import SignUpStyles from '../styles/SignUpStyles';
import {signUpUser} from '../services/UserService';
import ProfileImage from './ProfileImage';
import {BASE_COLOR_DARK, ERROR_COLOR, isIOS} from '../constants/AppConstants';

import {
	MAX_USERNAME_LENGTH, 
	MAX_PASSWORD_LENGTH, 
	usernameRegex, 
	passwordRegex, 
	PASSWORD_PLACEHOLDER,
	TRANSITION_ANIM_KEYFRAME_ARRAY,
	TRANSITION_SCALEX_ANIM_OUTPUT,
	transitionRandomColorAnimOutput,
	TRANSITION_BAR_TRANSLATEX_ANIM_OUTPUT,
	TRANSITION_FORM_OPACITY_ANIM_OUTPUT,
	TRANSITION_FORM_TRANSLATEX_ANIM_OUTPUT,
	TRANSITION_TRANSLATEX_ANIM_DELAY,
	transitionAnimationProps,
	transitionAnimationFn
} from '../constants/SignUpConstants';

class SignUp extends Component{
  state = {
  	signUpInProgress: false,

  	//credentials
    username: {},
    password: {
      placeholder: PASSWORD_PLACEHOLDER
    },
    confirmPassword: {},

    //animation
    transitionBarScaleX: new Animated.Value(0),
    transitionBarColor: new Animated.Value(0),
    transitionBarTranslateX: new Animated.Value(0),
    transitionFormTranslateX: new Animated.Value(0),
    transitionFormOpacity: new Animated.Value(0)
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
  	return (this.state.password.value ? (this.state.password.touched && this.state.password.valid) : false);
  }

  passwordFieldFocused = () => {
  	let password = this.state.password;

  	//reset confirm password field
  	this.confirmPasswordFieldFocused();

  	if(isIOS){
  		password.value = null;
  	}

  	password.placeholder = passwordRegex.requirementMessage;
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
    return (credential.valid === false ? ERROR_COLOR : BASE_COLOR_DARK);
  }
  
  signUp = () => {
		this.setState({signUpInProgress: true});
	  
	  signUpUser(this.state.username.value, this.state.password.value, this.props.profileImage)
	  	.then(signUpSucceeded => {
        if(signUpSucceeded){
	  		  Animated.parallel([
  	  			transitionAnimationFn(this.state.transitionBarScaleX),
  	  			transitionAnimationFn(this.state.transitionBarColor),
  	  			transitionAnimationFn(this.state.transitionBarTranslateX, TRANSITION_TRANSLATEX_ANIM_DELAY),
  	  			transitionAnimationFn(this.state.transitionFormOpacity),
  	  			transitionAnimationFn(this.state.transitionFormTranslateX)
  	  		]).start();
			}
      else{
				this.setState({signUpInProgress: false});
			}
    });
  }

  interpolateAnimProp = (prop, propOutput) => {
  	return prop.interpolate({
		  inputRange: TRANSITION_ANIM_KEYFRAME_ARRAY,
		  outputRange: propOutput
		});
  }

  render(){
  	return (
  	  <>
  	    <Text style={[OverlayStyles.title, SignUpStyles.title]}>SIGN UP</Text>

  	    <Animated.View style={[
  	      SignUpStyles.transitionBar,
  	      {backgroundColor: this.interpolateAnimProp(this.state.transitionBarColor, transitionRandomColorAnimOutput())},
  	      {transform: [
  	      	{scaleX: this.interpolateAnimProp(this.state.transitionBarScaleX, TRANSITION_SCALEX_ANIM_OUTPUT)},
  	      	{translateX: this.interpolateAnimProp(this.state.transitionBarTranslateX, TRANSITION_BAR_TRANSLATEX_ANIM_OUTPUT)}
  	      ]}
  	    ]}>
  	    </Animated.View>

  	    <Animated.View style={[
	    		SignUpStyles.form,
	    		{opacity: this.interpolateAnimProp(this.state.transitionFormOpacity, TRANSITION_FORM_OPACITY_ANIM_OUTPUT)},
	    		{transform: [{translateX: this.interpolateAnimProp(this.state.transitionFormTranslateX, TRANSITION_FORM_TRANSLATEX_ANIM_OUTPUT)}]}
	    	]}>
  	      <ProfileImage cameraOnly={true}/>

  	      <Text style={SignUpStyles.prompt}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</Text>

  	      <TextInput style={[SignUpStyles.credentialsField, {borderColor: this.credentialValidity(this.state.username)}]}
  	        placeholder="Username"
  	        disabled={this.state.signUpInProgress}
  	        textContentType="username"
  	        maxLength={MAX_USERNAME_LENGTH} 
  	        onChangeText={value => this.usernameChanged(value)}/>
  	    
	  	    {(this.state.username.valid === false) &&
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
			  	      placeholder="Confirm Password"
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
	  	  
	  	    {this.allCredentialsValid() && !this.state.signUpInProgress &&
	  	      <TouchableOpacity style={SignUpStyles.signUpButton} onPress={() => this.signUp()}>
	  	        <Text style={SignUpStyles.signUpLabel}>SIGN UP</Text>
	  	      </TouchableOpacity>
	  	    }

	  	    {this.state.signUpInProgress &&
	  	      <Image style={SignUpStyles.loading} source={require('../assets/loading.gif')}/>
	  	    }
	  	  </Animated.View>
  	  </>
  	);
  }

}

function mapStateToProps(state){
  return {
    profileImage: state.user.profileImage
  };
}

export default connect(mapStateToProps)(SignUp);
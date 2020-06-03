import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import {connect} from 'react-redux';
import OverlayStyles from '../styles/OverlayStyles';
import SignUpStyles from '../styles/SignUpStyles';
import {signUpUser} from '../services/UserService';
import ProfileImage from './ProfileImage';
import {
	MAX_USERNAME_LENGTH, 
	MAX_PASSWORD_LENGTH, 
	BASE_COLOR_DARK, 
	ERROR_COLOR, 
	usernameRegex, 
	passwordRegex, 
	isIOS,
	PASSWORD_PLACEHOLDER
} from '../constants/AppConstants';

class SignUp extends Component{
  state = {
    username: {},
    password: {
      placeholder: PASSWORD_PLACEHOLDER
    },
    confirmPassword: {},
    signUpInProgress: false
  };
  
  usernameChanged = (value) => {
  	let username = this.state.username;
  	username.touched = true;
  	username.value = value;
  	username.valid = !usernameRegex.pattern.test(value);
	username.showInvalidMessage = !username.valid;
  	
    this.setState(username);
  }

  passwordChanged = (value) => {
  	let password = this.state.password;
  	password.touched = true;
    password.value = value;

    this.setState(password);
  }

  confirmPasswordChanged = (value) => {
  	let confirmPassword = this.state.confirmPassword;
  	let passwordsMatch = (value === this.state.password.value);
  	confirmPassword.showPasswordsMatchMessage = !passwordsMatch;
    confirmPassword.valid = passwordsMatch;

    this.setState(confirmPassword);
  }

  passwordFieldBlurred = () => {
  	let password = this.state.password;

  	if(password.touched){
  	  password.valid = passwordRegex.pattern.test(password.value);
  	}
  	else{
  	  password.placeholder = PASSWORD_PLACEHOLDER;
  	}

  	this.setState(this.state.password);
  }

  signUp = () => {
  	this.setState({signUpInProgress: true});
    signUpUser(this.state.username.value, this.state.password.value);
  }

  credentialValidity = (credential) => {
    return (credential.valid === false ? ERROR_COLOR : BASE_COLOR_DARK);
  }

  passwordFieldFocused = (password) => {
  	password.placeholder = passwordRegex.requirementMessage;
  	password.valid = true;
    this.setState(password);
  }

  allCredentialsValid = () => {
  	//TODO FIX BENG VALID WHEN VALID SET TO TRUE ON FOCUS
    return (this.state.username.valid && this.state.password.valid && this.state.confirmPassword.valid);
  }

  render(){
  	return (
  	  <View style={SignUpStyles.container}>
  	    <Text style={[OverlayStyles.title, SignUpStyles.title]}>Sign Up</Text>
  	    
  	    <ProfileImage cameraOnly={true}/>

  	    <Text style={SignUpStyles.prompt}>Sign up to blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah</Text>

  	    <TextInput style={[SignUpStyles.credentialsField, {borderColor: this.credentialValidity(this.state.username)}]}
  	      placeholder="Username"
  	      disabled={this.state.signUpInProgress}
  	      textContentType="username"
  	      maxLength={MAX_USERNAME_LENGTH} 
  	      onChangeText={value => this.usernameChanged(value)}/>
  	    
  	    {this.state.username.showInvalidMessage && 
  	      <Text style={SignUpStyles.invalidMessage}>{usernameRegex.invalidMessage}</Text>
  	    }

  	    <TextInput style={[SignUpStyles.credentialsField, {borderColor: this.credentialValidity(this.state.password)}]} 
  	      placeholder={this.state.password.placeholder}
  	      disabled={this.state.signUpInProgress}
  	      secureTextEntry={true}
  	      textContentType="password"
  	      maxLength={MAX_PASSWORD_LENGTH}
  	      clearTextOnFocus={true}
  	      onFocus={() => this.passwordFieldFocused(this.state.password)}
  	      onBlur={() => this.passwordFieldBlurred()}
  	      onChangeText={value => this.passwordChanged(value)}/>

  	    <TextInput style={[SignUpStyles.credentialsField, {borderColor: this.credentialValidity(this.state.confirmPassword)}]}
  	      placeholder="Confirm Password"
  	      disabled={this.state.signUpInProgress}
  	      secureTextEntry={true}
  	      textContentType="password"
  	      maxLength={MAX_PASSWORD_LENGTH}
  	      clearTextOnFocus={true}
  	      onFocus={() => this.passwordFieldFocused(this.state.confirmPassword)}
  	      onChangeText={value => this.confirmPasswordChanged(value)}/>

  	    {this.state.confirmPassword.showPasswordsMatchMessage && 
  	      <Text style={SignUpStyles.invalidMessage}>{passwordRegex.passwordsMatchMessage}</Text>
  	    }
  	  
  	    {this.allCredentialsValid() && !this.state.signUpInProgress &&
  	      <TouchableOpacity style={SignUpStyles.signUpButton} onPress={() => this.signUp()}>
  	        <Text style={SignUpStyles.signUpLabel}>SIGN UP</Text>
  	      </TouchableOpacity>
  	    }

  	    {this.state.signUpInProgress &&
  	      <Image style={SignUpStyles.loading} source={require('../assets/loading.gif')}/>
  	    }
  	  </View>
  	);
  }
}

function mapStateToProps(state){
  return {
    userProfileImage: state.user.profileImage
  };
}

export default connect(mapStateToProps)(SignUp);
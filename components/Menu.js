import React, {Component} from 'react';
import {View, Text, TouchableHighlight, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {BlurView} from "@react-native-community/blur";
import AsyncStorage from '@react-native-community/async-storage';
import {showOverlay} from '../redux/actions/OverlayActions';
import {setUserId, setUserSignedIn, setUserProfileImage} from '../redux/actions/UserActions';
import {MenuStyles, containerMarginTop} from '../styles/MenuStyles';
import AppStyles from '../styles/AppStyles';
import {
	COLOR_FADE_OPACITY, 
	ABOUT, 
	SIGN_UP, 
	getRandomFadeColor,
	BLUR_BACKGROUND_TYPE, 
	BLUR_BACKGROUND_AMOUNT, 
	BLUR_BACKGROUND_FALLBACK_COLOR,
	USER_ID,
	USER_SIGNED_IN,
	PROFILE_IMAGE,
	handleAsyncStorageError
} from '../constants/AppConstants';
import MenuHeader from './MenuHeader';

class Menu extends Component{
  /*state = {
    	<TouchableHighlight activeOpacity={COLOR_FADE_OPACITY} underlayColor={getRandomFadeColor()} onPress={() => this.signOutPressed()}>
					      <View style={MenuStyles.item}>
					      	<Text style={MenuStyles.menuItemLabel}>RESET DATA</Text>
					      </View>
			      	</TouchableHighlight>
  };*/

  settingsPressed=()=>{}

  menuItemPressed = (overlay) => {
  	this.props.navigation.closeDrawer();
  	this.props.showOverlay(overlay);
  }

  signOutPressed = () => {
  	//TODO SHOW BANNER (BLACK)

  	AsyncStorage.setItem(USER_ID, '', handleAsyncStorageError);
  	AsyncStorage.setItem(USER_SIGNED_IN, '', handleAsyncStorageError);
  	AsyncStorage.setItem(PROFILE_IMAGE, '', handleAsyncStorageError);

  	this.props.setUserId(null);
  	this.props.setUserSignedIn(false);
  	this.props.setUserProfileImage(null);

  	this.props.navigation.closeDrawer();
  }

  render(){
		return (
			<>
			  <View style={[MenuStyles.container, {marginTop: containerMarginTop(this.props.signedIn)}]}>
					<MenuHeader navigation={this.props.navigation}/>

					<ScrollView>
			  	  <View style={MenuStyles.menuItems}>
			      	{!this.props.signedIn && 
				      	<TouchableHighlight activeOpacity={COLOR_FADE_OPACITY} underlayColor={getRandomFadeColor()} onPress={() => this.menuItemPressed(SIGN_UP)}>
						      <View style={MenuStyles.item}>
						      	<Text style={MenuStyles.menuItemLabel}>Sign Up</Text>
						      </View>
				      	</TouchableHighlight>
			      	}

			      	{this.props.signedIn &&
				      	<TouchableHighlight activeOpacity={COLOR_FADE_OPACITY} underlayColor={getRandomFadeColor()} onPress={() => this.signOutPressed()}>
						      <View style={[MenuStyles.item, MenuStyles.topMenuItem]}>
						      	<Text style={MenuStyles.menuItemLabel}>Sign Out</Text>
						      </View>
				      	</TouchableHighlight>
			      	}

			      	<TouchableHighlight activeOpacity={COLOR_FADE_OPACITY} underlayColor={getRandomFadeColor()} onPress={() => this.settingsPressed()}>
				  	  	<View style={MenuStyles.item}>
			      			<Text style={MenuStyles.menuItemLabel}>Stats</Text>
			      	  </View>
			      	</TouchableHighlight>

			      	<TouchableHighlight activeOpacity={COLOR_FADE_OPACITY} underlayColor={getRandomFadeColor()} onPress={() => this.settingsPressed()}>
						  	<View style={MenuStyles.item}>
					      	<Text style={MenuStyles.menuItemLabel}>Settings</Text>
					      </View>
			      	</TouchableHighlight>

			      	<TouchableHighlight activeOpacity={COLOR_FADE_OPACITY} underlayColor={getRandomFadeColor()} onPress={() => this.menuItemPressed(ABOUT)}>
					      <View style={MenuStyles.item}>
					      	<Text style={MenuStyles.menuItemLabel}>About</Text>
					      </View>
			      	</TouchableHighlight>

			      	<TouchableHighlight activeOpacity={COLOR_FADE_OPACITY} underlayColor={getRandomFadeColor()} onPress={() => this.signOutPressed()}>
					      <View style={MenuStyles.item}>
					      	<Text style={MenuStyles.menuItemLabel}>RESET DATA</Text>
					      </View>
			      	</TouchableHighlight>
			      </View>
		  	  </ScrollView>

			  </View>

			  {this.props.currentPopup && 
			  	<BlurView 
			      style={AppStyles.blurBackground}
			      blurType={BLUR_BACKGROUND_TYPE}
		        blurAmount={BLUR_BACKGROUND_AMOUNT}
		        reducedTransparencyFallbackColor={BLUR_BACKGROUND_FALLBACK_COLOR}
			    />
			  }
		  </>
	  ); 
  }

}

function mapStateToProps(state){
  return {
    signedIn: state.user.signedIn,
    currentPopup: state.overlay.currentPopup
  };
}

const mapDispatchToProps = {
  showOverlay,
  setUserId,
  setUserSignedIn,
  setUserProfileImage
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
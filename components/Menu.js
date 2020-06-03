import React, {Component} from 'react';
import {View, Text, TouchableHighlight, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {showOverlay} from '../redux/actions/OverlayActions';
import MenuStyles from '../styles/MenuStyles';
import {COLOR_FADE_OPACITY, ABOUT, SIGN_UP, getRandomFadeColor} from '../constants/AppConstants';
import MenuHeader from './MenuHeader';

class Menu extends Component{
  /*state = {

  };*/

  openSettings=()=>{}

  menuItemPressed = (overlay) => {
  	this.props.navigation.closeDrawer();
  	this.props.showOverlay(overlay);
  }

  render(){
	return (
	  <View style={MenuStyles.container}>
		<ScrollView stickyHeaderIndices={[0]}>
		  <MenuHeader navigation={this.props.navigation}/>

	  	  <View style={MenuStyles.menuItems}>
		    <TouchableHighlight activeOpacity={COLOR_FADE_OPACITY} underlayColor={getRandomFadeColor()} onPress={() => this.openSettings()}>
		  	  <View style={[MenuStyles.item, MenuStyles.topMenuItem]}>
	      		<Text style={MenuStyles.menuItemLabel}>Analytics</Text>
	      	  </View>
	      	</TouchableHighlight>

	      	<TouchableHighlight activeOpacity={COLOR_FADE_OPACITY} underlayColor={getRandomFadeColor()} onPress={() => this.openSettings()}>
			  <View style={MenuStyles.item}>
		      	<Text style={MenuStyles.menuItemLabel}>Settings</Text>
		      </View>
	      	</TouchableHighlight>

	      	<TouchableHighlight activeOpacity={COLOR_FADE_OPACITY} underlayColor={getRandomFadeColor()} onPress={() => this.menuItemPressed(SIGN_UP)}>
		      <View style={MenuStyles.item}>
		      	<Text style={MenuStyles.menuItemLabel}>Sign Up</Text>
		      </View>
	      	</TouchableHighlight>

	      	<TouchableHighlight activeOpacity={COLOR_FADE_OPACITY} underlayColor={getRandomFadeColor()} onPress={() => this.menuItemPressed(ABOUT)}>
		      <View style={MenuStyles.item}>
		      	<Text style={MenuStyles.menuItemLabel}>About</Text>
		      </View>
	      	</TouchableHighlight>
	      </View>

  	    </ScrollView>
	  </View>
    ); 
  }
}

const mapDispatchToProps = {
  showOverlay
}

export default connect(null, mapDispatchToProps)(Menu);
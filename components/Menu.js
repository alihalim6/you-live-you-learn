import React, {Component} from 'react';
import {View, Text, TouchableHighlight, ImageBackground, ScrollView} from 'react-native';
import {randomColor} from 'randomcolor';
import MenuStyles from '../styles/MenuStyles';
import {COLOR_FADE_OPACITY} from '../constants/AppConstants';

export default class Menu extends Component{
	/*state = {

	};*/

	getRandomColor = () => {
		return randomColor({
			format: 'rgba',
			alpha: COLOR_FADE_OPACITY
		});
	}

	openSettings = () => {
		this.props.navigation.closeDrawer();
		//alert('Settings');
	}

	openAbout = () => {
		//alert('About');
	}

	render(){
		const hasProfileImage = true;/////////

		return (
		  <View style={MenuStyles.container}>
		  	<ScrollView stickyHeaderIndices={[0]}>
			  	<View style={MenuStyles.header}>
				  	{hasProfileImage && <ImageBackground source={{uri: 'https://i.picsum.photos/id/1049/200/300.jpg'}} style={MenuStyles.profileImageContainer}/>}
			  		
			  		<Text style={MenuStyles.userName}>username1</Text>

			  		<View style={MenuStyles.followContainer}>
				  		<Text style={[MenuStyles.followLabel, MenuStyles.following]}>2 Following</Text><Text style={[MenuStyles.followLabel, MenuStyles.followers]}>13 Followers</Text>
				  	</View>
			  	</View>

			  	<View style={MenuStyles.menuItems}>
				  	<TouchableHighlight activeOpacity={COLOR_FADE_OPACITY} underlayColor={this.getRandomColor()} onPress={() => this.openSettings()}>
					  	<View style={[MenuStyles.item, MenuStyles.topMenuItem]}>
				      		<Text style={MenuStyles.menuItemLabel}>Analytics</Text>
				      	</View>
			      	</TouchableHighlight>

			      	<TouchableHighlight activeOpacity={COLOR_FADE_OPACITY} underlayColor={this.getRandomColor()} onPress={() => this.openAbout()}>
				      	<View style={MenuStyles.item}>
				      		<Text style={MenuStyles.menuItemLabel}>Menu Item</Text>
				      	</View>
			      	</TouchableHighlight>

			      	<TouchableHighlight activeOpacity={COLOR_FADE_OPACITY} underlayColor={this.getRandomColor()} onPress={() => this.openSettings()}>
					  	<View style={MenuStyles.item}>
				      		<Text style={MenuStyles.menuItemLabel}>Settings</Text>
				      	</View>
			      	</TouchableHighlight>

			      	<TouchableHighlight activeOpacity={COLOR_FADE_OPACITY} underlayColor={this.getRandomColor()} onPress={() => this.openAbout()}>
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
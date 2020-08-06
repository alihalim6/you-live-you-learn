import React from 'react';
import {View, TouchableOpacity, TextInput} from 'react-native';
import {BASE_COLOR_DARK, BASE_COLOR_LIGHT, COLOR_FADE_OPACITY} from '../constants/AppConstants';
import HeaderStyles from '../styles/HeaderStyles';

export default function Home({navigation}){
	const hambugerMenu = Array(3).fill().map((line, index) => {
	  return <View key={index} style={HeaderStyles.hamburgerMenuLine}></View>;
	});

	return (
	  <View style={HeaderStyles.container}>
			<TouchableOpacity style={HeaderStyles.hamburgerMenuButton} onPress={() => this.openMenu(navigation)}>
			  <View>{hambugerMenu}</View>
			</TouchableOpacity>

			<View style={HeaderStyles.searchBar}>
			  <TextInput placeholder="Search"/>
			</View>
	  </View>
	);
}

openMenu = (navigation) => {
	navigation.openDrawer();
}
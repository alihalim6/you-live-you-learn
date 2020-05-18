import React, {Component} from 'react';
import {View, TouchableOpacity, TextInput} from 'react-native';
import {randomColor} from 'randomcolor';
import {BASE_COLOR_DARK, BASE_COLOR_LIGHT, COLOR_FADE_OPACITY} from '../constants/AppConstants';
import HeaderStyles from '../styles/HeaderStyles';

export default class Learning extends Component{
	state = {
		hamburgerMenuColors: Array(3).fill(BASE_COLOR_DARK)
	};

	openMenu = () => {
		//color the hamburger menu button
		const hamburgerMenuColors = randomColor({count: 3});
		this.setState({hamburgerMenuColors});

		this.props.navigation.openDrawer();
	}

	colorSearchBar = () => {
		const searchBarColor = randomColor({
			format: 'rgba',
			luminosity: 'light',
			alpha: COLOR_FADE_OPACITY
		});

		this.setState({searchBarColor});
	}

	searchBarBlurred = () => {
		this.setState({searchBarColor: BASE_COLOR_LIGHT});
	}

	render(){
		const colors = this.state.hamburgerMenuColors;

		const hambugerMenu = colors.map((color, index) => {
			return <View key={index} style={[HeaderStyles.hamburgerMenuLine, {backgroundColor: colors[index]}]}></View>;
		});

		return (
			<View style={HeaderStyles.container}>
				<TouchableOpacity style={HeaderStyles.hamburgerMenuButton} onPress={() => this.openMenu()}>
					<View>{hambugerMenu}</View>
				</TouchableOpacity>

				<View style={[HeaderStyles.searchBar, {backgroundColor: this.state.searchBarColor}]}>
					<TextInput placeholder="Search" onFocus={() => this.colorSearchBar()} onBlur={() => this.searchBarBlurred()}/>
				</View>
			</View>
		);
	}
}
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, TouchableOpacity, TextInput} from 'react-native';
import {BASE_COLOR_DARK, BASE_COLOR_LIGHT, COLOR_FADE_OPACITY, getCurrentPage, isTest} from '../constants/AppConstants';
import HeaderStyles from '../styles/HeaderStyles';
import {HAMBURGER_MENU_TOGGLE} from '../constants/HomeConstants';
import Banner from '../components/Banner';

class Home extends Component{
	state = {
		test: false
	};

	async componentDidMount(){
		const test = await isTest();
		this.setState({test});
	}

	openMenu = () => {
		this.props.navigation.openDrawer();
	}

	render(){
		const hambugerMenu = Array(3).fill().map((line, index) => {
	  	return <View key={index} style={HeaderStyles.hamburgerMenuLine}></View>;
		});

		return (
			<>
	      {this.state.test && this.props.currentBanner &&
	        <Banner/>
	      }

			  <View style={HeaderStyles.container}>
					<TouchableOpacity 
						accessible={true}
						accessibilityLabel={HAMBURGER_MENU_TOGGLE}
						style={HeaderStyles.hamburgerMenuButton} onPress={() => this.openMenu(this.props.navigation)}>
					  <View>{hambugerMenu}</View>
					</TouchableOpacity>

					<View style={HeaderStyles.searchBar}>
					  <TextInput style={HeaderStyles.search} placeholder="Search"/>
					</View>
			  </View>
			</>
		);
	}
}

function mapStateToProps(state){
  return {
    currentBanner: state.banner.currentBanner
  };
}

export default connect(mapStateToProps)(Home);

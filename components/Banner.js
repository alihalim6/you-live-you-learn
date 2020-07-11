import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Text, Animated} from 'react-native';
import {showBanner} from '../redux/actions/BannerActions';
import BannerStyles from '../styles/BannerStyles';
import {
	BANNER_HEIGHT, 
	BANNER_INITIAL_TOP, 
	ANIMATION_DURATION, 
	ANIMATION_FUNCTION,
	ANIMATION_FRAME_LENGTH,
	ANIMATION_INPUT,
	ANIMATION_OUTPUT
} from '../constants/BannerConstants';

class Banner extends Component{
	state = {
		bannerTop: new Animated.Value(0)
	};

	revealBanner = () => {
		Animated.timing(this.state.bannerTop, {
			toValue: ANIMATION_FRAME_LENGTH,
			duration: ANIMATION_DURATION,
			easing: ANIMATION_FUNCTION,
			useNativeDriver: false
		}).start(({finished}) => {
			if(finished){
				this.props.showBanner(null);
			}
			else{
				this.revealBanner();
			}
		});
	}

	interpolateAnimTop = () => {
  	return this.state.bannerTop.interpolate({
		  inputRange: ANIMATION_INPUT,
		  outputRange: ANIMATION_OUTPUT
		});
  }

	render(){
		if(this.props.currentBanner.message){
			this.revealBanner();
		}

		return (
			<Animated.View style={[
				BannerStyles.container, 
				{backgroundColor: this.props.currentBanner.color},
				{transform: [{translateY: this.interpolateAnimTop()}]}
			]}>
				<Text style={BannerStyles.text}>{this.props.currentBanner.message}</Text>
			</Animated.View>
		);
	}
}

function mapStateToProps(state){
  return {
    currentBanner: state.banner.currentBanner
  };
}

const mapDispatchToProps = {
	showBanner
}

export default connect(mapStateToProps, mapDispatchToProps)(Banner);
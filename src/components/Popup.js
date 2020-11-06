import React, {Component} from 'react';
import {FlatList, View, TouchableOpacity, Text} from 'react-native';
import {connect} from 'react-redux';
import {PopupStyles, setBorder} from '../styles/PopupStyles';
import AppStyles from '../styles/AppStyles';
import {PageStyles, closeButtonOneStyle, closeButtonTwoStyle} from '../styles/PageStyles';
import {closeOverlay} from '../redux/actions/OverlayActions';
import {showCamera} from '../redux/actions/CameraActions';
import {getCurrentPopup} from '../constants/AppConstants';

class Popup extends Component{
  popupItemPressed = (item) => {  	
  	if(item.usesCamera){
  		//TODO: SHOW INFO IF PERMISSION BLOCKS CAMERA
  		this.props.showCamera(item.cameraType, item.mediaCallback);
  	}
  	else{
  		//this.props.closeOverlay();
  		item.handlerFn();
  	}
  }

	render(){
		const popup = this.props.currentPopup;
		let containerStyles = null;
		let itemContainerStyles = null;
		let closeButtonStyles = null;

		if(popup){
			const defaultPositioning = (popup && popup.defaultPositioning);
			containerStyles = popup.containerStyles;
			itemContainerStyles = popup.itemContainerStyles;

			if(defaultPositioning){
				containerStyles = popup.defaultContainerStyles;
				itemContainerStyles = {};//use styles in PopupStyles
			}
		}

		return (
			<>
				{popup &&
					<View style={[PopupStyles.container, containerStyles]}>
						<View style={[PopupStyles.itemContainer, itemContainerStyles]}>
							<FlatList 
								data={popup.options}
								ListHeaderComponent={() => {
									return (
										<TouchableOpacity 
											onPress={() => this.props.closeOverlay()} 
											style={[PopupStyles.touchableClose]}>
												<View style={[closeButtonOneStyle, PopupStyles.closeButton]}></View>
							        	<View style={[closeButtonTwoStyle, PopupStyles.closeButton]}></View>
										</TouchableOpacity>
									);
								}}
							  renderItem={({item}) => {
							  	return (
							  		<>						  		
								  		<TouchableOpacity style={PopupStyles.item} onPress={() => this.popupItemPressed(item)} accessible={true} accessibilityLabel={item.a11yLabel}>
								  			<Text style={[PopupStyles.label, item.labelStyles]}>{item.label}</Text>
								  		</TouchableOpacity>

						  				<View style={setBorder(item)}></View>
						  			</>
							  	);
							  }}
							  keyExtractor={item => item.id}
							/>
						</View>
					</View>
				}
			</>
		);
	}

}

function mapStateToProps(state){
  return {
    currentPopup: getCurrentPopup()
  };
}

const mapDispatchToProps = {
  closeOverlay,
  showCamera
};

export default connect(mapStateToProps, mapDispatchToProps)(Popup);
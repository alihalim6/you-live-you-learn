import React, {Component} from 'react';
import {FlatList, View, TouchableOpacity, Text} from 'react-native';
import {connect} from 'react-redux';
import {PopupStyles, setBorder} from '../styles/PopupStyles';
import AppStyles from '../styles/AppStyles';
import {OverlayStyles, closeButtonOneStyle, closeButtonTwoStyle} from '../styles/OverlayStyles';
import {hidePopup} from '../redux/actions/OverlayActions';
import {showCamera} from '../redux/actions/CameraActions';

class Popup extends Component{
	closePopup = () => {
  	this.props.hidePopup();
  }

  popupItemPressed = (item) => {
  	if(item.usesCamera){
  		//TODO: SHOW INFO IF PERMISSION BLOCKS CAMERA
  		this.props.showCamera(item.cameraType, item.pictureCallback);
  	}
  	else{
  		item.handlerFn();
  		this.closePopup();
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
			closeButtonStyles = popup.closeButtonStyles;

			if(defaultPositioning){
				containerStyles = popup.defaultContainerStyles;
				itemContainerStyles = {};//use styles in PopupStyles
				closeButtonStyles = popup.defaultCloseButtonStyles;
			}
		}

		return (
			<>
				{popup &&
					<View style={[PopupStyles.container, containerStyles]}>
						<View style={[PopupStyles.itemContainer, itemContainerStyles]}>
							<FlatList 
								data={popup.options}
							  renderItem={({item}) => {
							  	return (
							  		<>
								  		<TouchableOpacity onPress={() => this.popupItemPressed(item)} accessible={true} accessibilityLabel={item.a11yLabel}>
								  			<View style={PopupStyles.item}>
								  				<Text style={[PopupStyles.label, item.labelStyles]}>{item.label}</Text>
								  			</View>
							  			</TouchableOpacity>

						  				<View style={setBorder(item)}></View>
						  			</>
							  	);
							  }}
							  keyExtractor={item => item.id}
							/>
						</View>

						<TouchableOpacity 
							onPress={() => this.closePopup()} 
							style={[PopupStyles.touchableClose, PopupStyles.closeButtonContainer, closeButtonStyles]}>
								<View style={[closeButtonOneStyle, PopupStyles.closeButton]}></View>
			        	<View style={[closeButtonTwoStyle, PopupStyles.closeButton]}></View>
						</TouchableOpacity>
					</View>
				}
			</>
		);
	}

}

function mapStateToProps(state){
  return {
    currentPopup: state.overlay.currentPopup
  };
}

const mapDispatchToProps = {
  hidePopup,
  showCamera
}

export default connect(mapStateToProps, mapDispatchToProps)(Popup);
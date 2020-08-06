import React, {Component} from 'react';
import {SafeAreaView, FlatList, ListHeaderComponent} from 'react-native';
import {BlurView} from "@react-native-community/blur";
import {connect} from 'react-redux';
import HomeStyles from '../styles/HomeStyles';
import AppStyles from '../styles/AppStyles';
import Header from './Header';
import Learning from './Learning';
import Overlay from './Overlay';
import Popup from './Popup';
import {BLUR_BACKGROUND_TYPE, BLUR_BACKGROUND_AMOUNT, BLUR_BACKGROUND_FALLBACK_COLOR} from '../constants/AppConstants';

class Home extends Component{
  componentDidUpdate(){
    //disable menu toggle when popup showing
    this.props.navigation.setOptions({
      swipeEnabled: !this.props.currentPopup,
      gestureEnabled: !this.props.currentPopup
    });
  }

  render(){
  	const test = [
  	{
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba'
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72'
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-31d53abb24ba'
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd92aa97f63'
  },
  {
    id: '58694a0f-3da1-471f-bd96-1r5571e29d72'
  }
  ];

    return (
		  <SafeAreaView style={HomeStyles.container}>
		    <FlatList
				  data={test}
				  ListHeaderComponent={() => <Header {...this.props}/>}
				  stickyHeaderIndices={[0]}
				  renderItem={({item}) => (<Learning id={item.id}/>)}
				  keyExtractor={item => item.id}
		    />

		    {(this.props.currentOverlay || this.props.currentPopup) &&
		      <>
		        <BlurView 
			        style={AppStyles.blurBackground}
	            blurType={BLUR_BACKGROUND_TYPE}
	            blurAmount={BLUR_BACKGROUND_AMOUNT}
	            reducedTransparencyFallbackColor={BLUR_BACKGROUND_FALLBACK_COLOR}
	          />
	        </>
	    	}
		  </SafeAreaView>
    );
  }
}

function mapStateToProps(state){
  return {
    currentOverlay: state.overlay.currentOverlay,
    currentPopup: state.overlay.currentPopup
  };
}

export default connect(mapStateToProps)(Home);
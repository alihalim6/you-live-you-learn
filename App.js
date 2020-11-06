import React, {Component} from 'react';
import {StatusBar, BackHandler} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import {connect} from 'react-redux';
import {hideOverlay, hidePopup} from './src/redux/actions/OverlayActions';
import {hideCamera} from './src/redux/actions/CameraActions';
import {MenuStyles} from './src/styles/MenuStyles';
import Home from './src/components/Home';
import Menu from './src/components/Menu';
import Page from './src/components/Page';
import Popup from './src/components/Popup';
import Camera from './src/components/Camera';
import Banner from './src/components/Banner';
import {BASE_COLOR_LIGHT, getCurrentPage, getCurrentPopup} from './src/constants/AppConstants';
import {initializeUser} from './src/services/UserService';
import AppStyles from './src/styles/AppStyles';
import {BLUR_BACKGROUND_TYPE, BLUR_BACKGROUND_AMOUNT, BLUR_BACKGROUND_FALLBACK_COLOR} from './src/constants/AppConstants';

class App extends Component { 
  backAction = () => {
    //TODO:HAVE TO TAP ANDROID BACK BUTTON TWICE TO HIDE THESE
    //GET ERROR ON BACK ON TAP ON POST CONFIG OVERLAY
    this.props.hideOverlay();
    this.props.hidePopup();
    this.props.hideCamera();

    return true;
  }

  componentDidMount() {
    initializeUser()
      .then(() => {
        SplashScreen.hide();
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.backAction);
      });
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  render() {
    const Drawer = createDrawerNavigator();
    
    return (
      <>
        <StatusBar barStyle="dark-content" backgroundColor={BASE_COLOR_LIGHT}/>

        <NavigationContainer>
          <Drawer.Navigator 
            initialRouteName="Home" 
            drawerType="front" 
            drawerContent={props => <Menu {...props}/>}>
            <Drawer.Screen name=" " component={Home}/>
          </Drawer.Navigator>
        </NavigationContainer>

        {this.props.currentPage &&
          <>
            <BlurView 
              style={AppStyles.blurBackground}
              blurType={BLUR_BACKGROUND_TYPE}
              blurAmount={BLUR_BACKGROUND_AMOUNT}
              reducedTransparencyFallbackColor={BLUR_BACKGROUND_FALLBACK_COLOR}
            />
          </>
        }

        {this.props.currentPage && !this.props.currentPopup &&
          <Page page={this.props.currentPage}/>
        }

        {this.props.currentPopup &&
          <Popup popup={this.props.currentPopup}/>
        }

        {this.props.currentCamera &&
          <Camera/>
        }

        {this.props.currentBanner &&
          <Banner/>
        }
      </>
    );
  }
}

function mapStateToProps(state){
  return {
    currentPage: getCurrentPage(),
    currentPopup: getCurrentPopup(),
    currentCamera: state.camera.currentCamera,
    currentBanner: state.banner.currentBanner
  };
}

const mapDispatchToProps = {
  hideOverlay,
  hidePopup,
  hideCamera
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
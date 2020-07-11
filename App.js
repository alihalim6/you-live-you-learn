import React, {Component} from 'react';
import {StatusBar, BackHandler} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import {connect} from 'react-redux';
import {hideOverlay} from './redux/actions/OverlayActions';
import {hideCamera} from './redux/actions/CameraActions';
import {MenuStyles} from './styles/MenuStyles';
import Home from './components/Home';
import Menu from './components/Menu';
import Popup from './components/Popup';
import Camera from './components/Camera';
import Banner from './components/Banner';
import {BASE_COLOR_LIGHT} from './constants/AppConstants';
import {initializeUser} from './services/UserService';

class App extends Component { 
  backAction = () => {
    //TODO:HAVE TO TAP ANDROID BACK BUTTON TWICE TO HIDE THESE
    this.props.hideOverlay();
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
              drawerType="slide" 
              drawerContentOptions={MenuStyles.drawerOptions}
              drawerContent={props => <Menu {...props}/>}>
              <Drawer.Screen name=" " component={Home}/>
            </Drawer.Navigator>
          </NavigationContainer>

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
    currentPopup: state.overlay.currentPopup,
    currentCamera: state.camera.currentCamera,
    currentBanner: state.banner.currentBanner
  };
}

const mapDispatchToProps = {
  hideOverlay,
  hideCamera
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
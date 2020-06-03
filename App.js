import React, {Component} from 'react';
import {StatusBar} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import MenuStyles from './styles/MenuStyles';
import Home from './components/Home';
import Menu from './components/Menu';
import {BASE_COLOR_LIGHT} from './constants/AppConstants';

export default class App extends Component {  
  componentDidMount() {
    SplashScreen.hide();
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
        </>
    );
  }
}
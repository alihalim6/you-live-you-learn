import React, {Component} from 'react';
import {
  SafeAreaView, 
  FlatList, 
  ListHeaderComponent, 
  View, 
  Text,
  Image,
  useWindowDimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {connect} from 'react-redux';
import HomeStyles from '../styles/HomeStyles';
import AppStyles from '../styles/AppStyles';
import Header from './Header';
import Learning from './Learning';
import {
  BLUR_BACKGROUND_TYPE, 
  BLUR_BACKGROUND_AMOUNT, 
  BLUR_BACKGROUND_FALLBACK_COLOR,
  BASE_COLOR_DARK,
  BASE_GRAY,
  getCurrentPopup
} from '../constants/AppConstants';
import {USER_CONTENT_LABEL, FOLLOWING_CONTENT_LABEL, NEWS_CONTENT_LABEL, TAB_BAR_BACK_BEHAVIOR, NUMBER_OF_CONTENT_TABS} from '../constants/HomeConstants';
import UserFeed from './UserFeed';
import FollowingFeed from './FollowingFeed';
import NewsFeed from './NewsFeed';

class Home extends Component {
  componentDidUpdate(){
    //disable menu toggle when popup showing
    this.props.navigation.setOptions({
      swipeEnabled: !this.props.currentPopup,
      gestureEnabled: !this.props.currentPopup
    });
  }

  render(){
    const Tab = createMaterialTopTabNavigator();
    
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
        <Header {...this.props}/>

        <Tab.Navigator
          initialRouteName={USER_CONTENT_LABEL}
          backBehavior={TAB_BAR_BACK_BEHAVIOR}
          tabBarOptions={{
            activeTintColor: BASE_COLOR_DARK,
            inactiveTintColor: BASE_GRAY,
            style: HomeStyles.tabBar,
            indicatorStyle: HomeStyles.tabBarIndicator,
            showIcon: true,
            showLabel: false
          }}
        >
          <Tab.Screen
            name={USER_CONTENT_LABEL}
            component={UserFeed}
            options={{
              tabBarIcon: ({focused}) => {
                return (focused ? 
                  (<Image style={HomeStyles.userTabBarIcon} source={require('../assets/brain.png')}/>) : 
                  (<Text style={HomeStyles.tabBarLabel}>{USER_CONTENT_LABEL}</Text>)
                );
              }
            }}
          />

          <Tab.Screen
            name={FOLLOWING_CONTENT_LABEL}
            component={FollowingFeed}
            options={{
              tabBarIcon: ({focused}) => {
                return (focused ? 
                   (<Image style={HomeStyles.followingTabBarIcon} source={require('../assets/following_brain.png')}/>) : 
                   (<Text style={HomeStyles.tabBarLabel}>{FOLLOWING_CONTENT_LABEL}</Text>)
                );
              }
            }}
          />

          <Tab.Screen
            name={NEWS_CONTENT_LABEL}
            component={NewsFeed}
            options={{
              tabBarIcon: ({focused}) => {
                return (focused ? 
                  (<Image style={HomeStyles.newsTabBarIcon} source={require('../assets/news.png')}/>) : 
                  (<Text style={HomeStyles.tabBarLabel}>{NEWS_CONTENT_LABEL}</Text>)
                );
              }
            }}
          />
        </Tab.Navigator>

        {this.props.currentPopup &&
          <View style={AppStyles.overlay}></View>
        }
      </SafeAreaView>
    );
  }
}

function mapStateToProps(state){
  return {
    currentPopup: getCurrentPopup()
  };
}

export default connect(mapStateToProps)(Home);
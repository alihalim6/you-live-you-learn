import React, {Component} from 'react';
import {
  View, 
  Text,
  Image
} from 'react-native';
import {connect} from 'react-redux';
import FeedStyles from '../styles/FeedStyles';
import {} from '../constants/HomeConstants';

class FollowingFeed extends Component{
  render(){
    return (
      <View style={FeedStyles.emptyFeed}>
        <Text style={FeedStyles.emptyFeedMessage}>Aliquam viverra, ipsum sit amet rutrum faucibus, orci nunc commodo auguem.</Text>
      </View>
    );
  }        
}

export default FollowingFeed;
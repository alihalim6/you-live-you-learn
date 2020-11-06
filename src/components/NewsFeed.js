import React, {Component} from 'react';
import {
  View, 
  Text,
  Image
} from 'react-native';
import {connect} from 'react-redux';
import FeedStyles from '../styles/FeedStyles';
import {} from '../constants/HomeConstants';

class NewsFeed extends Component{
  render(){
    return (
      <View style={FeedStyles.emptyFeed}>
        <Text style={FeedStyles.emptyFeedMessage}>Sed nec semper mi, vel blandit nisi. Morbi sed neque diam. Quisque hendrerit, dolor at.</Text>
      </View>
    );
  }        
}

export default NewsFeed;
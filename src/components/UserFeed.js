import React, {Component} from 'react';
import {
  View, 
  Text,
  Image,
  TouchableOpacity
} from 'react-native';
import {showOverlay} from '../redux/actions/OverlayActions';
import {connect} from 'react-redux';
import FeedStyles from '../styles/FeedStyles';
import {NEW_POST, PAGE} from '../constants/AppConstants';

class UserFeed extends Component{
  plusButtonPressed = () => {
    this.props.showOverlay({
      name: NEW_POST,
      styles: FeedStyles.userFeedPage,
      type: PAGE
    });
  }

  render(){
    return (
      <>
        <View style={FeedStyles.emptyFeed}>
          <Text style={FeedStyles.emptyFeedMessage}>Donec a nisl vitae tellus maximus rhoncus eu id erat. Vestibulum id risus purus. Nullam ut nibh.</Text>
        </View>

        <TouchableOpacity style={FeedStyles.plusButton} onPress={() => this.plusButtonPressed()}>
          <View style={FeedStyles.plusSignLine}></View>
          <View style={[FeedStyles.plusSignLine, FeedStyles.plusSignVerticalLine]}></View>
        </TouchableOpacity>
      </>
    );
  }        
}

const mapDispatchToProps = {
  showOverlay
};

export default connect(null, mapDispatchToProps)(UserFeed);
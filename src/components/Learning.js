import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import LearningStyles from '../styles/LearningStyles';
import {SIGN_UP} from '../constants/AppConstants';

class Learning extends Component{
  render(){
    return (
    <View style={LearningStyles.item}>
      <Text style={LearningStyles.label}>Fact</Text>
    </View>
    );
  }
}

const mapDispatchToProps = {
  
};

export default connect(null, mapDispatchToProps)(Learning);
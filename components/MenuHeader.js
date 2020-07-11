import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import {MenuStyles, headerHeight} from '../styles/MenuStyles';
import ProfileImage from './ProfileImage';

class MenuHeader extends Component{	
  render(){
  	return (
      <View style={[MenuStyles.header, {height: headerHeight(this.props.signedIn)}]}>
	  	{this.props.signedIn &&
	  	  <>
	  	    <ProfileImage/>
  		    <Text style={MenuStyles.username}>{this.props.username}</Text>

  		    <View style={MenuStyles.followContainer}>
	  	      <Text style={[MenuStyles.followLabel, MenuStyles.following]}>2 Following</Text>
	  	      <Text style={[MenuStyles.followLabel, MenuStyles.followers]}>13 Followers</Text>
	  	    </View>
	  	  </>
  		}

  		{!this.props.signedIn &&
	      <View style={MenuStyles.liveLearnContainer}>
	        <Text style={MenuStyles.live}>LIVE</Text>
          
          <View style={MenuStyles.profileImage}>
	         <ProfileImage/>
          </View>
	        
          <Text style={MenuStyles.learn}>LEARN</Text>
	      </View>
  		}
  	  </View>
  	);
  }
}

function mapStateToProps(state){
  return {
  	username: state.user.username,
  	signedIn: state.user.signedIn
  };
}

export default connect(mapStateToProps)(MenuHeader);
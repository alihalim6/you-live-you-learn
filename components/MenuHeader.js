import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import MenuStyles from '../styles/MenuStyles';
import ProfileImage from './ProfileImage';

class MenuHeader extends Component{
  render(){
  	const isSignedIn = false;/////////
  	//can use Followers/Following label from useer profile

  	return (
      <View style={MenuStyles.header}>
	  	{isSignedIn &&
	  	  <>
	  	    <ProfileImage isSignedIn={true}/>
  		    <Text style={MenuStyles.userName}>username1</Text>

  		    <View style={MenuStyles.followContainer}>
	  	      <Text style={[MenuStyles.followLabel, MenuStyles.following]}>2 Following</Text><Text style={[MenuStyles.followLabel, MenuStyles.followers]}>13 Followers</Text>
	  	    </View>
	  	  </>
  		}

  		{!isSignedIn &&
	      <View style={MenuStyles.liveLearnContainer}>
	        <Text style={MenuStyles.live}>LIVE</Text>
	        <ProfileImage isSignedIn={false}/>
	        <Text style={MenuStyles.learn}>LEARN</Text>
	      </View>
  		}
  	  </View>
  	);
  }
}

function mapStateToProps(state){
  return {
    userProfileImage: state.user.profileImage
  };
}

export default connect(mapStateToProps)(MenuHeader);
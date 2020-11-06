import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import {MenuStyles, headerHeight} from '../styles/MenuStyles';
import ProfileImage from './ProfileImage';
import {MENU_USERNAME_A11Y_LABEL, MENU_FOLLOW_A11Y_LABEL, MENU_FOLLOWING_A11Y_LABEL, MENU_FOLLOWERS_A11Y_LABEL} from '../constants/AppConstants';

class MenuHeader extends Component{
  render(){
  	return (
      <View style={[MenuStyles.header, {height: headerHeight(this.props.signedIn)}]}>
	  	{this.props.signedIn &&
	  	  <>
	  	    <ProfileImage defaultPositioning={false}/>
  		    <Text style={MenuStyles.username} accessible={true} accessibilityLabel={MENU_USERNAME_A11Y_LABEL}>{this.props.username}</Text>

  		    <View style={MenuStyles.followContainer} accessible={true} accessibilityLabel={MENU_FOLLOW_A11Y_LABEL}>
	  	      <Text 
              style={[MenuStyles.followLabel, MenuStyles.following]} 
              accessible={true} 
              accessibilityLabel={MENU_FOLLOWING_A11Y_LABEL}>
                2 Following
            </Text>

	  	      <Text 
              style={[MenuStyles.followLabel, MenuStyles.followers]}
              accessible={true} 
              accessibilityLabel={MENU_FOLLOWERS_A11Y_LABEL}>
                13 Followers
            </Text>
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
import React from 'react';
import {View, ImageBackground, Image, TextInput, Text} from 'react-native';
import ProfileImageStyles from '../styles/ProfileImageStyles';

export default function ProfileImage({isSignedIn, cameraOnly}){
  const hasProfileImage = false;/////////
  const noSignUpStyles = isSignedIn ? {} : ProfileImageStyles.noSignUpImageContainer;

  const noProfileImageContents = (
    <>
	  {!cameraOnly && <Text style={ProfileImageStyles.you}>YOU</Text>}
  	  <Image style={ProfileImageStyles.camera} source={require('../assets/camera.png')}/>
  	</>
  );

  return (
    <>
      {hasProfileImage && 
        <ImageBackground style={[ProfileImageStyles.profileImageContainer, noSignUpStyles]} source={{uri: 'https://i.picsum.photos/id/1049/200/300.jpg'}}/>
      }

     {!hasProfileImage &&
        <View style={[ProfileImageStyles.profileImageContainer, noSignUpStyles]}>
          {noProfileImageContents}
        </View>
      }
    </>
  );
}
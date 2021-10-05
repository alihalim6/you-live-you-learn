import React from 'react';
import {View, Text, Image} from 'react-native';
import {version} from '../../package.json';
import PageStyles from '../styles/PageStyles';
import AboutStyles from '../styles/AboutStyles';

export default function About(){
  return (
    <>
      <Text style={PageStyles.title}>ABOUT</Text>
    	<View style={AboutStyles.container}>
    	  <Text style={AboutStyles.appName}>You Live You Learn</Text>
        <Text style={AboutStyles.author}>by Ali Halim</Text>
    	  <Text style={AboutStyles.version}>Version {version}</Text>
    	  <Text style={AboutStyles.rateReview}>Sed ut perspiciatis unde omnis iste natus error sit laudantium, totam rem, eaque ipsa illo inventore.</Text>
    	  <Text style={AboutStyles.dedication}>For Maya</Text>
    	</View>
    </>
  );
}
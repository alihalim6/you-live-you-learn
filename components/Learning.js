import React from 'react';
import {View, Text} from 'react-native';
import LearningStyles from '../styles/LearningStyles';

export default function Learning({id}){
	return (
		<View style={LearningStyles.item}>
			<Text style={LearningStyles.label}>Fact</Text>
		</View>
	);
}
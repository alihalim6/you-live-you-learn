import React from 'react';
import {SafeAreaView, FlatList, ListHeaderComponent} from 'react-native';
import HomeStyles from '../styles/HomeStyles';
import Header from './Header';
import Learning from './Learning';

export default function Home(props){
	const test = [
	  {
	    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba'
	  },
	  {
	    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63'
	  },
	  {
	    id: '58694a0f-3da1-471f-bd96-145571e29d72'
	  },
	  {
	    id: 'bd7acbea-c1b1-46c2-aed5-31d53abb24ba'
	  },
	  {
	    id: '3ac68afc-c605-48d3-a4f8-fbd92aa97f63'
	  },
	  {
	    id: '58694a0f-3da1-471f-bd96-1r5571e29d72'
	  }
	];

	return (
		<SafeAreaView style={HomeStyles.container}>
			<FlatList
				data={test}
				ListHeaderComponent={() => <Header {...props}/>}
				stickyHeaderIndices={[0]}
				renderItem={({item}) => (
		          <Learning id={item.id}/>
		        )}
			/>
		</SafeAreaView>
	);
}
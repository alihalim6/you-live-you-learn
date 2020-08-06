import React from 'react';
import {render as reactNativeTestingLibraryRender} from '@testing-library/react-native';
import {Provider as ReduxProvider} from 'react-redux';
import appStore from '../src/redux';

function render(ui, {initialState, store = appStore, ...renderOptions} = {}){
	  function Wrapper({children}) {
	    return (
	      <ReduxProvider store={appStore}>
	        {children}
	      </ReduxProvider>
	    );
	  }

  return reactNativeTestingLibraryRender(ui, {wrapper: Wrapper, ...renderOptions});
}

//re-export all from @testing-library/react-native
export * from '@testing-library/react-native';
//override render method
export {render};
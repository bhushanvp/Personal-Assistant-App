import React from 'react';
import BottomTabNavigator from './src/navigators/BottomTabNavigator';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import store from './src/redux/store';


function App(): React.JSX.Element {
  return (
    <Provider store={store} >
      <NavigationContainer>
        <BottomTabNavigator />
      </NavigationContainer>
    </Provider>
  );
}

export default App;

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StatusBar, useColorScheme, SafeAreaView} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import Home from './components/Home';
import CreateWorkout from './components/workout/CreateWorkout';

const Stack = createNativeStackNavigator();

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    //
    <NavigationContainer>
      {/* <SafeAreaView style={backgroundStyle}> */}
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Create Workout" component={CreateWorkout} />
      </Stack.Navigator>
      {/* </SafeAreaView> */}
      {/* </SafeAreaView> */}
    </NavigationContainer>
  );
};

export default App;

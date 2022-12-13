import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Button} from '@rneui/themed';
import React, {useCallback} from 'react';
import {StatusBar, useColorScheme, SafeAreaView} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import Home from './components/Home';
import ContinueWorkout from './components/workout/ContinueWorkout';
import CreateWorkout from './components/workout/CreateWorkout';
import StartNewWorkout from './components/workout/StartNewWorkout';
import {
  createWorkoutPlanTable,
  createWorkoutProgramRoutineActivityTable,
  createWorkoutProgramTable,
  createWorkoutRoutineTable,
  createWorkoutScheduleTable,
  getDbConnection,
  getWorkoutRoutine,
} from './datastore/db-service';

const Stack = createNativeStackNavigator();

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const loadDataCallback = useCallback(async () => {
    // Create Tables
    const db = await getDbConnection();
    await createWorkoutPlanTable(db);
    await createWorkoutRoutineTable(db);
    await createWorkoutProgramTable(db);
    await createWorkoutScheduleTable(db);
    await createWorkoutProgramRoutineActivityTable(db);

    const re = await getWorkoutRoutine(db);
    console.log('ROUTINES', re);
  }, []);

  React.useEffect(() => {
    loadDataCallback();
  }, [loadDataCallback]);

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
        <Stack.Screen
          name="Create Workout"
          component={CreateWorkout}
          options={{
            headerRight: () => <Button title="Cancel" />,
            headerLeft: () => <Button title="Save" />,
          }}
        />
        <Stack.Screen name="Start New Workout" component={StartNewWorkout} />
        <Stack.Screen name="Continue Workout" component={ContinueWorkout} />
      </Stack.Navigator>
      {/* </SafeAreaView> */}
      {/* </SafeAreaView> */}
    </NavigationContainer>
  );
};

export default App;

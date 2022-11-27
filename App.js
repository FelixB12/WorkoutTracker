import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Button} from '@rneui/themed';
import React, {useCallback} from 'react';
import {StatusBar, useColorScheme, SafeAreaView} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import Home from './components/Home';
import CreateWorkout from './components/workout/CreateWorkout';
import {
  createWorkoutPlanTable,
  createWorkoutRoutineTable,
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

    // await saveWorkoutPlan(db, mockWorkoutePlan);
    // await saveWorkoutRoutine(db, mockWorkoutRoutine);

    // const routine = await getRoutinesForPlanId(db, 1);

    // console.log('R', routine);
    //const loadedData = await getWorkoutRoutine(db);
    // const routinePlan = await getWorkoutPlan(db);
    // console.log('Loaded Data', loadedData, routinePlan);
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
      </Stack.Navigator>
      {/* </SafeAreaView> */}
      {/* </SafeAreaView> */}
    </NavigationContainer>
  );
};

export default App;

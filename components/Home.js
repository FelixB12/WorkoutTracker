import {Button} from '@rneui/base';
import {Card} from '@rneui/themed';
import React, {useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {getDbConnection, getWorkoutPlan} from '../datastore/db-service';

const Home = ({navigation}) => {
  const [workoutPlans, setWorkoutPlans] = useState([]);
  const [refresh, setRefresh] = useState(0);
  React.useEffect(() => {
    getDbConnection().then(db => {
      getWorkoutPlan(db).then(data => {
        setWorkoutPlans(data);
      });
    });
  }, [refresh]);

  const onPressHandler = () => {
    navigation.navigate('Create Workout', {onSave: onSave});
  };

  const onSave = () => {
    setRefresh(prev => prev + 1);
  };

  return (
    <ScrollView>
      <Card>
        <Card.Title>Your Workout Plans</Card.Title>
        {workoutPlans.map(map => {
          return (
            <View key={map.id}>
              <Text>{map.planName}</Text>
            </View>
          );
        })}
      </Card>
      <Card>
        <Card.Title>Recent Workout</Card.Title>
        <Text>No Recent Workouts</Text>
        <Button onPress={onPressHandler}>Create New Workout</Button>
      </Card>
      <Card>
        <Card.Title>Create New Workout Plan</Card.Title>
      </Card>
    </ScrollView>
  );
};
export default Home;

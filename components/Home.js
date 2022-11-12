import {Button} from '@rneui/base';
import {Card} from '@rneui/themed';
import React from 'react';
import {Text, View} from 'react-native';

const Home = ({navigation}) => {
  React.useEffect(() => {
    console.log('Created Home');
  }, []);

  const onPressHandler = () => {
    navigation.navigate('Create Workout');
  };

  return (
    <View>
      <Card>
        <Card.Title>Recent Workout</Card.Title>
        <Text>No Recent Workouts</Text>
        <Button onPress={onPressHandler}>Create New Workout</Button>
      </Card>
      <Card>
        <Card.Title>Create New Workout Plan</Card.Title>
      </Card>
    </View>
  );
};
export default Home;

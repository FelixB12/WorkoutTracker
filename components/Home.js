import {Button} from '@rneui/base';
import {Card, Dialog, Header, SpeedDial} from '@rneui/themed';
import {map} from 'lodash';
import React, {useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {
  getActiveWorkoutPlans,
  getDbConnection,
  getWorkoutPlan,
} from '../datastore/db-service';

const Home = ({navigation}) => {
  const [workoutPlans, setWorkoutPlans] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [workoutPlansToShow, setWorkoutPlansToShow] = useState(3);
  const [openActions, setOpenActions] = useState(false);
  const [workoutsToContinue, setWorkoutsToContinue] = useState([]);
  const [showStartWorkoutDialog, setShowStartWorkoutDialog] = useState(false);
  React.useEffect(() => {
    getDbConnection().then(db => {
      getWorkoutPlan(db).then(data => {
        setWorkoutPlans(data);
      });
      getActiveWorkoutPlans(db).then(data => {
        console.log('DATA', data);

        setWorkoutsToContinue(data);
      });
    });
  }, [refresh]);

  React.useEffect(() => {
    // navigation.setOptions({
    //   header: props => (
    //     <View
    //       style={{
    //         display: 'flex',
    //         flexDirection: 'row',
    //         justifyContent: 'space-between',
    //         height: 75,
    //       }}>
    //       <Header />
    //     </View>
    //   ),
    // });
  }, [navigation]);

  const onPressHandler = () => {
    setOpenActions(false);
    navigation.navigate('Create Workout', {onSave: onSave});
  };

  const onStartNewWorkout = () => {
    navigation.navigate('Start New Workout');
  };

  const onSave = () => {
    setRefresh(prev => prev + 1);
  };

  const onProgramContinue = data => {
    navigation.navigate('Continue Workout', {...data});
  };

  return (
    <>
      <ScrollView>
        <Card>
          <Card.Title>Your Current Workout</Card.Title>
          {workoutsToContinue.map((map, index) => {
            return (
              <View key={index}>
                <Text>{map.planName}</Text>
                <Button
                  title="Continue"
                  onPress={() => onProgramContinue(map)}
                />
              </View>
            );
          })}
        </Card>

        <Card>
          <Card.Title>Your Workout Plans</Card.Title>
          {workoutPlans.map((map, i) => {
            if (i < workoutPlansToShow) {
              return (
                <View key={map.id}>
                  <Text>{map.planName}</Text>
                </View>
              );
            }
          })}
          <Button
            onPress={() => setWorkoutPlansToShow(prev => prev + 2)}
            title={'Show More'}
            disabled={workoutPlans.length <= workoutPlansToShow}
          />
        </Card>
        <Card>
          <Button
            //onPress={() => setShowStartWorkoutDialog(true)}
            onPress={onStartNewWorkout}
            title="+ Start New Workout"
          />
        </Card>
        {/* <Card>
          <Card.Title>Create New Workout Plan</Card.Title>
          <Button onPress={onPressHandler}>Create New Workout</Button>
        </Card> */}
      </ScrollView>
      <SpeedDial
        isOpen={openActions}
        onOpen={() => setOpenActions(!openActions)}
        onClose={() => setOpenActions(!openActions)}
        icon={{name: 'edit'}}>
        <SpeedDial.Action
          title="Create New Workout"
          onPress={onPressHandler}
          icon={{name: 'add'}}
        />
      </SpeedDial>
    </>
  );
};
export default Home;

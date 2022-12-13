import {Card} from '@rneui/base';
import {Button, Icon, Text} from '@rneui/themed';
import React, {useState} from 'react';
import {Dimensions, ScrollView, StyleSheet, View} from 'react-native';
import {
  createSchedule,
  getDbConnection,
  getWorkoutPlan,
  getWorkoutPorgram,
  startWorkoutProgram,
} from '../../datastore/db-service';

const StartNewWorkout = props => {
  const [workoutPlans, setWorkoutPlans] = useState([]);
  const cardGap = 6;

  const cardWidth = (Dimensions.get('window').width - cardGap * 3) / 2;
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    cardStyle: {
      width: cardWidth,
    },
  });

  const onStartWorkoutHandler = planId => {
    // Create new entry in db that program was started
    getDbConnection().then(db => {
      startWorkoutProgram(db, planId).then(returned => {
        const programId = returned[0].insertId;
        createSchedule(db, programId).then(result => {
          console.log('CREATED SCHEDULE', result);
          getWorkoutPorgram(db, programId).then(programs => {
            if (programs.length > 0) {
              console.log('PROGRAM', programs);
              props.navigation.navigate('Continue Workout', {...programs[0]});
            }
          });
        });
      });
    });
  };

  React.useEffect(() => {
    getDbConnection().then(db => {
      getWorkoutPlan(db).then(data => {
        setWorkoutPlans(data);
      });
    });
  }, []);

  return (
    <ScrollView>
      <Text h4 style={{margin: 21, fontWeight: '900'}}>
        Chose Your Workout Program
      </Text>
      <View style={styles.container}>
        {workoutPlans.map((map, index) => {
          return (
            <View key={index} style={styles.cardStyle}>
              <Card>
                <Card.Title>{map.planName}</Card.Title>
                <Button
                  title="Start"
                  onPress={() => onStartWorkoutHandler(map.id)}
                  size="sm"
                />
              </Card>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default StartNewWorkout;

import {Button, Card, Icon, Text} from '@rneui/themed';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, TextInput, View} from 'react-native';
import {
  getDbConnection,
  getLatestSchedule,
  getRoutinesForPlanId,
  getWorkoutRoutine,
  getWorkoutRoutineActivity,
  getWorkoutRoutineForDay,
  saveWorkoutActivity,
} from '../../datastore/db-service';
import SmallInputBox from '../inputBox/SmallInputBox';
import RoutineSet from './RoutineSet';

const ContinueWorkout = props => {
  const [workoutRoutines, setWorkoutRoutines] = useState([]);
  const [workoutRoutinesActivity, setWorkoutRoutinesActivity] = useState([]);
  const [dbConnection, setDbConnection] = useState();
  const [scheduleId, setScheduleId] = useState();

  console.log('PROPS', props);
  const programInfo = props.route.params;

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <Button
          title="Finish"
          // onPress={() => props.navigation.navigate('Home')}
        />
      ),
    });
  }, [props.navigation]);

  useEffect(() => {
    getDbConnection().then(db => {
      setDbConnection(db);
      getLatestSchedule(db, programInfo.programId).then(schedule => {
        console.log('LASTEST SCHEDULE', schedule);
        const {day, id: scheduleId} = schedule[0];
        setScheduleId(scheduleId);
        console.log('Scheudle id', scheduleId);

        getWorkoutRoutineForDay(db, programInfo.workoutPlanId, day).then(
          routines => {
            console.log('ROUTINES TO CONT', routines);
            setWorkoutRoutines(routines);
          },
        );
        getWorkoutRoutineActivity(db, scheduleId).then(activies => {
          console.log('activites', activies);
        });
      });
    });
  }, [programInfo.programId, programInfo.workoutPlanId]);

  const handleInputChange = () => {};

  const handleCompleteSet = async (set, day, rep, weight, routineId) => {
    if (dbConnection && scheduleId) {
      const activityId = await saveWorkoutActivity(
        dbConnection,
        programInfo.programId,
        day,
        set,
        rep,
        weight,
        routineId,
        scheduleId,
      );
    }
  };

  if (dbConnection && scheduleId) {
    return (
      <ScrollView>
        {/* Build each workout sets card i.e. Pull Up, Bench Pres etc. One Card for each with entries */}
        {workoutRoutines.map((routine, id) => {
          console.log('routin', routine);

          return (
            <Card key={id}>
              <View>
                <Text>{routine.exerciseName}</Text>
                {[...Array(routine.sets)].map((set, idx) => {
                  return (
                    <RoutineSet
                      key={set + '' + idx}
                      routine={routine}
                      setNumber={idx + 1}
                    />
                  );
                })}
              </View>
            </Card>
          );
        })}
      </ScrollView>
    );
  } else {
    return <></>;
  }
};

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    margin: 5,
    alignContent: 'center',
  },
});

export default ContinueWorkout;

import {Card, Text} from '@rneui/base';
import {Button, Icon, Input} from '@rneui/themed';
import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {times} from 'lodash';
import RoutineDisplay from './RoutineCreate';

const CreateWorkout = ({navigation}) => {
  const [planName, setPlanName] = useState();
  const [planDayRange, setPlanDayRange] = useState();
  const [planDaysWorkoutPlan, setPlanDaysWorkoutPlan] = useState({});
  const [openAddRoutineOverLay, setOpenAddRoutineOverLay] = useState({
    open: false,
    day: undefined,
  });

  const onDayPerWeekValueChange = text => {
    const num = text.replace(/[^0-9]/g, '');
    if (num > 7) {
      setPlanDayRange(7);
    } else {
      setPlanDayRange(num);
    }
  };

  const handleAddRoutinePress = day => {
    setOpenAddRoutineOverLay({open: true, day: day});
  };
  const handleAddroutineFinish = () => {
    setOpenAddRoutineOverLay({open: false, day: undefined});
  };

  const onRoutineAdd = (exercise, sets, reps, weight, day) => {
    const dayt = day;
    setPlanDaysWorkoutPlan(prev => {
      const hasOwn = prev.hasOwnProperty(dayt);
      if (hasOwn) {
        return {
          ...prev,
          [dayt]: [
            ...prev[dayt],
            {routine: exercise, sets: sets, reps: reps, weight: weight},
          ],
        };
      } else {
        return {
          ...prev,
          [dayt]: [{routine: exercise, sets: sets, reps: reps, weight: weight}],
        };
      }
    });
    handleAddroutineFinish();
  };
  return (
    <ScrollView>
      <View style={{flex: 1}}>
        <RoutineDisplay
          open={openAddRoutineOverLay.open}
          handleSubmit={onRoutineAdd}
          handleCancel={handleAddroutineFinish} // TODO Add cancel handler
          day={openAddRoutineOverLay.day}
        />
        <Input placeholder="Workout Plan Name" />
        <Input
          keyboardType="numeric"
          onChangeText={onDayPerWeekValueChange}
          placeholder="How many Days per week (1-7)?"
        />

        {/* After Days are set, create flow to add workout for each day in the Plan */}
        {planDayRange > 0 &&
          times(planDayRange, i => {
            return (
              <Card key={'WorkourCreateKey' + i}>
                <Card.Title>
                  <Text>Day {i + 1} Plan</Text>
                </Card.Title>
                <Card.Divider />
                <View style={styles.container}>
                  <View style={styles.row}>
                    <Text style={styles.flexStyleExercise}>Exercise</Text>
                    <Text style={styles.flexStyleValues}>Sets</Text>
                    <Text style={styles.flexStyleValues}>Reps</Text>
                    <Text style={styles.flexStyleValues}>Weight</Text>
                  </View>
                </View>
                {planDaysWorkoutPlan.hasOwnProperty(i + 1) &&
                  planDaysWorkoutPlan[i + 1].map(obj => {
                    return (
                      <View style={styles.container}>
                        <View style={styles.row}>
                          <Text style={styles.flexStyleExercise}>
                            {obj.routine}
                          </Text>
                          <Text style={styles.flexStyleValues}>{obj.sets}</Text>
                          <Text style={styles.flexStyleValues}>{obj.reps}</Text>
                          <Text style={styles.flexStyleValues}>
                            {obj.weight}
                          </Text>
                          <View style={styles.flexStyleValues}>
                            <Icon name="edit" type="MaterialIcons" size={20} />
                          </View>
                        </View>
                      </View>
                    );
                  })}
                <Button onPress={() => handleAddRoutinePress(i + 1)}>
                  <Text>+ Add Day {i + 1} Routine</Text>
                </Button>
              </Card>
            );
          })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 8,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  flexStyleExercise: {
    flexBasis: '40%',
    flexDirection: 'row',
  },
  flexStyleValues: {
    flexBasis: '15%',
    flexDirection: 'row',
  },
});

export default CreateWorkout;

import {Card, Text} from '@rneui/base';
import {Button, Icon, Input} from '@rneui/themed';
import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {times} from 'lodash';
import RoutineDisplay from './RoutineCreate';

const createMock = (r, s, re, w) => {
  return {
    routine: r,
    sets: s,
    reps: re,
    weight: w,
  };
};

const mockData = {
  1: [
    {
      routine: 'Curl',
      sets: 4,
      reps: 12,
      weight: 10,
    },
    {
      routine: 'Pull Up',
      sets: 4,
      reps: 12,
      weight: 10,
    },
  ],
  2: [
    {
      routine: 'PullDown',
      sets: 2,
      reps: 10,
      weight: 10,
    },
  ],
  3: [createMock('Test 1', 2, 20, 15)],
  4: [
    createMock('Test 1', 2, 20, 15),
    createMock('Test 3', 2, 20, 15),
    createMock('Test 2', 2, 20, 15),
  ],
};

const CreateWorkout = ({navigation}) => {
  const [planName, setPlanName] = useState();
  const [planDayRange, setPlanDayRange] = useState();
  const [planDaysWorkoutPlan, setPlanDaysWorkoutPlan] = useState(mockData);
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

  return (
    <ScrollView>
      <View style={{flex: 1}}>
        <RoutineDisplay
          open={openAddRoutineOverLay.open}
          handleSubmit={handleAddroutineFinish}
          handleCancel={handleAddroutineFinish} // TODO Add cancel handler
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
                {planDaysWorkoutPlan[i + 1] &&
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
                <Button onPress={handleAddRoutinePress}>
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

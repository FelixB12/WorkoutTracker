import {Icon} from '@rneui/base';
import {Text} from '@rneui/themed';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import SmallInputBox from '../inputBox/SmallInputBox';

const RoutineSet = ({setNumber, routine}) => {
  const [reps, setReps] = useState();
  const [weight, setWeight] = useState();

  const handleRepChange = evt => {
    console.log(evt);
    setReps(evt);
  };

  const handleWeightChange = evt => {
    console.log(evt);
    setWeight(evt);
  };

  return (
    <View style={styles.row}>
      <Text style={{marginLeft: 10}}>SET {setNumber}</Text>
      <Text style={{marginLeft: 10}}>Reps: {routine.reps}</Text>
      <Text style={{marginLeft: 10}}>Weight: {routine.weight}</Text>
      <View style={{width: '13%', marginLeft: 10}}>
        <SmallInputBox placeholder="reps" onChange={handleRepChange} />
      </View>
      <View style={{width: '13%', marginLeft: 10}}>
        <SmallInputBox placeholder={'weight'} onChange={handleWeightChange} />
      </View>
      <Icon
        style={{marginLeft: 10}}
        type="MaterialIcons"
        name={false ? 'check-circle-outline' : 'check-circle'}
        size={20}
        color="green"
        // onPress={() => {
        //   () => handleCompleteSet();
        // }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    margin: 5,
    alignContent: 'center',
  },
});

export default RoutineSet;

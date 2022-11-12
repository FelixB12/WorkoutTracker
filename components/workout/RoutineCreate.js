import {Input, Text, Button, Overlay} from '@rneui/themed';
import React from 'react';
import {View} from 'react-native';

const REPS = 'REPS';
const WEIGHT = 'WEIGHT';
const SETS = 'SETS';

const RoutineDisplay = ({open, handleSubmit, handleCancel, day}) => {
  const [exerciseName, setExerciseName] = React.useState();
  const [sets, setSets] = React.useState();
  const [reps, setReps] = React.useState();
  const [weight, setWeight] = React.useState();

  const onHandleSetNumberField = (value, type) => {
    const num = value.replace(/[^0-9]/g, '');
    if (type === REPS) {
      setReps(num);
    } else if (type === WEIGHT) {
      setWeight(num);
    } else if (type === SETS) {
      setSets(num);
    }
  };

  // TODO Add custom weight range for each set and reps (set 1 - 10rep - 10kg, set 2 - 15rep - 15kg) etc
  // TODO Allow Edit
  // TODO Delete
  // TODO Check for validity before enable save

  return (
    <>
      {open && (
        <>
          <Overlay fullScreen>
            <Input
              style={{width: '100%'}}
              onChangeText={setExerciseName}
              placeholder="Exercise Name (ex Pullup)"
            />
            <Input
              keyboardType="numeric"
              onChangeText={value => onHandleSetNumberField(value, SETS)}
              placeholder="Number of Sets"
            />
            <Input
              keyboardType="numeric"
              onChangeText={value => onHandleSetNumberField(value, REPS)}
              placeholder="Number of Reps"
            />
            <Input
              keyboardType="numeric"
              onChangeText={value => onHandleSetNumberField(value, WEIGHT)}
              placeholder="Weight"
            />
            <Button
              onPress={() =>
                handleSubmit(exerciseName, sets, reps, weight, day)
              }
              title="Save"
            />
            <Button onPress={() => handleCancel()} title="Cancel" />
          </Overlay>
        </>
      )}
    </>
  );
};

export default RoutineDisplay;

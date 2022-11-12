import {Input, Text, Button, Overlay} from '@rneui/themed';
import React from 'react';
import {View} from 'react-native';

const RoutineDisplay = ({open, handleSubmit, handleCancel}) => {
  console.log('Open', open);

  // TODO Add custom weight range for each set and reps (set 1 - 10rep - 10kg, set 2 - 15rep - 15kg) etc
  // TODO Allow Edit
  // TODO Delete
  return (
    <>
      {open && (
        <>
          <Overlay fullScreen>
            <Input
              style={{width: '100%'}}
              placeholder="Exercise Name (ex Pullup)"
            />
            <Input placeholder="Number of Sets" />
            <Input placeholder="Number of Reps" />
            <Input placeholder="Weight" />
            <Button
              disabled={true}
              onPress={() => handleSubmit()}
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

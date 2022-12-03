import {View, Text} from 'react-native';
import {React, useEffect} from 'react';

import {styles} from './styles';

import StaticContainer from '../../../../src/containers/StaticContainer';
import DoctorFlowIcon from '../../../../src/assets/svgs/DoctorFlow-Icon.svg';
import PatientFlowIcon from '../../../../src/assets/svgs/PatientFlow-Icon.svg';
import dimensions from '../../../utils/styles/themes/dimensions';
import Button from '../../../components/shared/Button';

import AsyncStorage from '@react-native-async-storage/async-storage';

const ChooseRole = props => {
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@role');
      if (value !== null) {
        console.log(value);
      }
    } catch (e) {
      // error reading value
    }
  };
  const storeData = async value => {
    try {
      await AsyncStorage.setItem('@role', value);
    } catch (e) {
      // saving error
    }
  };
  useEffect(() => {
    getData();
  });

  return (
    <StaticContainer>
      <View style={styles.container}>
        <DoctorFlowIcon
          width={dimensions?.Width}
          height={dimensions?.Height / 3.5}
        />
        <Button
          onPress={() => {
            storeData('doctor');
          }}
          type="filled"
          label="Continue as a Doctor"
          width={dimensions.Width / 1.2}
        />
        <PatientFlowIcon
          width={dimensions?.Width}
          height={dimensions?.Height / 3.5}
        />
        <Button
          onPress={() => {
            storeData('patient');
          }}
          type="filled"
          label="Continue as a Patient"
          width={dimensions.Width / 1.2}
        />
      </View>
    </StaticContainer>
  );
};

export default ChooseRole;

import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';

import {styles} from './styles';

import StaticContainer from '../../../../src/containers/StaticContainer';
import DoctorFlowIcon from '../../../../src/assets/svgs/DoctorFlow-Icon.svg';
import PatientFlowIcon from '../../../../src/assets/svgs/PatientFlow-Icon.svg';
import dimensions from '../../../utils/styles/themes/dimensions';
import Button from '../../../components/shared/Button';

import deviceStorage from '../../../utils/helpers/deviceStorage';
import ROLES from '../../../utils/constants/ROLES';

const ChooseRole = ({navigation}) => {
  const chooseRole = role => {
    deviceStorage.saveItem('role', role);
    navigation.navigate('Onboarding');
  };

  return (
    <StaticContainer>
      <View style={styles.container}>
        <DoctorFlowIcon
          width={dimensions?.Width}
          height={dimensions?.Height / 3.5}
        />
        <Button
          onPress={() => {
            chooseRole(ROLES.doctor);
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
            chooseRole(ROLES.patient);
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

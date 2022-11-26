import {View, Text} from 'react-native';
import React from 'react';
import {Shadow} from 'react-native-shadow-2';

import {styles} from './styles';

import DocOnboarding1 from '../../../assets/svgs/DocOnboarding1.svg';
import Pagination1 from '../../../assets/svgs/Pagination1.svg';
import dimensions from '../../../utils/styles/themes/dimensions';

import Button from '../../../components/shared/Button';

const OnBoarding = () => {
  return (
    <View style={styles.root}>
      <View style={styles.logo}>
        <DocOnboarding1
          width={dimensions.Width}
          height={dimensions.Height / 2.4}
        />
      </View>
      <Shadow distance={12}>
        <View style={styles.overlay}>
          <Text style={styles.heading}>
            Hassle Free Appointment Booking Facility for Online and In Person
            Consultation
          </Text>
          <Pagination1
            width={dimensions.Width}
            height={dimensions.Height / 70}
          />
          <View>
            <Button
              onPress={() => {}}
              label="Next"
              type="filled"
              width={dimensions.Width / 1.2}
            />
            <Button
              onPress={() => {}}
              label="Skip"
              type="empty"
              borderColor="white"
              width={dimensions.Width / 1.2}
            />
          </View>
        </View>
      </Shadow>
    </View>
  );
};

export default OnBoarding;

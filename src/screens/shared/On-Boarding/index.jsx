import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {Shadow} from 'react-native-shadow-2';

import {styles} from './styles';

import DocOnboarding1 from '../../../assets/svgs/DocOnboarding1.svg';
import DocOnboarding2 from '../../../assets/svgs/DocOnboarding2.svg';
import DocOnboarding3 from '../../../assets/svgs/DocOnboarding3.svg';

import Pagination1 from '../../../assets/svgs/Pagination1.svg';
import Pagination2 from '../../../assets/svgs/Pagination2.svg';
import Pagination3 from '../../../assets/svgs/Pagination3.svg';

import dimensions from '../../../utils/styles/themes/dimensions';

import Button from '../../../components/shared/Button';

const OnBoarding = props => {
  const screens = {
    DocOnboarding1: DocOnboarding1,
    DocOnboarding2: DocOnboarding2,
    DocOnboarding3: DocOnboarding3,
  };

  const logo = {
    Pagination1: Pagination1,
    Pagination2: Pagination2,
    Pagination3: Pagination3,
  };

  const Name = screens[props.name];
  const Logo = logo[props.pagination];
  return (
    <View style={styles.root}>
      <View style={styles.logo}>
        <Name width={dimensions.Width} height={dimensions.Height / 2.4} />
      </View>
      <Shadow distance={12}>
        <View style={styles.overlay}>
          <Text style={styles.heading}>{props.text}</Text>
          <Logo width={dimensions.Width} height={dimensions.Height / 70} />
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

import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import Svg from 'react-native-svg';
import styles from './styles';
import StaticContainer from '../../../../containers/StaticContainer';

import MobileChipIcon from '../../../../assets/svgs/Mobile-Chip.svg';
import {useState} from 'react';

const OnlinePayment = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const user = useSelector(state => state.auth.user);

  const {doctorId, service, date, time} = route.params;

  return (
    <StaticContainer
      customHeaderName={'Online Payment'}
      customHeaderEnable={true}
      isBack={true}>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={styles.card}>
            <View style={styles.highlightTextContainer}>
              <Text style={styles.name}>Abdul Moeed</Text>
              <Text style={styles.expDate}>22/03</Text>
            </View>
            <MobileChipIcon />
            <View style={styles.cardNumberContainer}>
              <Text style={styles.text}>****</Text>
              <Text style={styles.text}>****</Text>
              <Text style={styles.text}>****</Text>
              <Text style={styles.text}>4209</Text>
            </View>
          </View>

          <View style={styles.cardFormContainer}></View>
        </View>
      </View>
    </StaticContainer>
  );
};

export default OnlinePayment;

import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';

import dimensions from '../../../../utils/styles/themes/dimensions';
import fonts from '../../../../utils/styles/themes/fonts';
import colors from '../../../../utils/styles/themes/colors';
//import {styles} from './styles';

import Tablet from '../../../../assets/svgs/tabletIcon.svg';
import Capsule from '../../../../assets/svgs/capsuleIcon.svg';
import Syringe from '../../../../assets/svgs/syringeIcon.svg';
import Syrup from '../../../../assets/svgs/syrupIcon.svg';
import Tick from '../../../../assets/svgs/tick.svg';

import StaticContainer from '../../../../containers/StaticContainer';

import {useNavigation} from '@react-navigation/native';

const MedicineScheduler = ({route}) => {
  const navigation = useNavigation();
  const role = useSelector(state => state.role.role);
  const item = route.params.item;
  console.log('item', item);

  return (
    <StaticContainer
      customHeaderEnable
      customHeaderName="Medicine Details"
      isBack
      isHorizontalPadding={false}>
      <View style={styles.container}>
        <View style={styles.Icon}>
          {item.type === 'tablet' && (
            <Tablet
              width={dimensions.Width * 0.4}
              height={dimensions.Width * 0.4}
            />
          )}
          {item.type === 'capsule' && (
            <Capsule
              width={dimensions.Width * 0.4}
              height={dimensions.Width * 0.4}
            />
          )}
          {item.type === 'syringe' && (
            <Syringe
              width={dimensions.Width * 0.4}
              height={dimensions.Width * 0.4}
            />
          )}
          {item.type === 'syrup' && (
            <Syrup
              width={dimensions.Width * 0.4}
              height={dimensions.Width * 0.4}
            />
          )}
        </View>
        <View style={styles.data}>
          <View style={styles.heading}>
            <Text style={styles.headingText}>{item.name}</Text>
            <View style={styles.line} />
          </View>
          <View style={styles.content}>
            <View style={styles.contentItem}>
              <Text style={styles.contentText}>Dosage</Text>
              <Text style={styles.contentItemText}>{item.dosageAmount}</Text>
            </View>
            <View style={styles.contentItem}>
              <Text style={styles.contentText}>Duration</Text>
              <Text style={styles.contentItemText}>{item.duration}</Text>
            </View>
          </View>
        </View>
      </View>
    </StaticContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  Icon: {
    height: dimensions.Height / 3.5,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: dimensions.Height * 0.05,
  },
  data: {
    height: dimensions.Height / 1.8,
    borderRadius: 50,
    width: dimensions.Width,
    backgroundColor: colors.primaryMonoChrome100,
  },
  heading: {
    height: dimensions.Height / 10,
    justifyContent: 'center',
    marginLeft: dimensions.Width * 0.05,
  },
  headingText: {
    fontSize: fonts.size.font24,
    fontWeight: fonts.weight.bold,
    color: colors.secondary1,
    marginLeft: dimensions.Width * 0.01,
  },
  line: {
    height: 3,
    width: dimensions.Width * 0.2,
    backgroundColor: colors.primary1,
    marginTop: dimensions.Height * 0.005,
  },
  content: {
    justifyContent: 'center',
    marginLeft: dimensions.Width * 0.02,
  },
  contentItem: {
    height: dimensions.Height / 10,
    width: dimensions.Width * 0.8,
    paddingHorizontal: dimensions.Width * 0.05,
  },
  contentText: {
    fontSize: fonts.size.font18,
    fontWeight: fonts.weight.bold,
    color: colors.secondary1,
    marginBottom: dimensions.Height * 0.01,
  },
  contentItemText: {
    fontSize: fonts.size.font14,
    fontWeight: fonts.weight.bold,
    color: colors.secondary2,
  },
});

export default MedicineScheduler;

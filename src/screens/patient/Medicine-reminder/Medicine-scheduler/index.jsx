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
import AddMore from '../../../../components/shared/AddMore';
import ReminderAddModal from '../../../../components/patient/MedicineReminder/ReminderAddModal';

import {useNavigation} from '@react-navigation/native';

const MedicineScheduler = () => {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const role = useSelector(state => state.role.role);
  const items = [
    {
      name: 'Paracetamol',
      dosage: '2 tablets',
      duration: '2 days',
      type: 'tablet',
    },
    {
      name: 'Paracetamol',
      dosage: '2 tablets',
      duration: '2 days',
      type: 'capsule',
    },
    {
      name: 'Paracetamol',
      dosage: '2 tablets',
      duration: '2 days',
      type: 'syringe',
    },
    {
      name: 'Paracetamol',
      dosage: '2 tablets',
      duration: '2 days',
      type: 'syrup',
    },
  ];

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <StaticContainer
      customHeaderEnable
      customHeaderName="Medicine Scheduler"
      isBack
      isHorizontalPadding={false}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View />
          <AddMore
            borderColor={colors.primary1}
            label={'Add More'}
            role={role}
            onPress={() => setModalVisible(true)}
          />
        </View>
        <View style={styles.calender}>
          <FlatList
            data={weekdays}
            horizontal
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => {
              return (
                <View style={styles.week}>
                  <Text style={styles.weekText}>{item} </Text>
                </View>
              );
            }}
          />
        </View>
        <View style={styles.body}>
          <FlatList
            data={items}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => {
              return (
                <View>
                  <TouchableOpacity
                    style={styles.itemContainer}
                    onPress={() => {
                      navigation.navigate('MedicineDetails', {item: item});
                    }}>
                    <View style={styles.icon}>
                      {item.type === 'tablet' && <Tablet />}
                      {item.type === 'capsule' && <Capsule />}
                      {item.type === 'syringe' && <Syringe />}
                      {item.type === 'syrup' && <Syrup />}
                    </View>
                    <View style={styles.data}>
                      <Text style={styles.name}>{item.name}</Text>
                      <Text style={styles.dosage}>{item.dosage}</Text>
                      <Text style={styles.duration}>{item.duration}</Text>
                    </View>
                    <View style={styles.tick}>
                      <Tick />
                    </View>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </View>
      </View>

      <ReminderAddModal
        Visible={isModalVisible}
        setModalVisible={setModalVisible}
      />
    </StaticContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: dimensions.Height * 0.01,
    paddingHorizontal: dimensions.Width * 0.03,
  },
  calender: {
    height: dimensions.Height / 12,
    alignItems: 'center',

    backgroundColor: colors.primaryMonoChrome100,
  },
  week: {
    alignItems: 'center',
    justifyContent: 'center',
    width: dimensions.Width * 0.13,
  },
  weekText: {
    fontSize: fonts.size.font16,
    fontWeight: fonts.weight.bold,
    color: colors.primary1,
  },
  body: {
    marginHorizontal: dimensions.Width * 0.03,
    marginTop: dimensions.Height * 0.02,
    borderRadius: dimensions.Width * 0.02,
    borderWidth: 1,
    borderColor: colors.primary1,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: dimensions.Height * 0.12,

    paddingVertical: dimensions.Height * 0.01,
    backgroundColor: colors.primaryMonoChrome100,
    borderRadius: dimensions.Width * 0.02,
    margin: dimensions.Height * 0.01,
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: dimensions.Width * 0.05,
  },
  data: {
    flex: 1,
    marginHorizontal: dimensions.Width * 0.03,
  },
  name: {
    fontSize: fonts.size.font16,
    fontWeight: fonts.weight.bold,
  },
  dosage: {
    fontSize: fonts.size.font14,
  },
  duration: {
    fontSize: fonts.size.font14,
  },
  tick: {
    marginHorizontal: dimensions.Width * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MedicineScheduler;

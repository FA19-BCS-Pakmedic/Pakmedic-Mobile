import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';

import dimensions from '../../../../utils/styles/themes/dimensions';
import colors from '../../../../utils/styles/themes/colors';
import fonts from '../../../../utils/styles/themes/fonts';

import StaticContainer from '../../../../containers/StaticContainer';
import AddMore from '../../../../components/shared/AddMore';
import Button from '../../../../components/shared/Button';
import MedicineAddModal from '../../../../components/doctor/MedicineAddModal';

import {useNavigation} from '@react-navigation/native';

//import {styles} from './styles'

const PrescriptionManagement = () => {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const role = useSelector(state => state.role.role);

  const medicines = [
    {
      name: 'Pandadol',
      dosageForm: 'Tablet',
      size: 40,
      freq: 2,
      days: 7,
      addDays: 2,
      details: 'Make sure to not take the tablet on empty stomach',
    },
    {
      name: 'Pandadol',
      dosageForm: 'Tablet',
      size: 40,
      freq: 2,
      days: 7,

      details: 'Make sure to not take the tablet on empty stomach',
    },
    {
      name: 'Pandadol',
      dosageForm: 'Tablet',
      size: 40,
      freq: 2,
      days: 7,
      addDays: 2,
      details: 'Make sure to not take the tablet on empty stomach',
    },
  ];

  return (
    <StaticContainer
      customHeaderEnable
      customHeaderName="Prescription Management"
      isBack
      isHorizontalPadding={false}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View />
          <AddMore
            type={'filled'}
            //borderColor={colors.secondary1}
            label={'Add More'}
            role={role}
            onPress={() => setModalVisible(true)}
          />
        </View>
        <View style={styles.body}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={medicines}
            renderItem={({item}) => (
              <View style={styles.item}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemHeading}>{item.name}</Text>
                  <View style={styles.headerline} />
                </View>
                <View style={styles.itemBody}>
                  <View style={styles.itemRow}>
                    <Text style={styles.itemTitle}>Dosage Form:</Text>
                    <Text style={styles.itemText}>{item.dosageForm}</Text>
                  </View>
                  <View style={styles.itemRow}>
                    <Text style={styles.itemTitle}>Dosage Size:</Text>
                    <Text style={styles.itemText}>{item.size} mg/ml</Text>
                  </View>
                  <View style={styles.itemRow}>
                    <Text style={styles.itemTitle}>Dosage Frequency:</Text>
                    <Text style={styles.itemText}>{item.freq} times a day</Text>
                  </View>
                  <View style={styles.itemRow}>
                    <Text style={styles.itemTitle}>Dosage Duration:</Text>
                    <Text style={styles.itemText}>{item.days} days</Text>
                  </View>
                  {item.addDays > 0 && (
                    <View style={styles.itemRow}>
                      <Text style={styles.itemTitle}>Additional Days:</Text>
                      <Text style={styles.itemText}>{item.addDays} days</Text>
                    </View>
                  )}
                  <View style={styles.itemRow}>
                    <Text style={styles.itemTitle}>Details:</Text>
                    <Text
                      style={[
                        styles.itemText,
                        {
                          maxWidth: dimensions.Width * 0.5,
                          textAlign: 'right',
                        },
                      ]}>
                      {item.details}
                    </Text>
                  </View>
                </View>
                <View style={styles.itemFooter}>
                  <Button
                    label="Delete"
                    type="outlined"
                    width={dimensions.Width / 3.5}
                    height={dimensions.Height / 25}
                    fontSize={fonts.size.font14}
                  />
                  <Button
                    label="Edit"
                    type="filled"
                    width={dimensions.Width / 3.5}
                    height={dimensions.Height / 25}
                    fontSize={fonts.size.font14}
                  />
                </View>
              </View>
            )}
          />
        </View>
        <View style={styles.footer}>
          <Button
            label="Cancel"
            type="outlined"
            width={dimensions.Width / 3.5}
            height={dimensions.Height / 25}
            fontSize={fonts.size.font14}
          />
          <Button
            label="Send"
            type="filled"
            width={dimensions.Width / 3.5}
            height={dimensions.Height / 25}
            fontSize={fonts.size.font14}
          />
        </View>
      </View>
      <MedicineAddModal
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
  body: {
    width: dimensions.Width * 0.9,
    height: dimensions.Height * 0.7,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: colors.secondaryMonoChrome100,
    paddingBottom: dimensions.Width * 0.04,
  },
  item: {
    backgroundColor: colors.white,
    marginTop: dimensions.Width * 0.04,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.primary1,
    width: dimensions.Width * 0.85,
    paddingHorizontal: dimensions.Width * 0.015,
  },
  itemHeader: {
    paddingVertical: dimensions.Width * 0.02,
  },
  headerline: {
    width: dimensions.Width * 0.1,
    height: dimensions.Height * 0.003,
    backgroundColor: colors.primary1,
  },
  itemHeading: {
    marginLeft: dimensions.Width * 0.01,
    fontSize: fonts.size.font18,
    fontWeight: fonts.weight.bold,
  },
  itemBody: {
    paddingHorizontal: dimensions.Width * 0.015,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: dimensions.Width * 0.005,
  },
  itemText: {
    fontSize: fonts.size.font12,
  },
  itemTitle: {
    fontSize: fonts.size.font12,
    fontWeight: fonts.weight.bold,
  },
  itemFooter: {
    marginTop: dimensions.Width * 0.01,
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignSelf: 'center',
    borderTopWidth: 1,
    borderColor: colors.primary1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

export default PrescriptionManagement;

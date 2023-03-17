import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import dimensions from '../../../../utils/styles/themes/dimensions';
import fonts from '../../../../utils/styles/themes/fonts';
import colors from '../../../../utils/styles/themes/colors';

import {getDate} from '../../../../utils/helpers/getDate';
import Button from '../../Button';

const PrescripitionCard = ({prescription, setOpenOptions}) => {
  return (
    <View style={styles().container}>
      <View style={styles().infoContainer}>
        <View style={styles().info}>
          <Text style={styles().label}>Symptoms</Text>
          <Text style={styles().value}>
            {prescription
              ? prescription.symptoms.slice(0, 12)
              : 'Headache, cou..'}
          </Text>
        </View>
        <View style={styles().info}>
          <Text style={styles().label}>Prescribed By</Text>
          <Text style={styles().value}>
            {prescription
              ? prescription.prescribedBy.slice(0, 12)
              : 'Dr. Drake'}
          </Text>
        </View>
        <View style={styles().info}>
          <Text style={styles().label}>Date</Text>
          <Text style={styles().value}>
            {prescription ? getDate(prescription.date) : '12/12/2023'}
          </Text>
        </View>

        <View style={styles().info}>
          <Text style={styles().label}>Total Medicines</Text>
          <Text style={styles().value}>
            {prescription ? prescription.medicine.length : '4'}
          </Text>
        </View>
      </View>

      <Button
        type={'filled'}
        label={'View Options'}
        onPress={() => setOpenOptions(true)}
        width={'100%'}
      />
    </View>
  );
};

export default PrescripitionCard;

const styles = () =>
  StyleSheet.create({
    container: {
      width: dimensions.Width / 2.3,
      height: dimensions.Height / 3.5,
      backgroundColor: colors.white,
      borderWidth: 1,
      borderColor: colors.primary1,
      borderRadius: dimensions.Width / 30,
      paddingHorizontal: dimensions.Width / 40,
      paddingVertical: dimensions.Height / 100,
      justifyContent: 'space-between',
      alignItems: 'center',
    },

    infoContainer: {
      width: '100%',
    },

    info: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: dimensions.Height / 100,
    },
  });

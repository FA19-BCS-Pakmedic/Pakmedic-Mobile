import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import dimensions from '../../../../utils/styles/themes/dimensions';
import fonts from '../../../../utils/styles/themes/fonts';
import colors from '../../../../utils/styles/themes/colors';

import {getDate} from '../../../../utils/helpers/getDate';
import Button from '../../Button';

const PrescripitionCard = ({prescription, onClick}) => {
  return (
    <View style={styles().container}>
      <View style={styles().infoContainer}>
        <Text style={styles().medicineText}>
          No of medicines: {prescription.medicines.length}
        </Text>
        <Text style={styles().doctorText}>
          Prescribed by doctor {prescription.doctor.name}
        </Text>
        <Text style={styles().dateText}>
          {new Date(prescription.created_at).toDateString()}
        </Text>
      </View>

      <Button
        type={'filled'}
        label={'View Options'}
        height={dimensions.Height / 20}
        onPress={() => {
          onClick(true);
        }}
        width={'100%'}
        fontSize={fonts.size.font14}
      />
    </View>
  );
};

export default PrescripitionCard;

const styles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      width: dimensions.Width / 2.3,
      //height: dimensions.Height / 3.5,
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
    medicineText: {
      fontSize: fonts.size.font14,
    },
    doctorText: {
      fontSize: fonts.size.font14,
      marginVertical: dimensions.Height / 100,
    },
    dateText: {
      fontSize: fonts.size.font14,
      marginBottom: dimensions.Height / 100,
    },
  });

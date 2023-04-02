import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import PrescriptionCard from './PrescriptionCard';

import dimensions from '@/utils/styles/themes/dimensions';
import fonts from '@/utils/styles/themes/fonts';
import colors from '@/utils/styles/themes/colors';

const Prescriptions = ({prescriptions, visible, setVisible}) => {
  return (
    <ScrollView
      style={styles.scrollContainer}
      contentContainer={styles.scrollContentContainer}>
      <View style={styles.contentContainer}>
        <View style={styles.prescriptionContainer}>
          <PrescriptionCard />
        </View>
        <View style={styles.prescriptionContainer}>
          <PrescriptionCard />
        </View>
        <View style={styles.prescriptionContainer}>
          <PrescriptionCard />
        </View>
        <View style={styles.prescriptionContainer}>
          <PrescriptionCard />
        </View>
        <View style={styles.prescriptionContainer}>
          <PrescriptionCard />
        </View>
        <View style={styles.prescriptionContainer}>
          <PrescriptionCard />
        </View>
        <View style={styles.prescriptionContainer}>
          <PrescriptionCard />
        </View>
      </View>
    </ScrollView>
  );
};

export default Prescriptions;

const styles = StyleSheet.create({
  scrollContainer: {
    width: '100%',
  },
  scrollContentContainer: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  contentContainer: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: dimensions.Width / 20,
    paddingBottom: dimensions.Height / 7,
  },

  prescriptionContainer: {
    marginVertical: dimensions.Height / 40,
  },

  bottomModalContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headingContainer: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  heading: {
    fontSize: fonts.size.font20,
    fontWeight: fonts.weight.bold,
  },

  optionContainer: {
    width: '100%',
    flex: 1,
  },

  option: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  optionText: {
    fontSize: fonts.size.font16,
    fontWeight: fonts.weight.semi,
  },
});

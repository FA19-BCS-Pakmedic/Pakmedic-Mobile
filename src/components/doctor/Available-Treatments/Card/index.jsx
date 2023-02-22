import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import Button from '../../../shared/Button';

import dimensions from '../../../../utils/styles/themes/dimensions';
import colors from '../../../../utils/styles/themes/colors';
import fonts from '../../../../utils/styles/themes/fonts';

export default function AvailableTreatmentsCard() {
  return (
    <View style={styles().container}>
      <Text style={styles().label}>Kidney stones</Text>
      <View style={styles().controls}>
        <Button
          type={'outlined'}
          label={'Edit'}
          width={dimensions.Width / 4}
          height={dimensions.Height / 20}
          borderColor={colors.primary1}
          onPress={() => {}}
        />
        <Button
          type={'filled'}
          label={'Delete'}
          width={dimensions.Width / 4}
          height={dimensions.Height / 20}
          borderColor={colors.primary1}
          onPress={() => {}}
        />
      </View>
    </View>
  );
}

const styles = () =>
  StyleSheet.create({
    container: {
        
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      paddingVertical: dimensions.Height / 300,
      paddingHorizontal: dimensions.Width / 50,
      marginBottom: dimensions.Height / 50,
      backgroundColor: colors.primaryMonoChrome100,
      borderRadius: dimensions.Height / 100,
    },

    label: {
      maxWidth: '35%',
      fontSize: fonts.size.font14,
      fontWeight: fonts.weight.semi,
    },

    controls: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 0,
      width: '60%',
    },
  });

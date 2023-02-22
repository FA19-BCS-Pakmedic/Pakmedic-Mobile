import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import OptionsIcon from '../../../../assets/svgs/Options.svg';

import colors from '../../../../utils/styles/themes/colors';
import dimensions from '../../../../utils/styles/themes/dimensions';
import fonts from '../../../../utils/styles/themes/fonts';

const ExperienceCard = () => {
  return (
    <View style={styles().container}>
      <View style={styles().headerContainer}>
        <Text style={styles().headerText}>Dental Practitioner</Text>
        <View style={styles().optionsIconContainer}>
          <OptionsIcon />
        </View>
      </View>

      <View style={styles().contentContainer}>
        <Text style={styles().text}>
          Dental and maxillofacial Surgery center, Jail road, lahore
        </Text>
      </View>
    </View>
  );
};

export default ExperienceCard;

const styles = () =>
  StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      borderRadius: dimensions.Width / 50,
      padding: dimensions.Width / 20,
      marginBottom: dimensions.Height / 50,
      borderWidth: 2,
      borderColor: colors.primary1,
    },

    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },

    headerText: {
      fontSize: fonts.size.font24,
      fontWeight: fonts.weight.bold,
    },

    contentContainer: {
      marginTop: dimensions.Height / 50,
    },

    text: {
      fontSize: fonts.size.font16,
      fontWeight: fonts.weight.regular,
    },
  });

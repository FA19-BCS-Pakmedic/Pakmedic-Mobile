import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import dimensions from '@/utils/styles/themes/dimensions';
import fonts from '@/utils/styles/themes/fonts';
import colors from '@/utils/styles/themes/colors';

const EhrSwitch = ({options, role, onOptionPress}) => {
  return (
    <View style={styles().container}>
      {options.map((option, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={styles().option}
            onPress={() => onOptionPress(index)}>
            <Text style={styles().text}>{option.label}</Text>
            <View style={styles(option.isActive).active} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default EhrSwitch;

const styles = isActive =>
  StyleSheet.create({
    container: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: dimensions.Width / 15,
      borderBottomWidth: 2,
      borderBottomColor: colors.primary1,
    },

    option: {
      paddingBottom: dimensions.Height / 100,
    },

    text: {
      fontSize: fonts.size.font18,
      fontWeight: fonts.weight.semi,
    },

    active: {
      width: '100%',
      height: dimensions.Height / 300,
      backgroundColor: isActive ? colors.accent1 : 'transparent',
    },
  });

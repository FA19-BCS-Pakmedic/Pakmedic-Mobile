import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import fonts from '../../../utils/styles/themes/fonts';
import dimensions from '../../../utils/styles/themes/dimensions';
import colors from '../../../utils/styles/themes/colors';

const Chip = ({value, index, onPress, color, background, error}) => {
  return (
    <TouchableOpacity
      style={styles(background, null, error).root}
      onPress={() => onPress(index)}>
      <Text style={styles(background, color).text}>{value}</Text>
    </TouchableOpacity>
  );
};

export default Chip;

const styles = (background, color, error) =>
  StyleSheet.create({
    root: {
      backgroundColor: error ? colors.invalid : background,
      borderRadius: 10,
      paddingVertical: dimensions.Height / 150,
      paddingHorizontal: dimensions.Width / 15,
      marginVertical: dimensions.Width / 100,
      marginHorizontal: dimensions.Width / 100,
    },
    text: {
      color: color,
      fontSize: fonts.size.font14,
    },
  });

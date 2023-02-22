import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import fonts from '../../../utils/styles/themes/fonts';
import dimensions from '../../../utils/styles/themes/dimensions';

const Chip = ({value, index, onPress, color, background}) => {
  return (
    <TouchableOpacity
      style={styles(background).root}
      onPress={() => onPress(index)}>
      <Text style={styles(background, color).text}>{value}</Text>
    </TouchableOpacity>
  );
};

export default Chip;

const styles = (background, color) =>
  StyleSheet.create({
    root: {
      backgroundColor: background,
      borderRadius: 10,
      paddingVertical: dimensions.Height / 200,
      paddingHorizontal: dimensions.Width / 20,
      marginVertical: dimensions.Width / 100,
      marginHorizontal: dimensions.Width / 100,
    },
    text: {
      color: color,
      fontSize: fonts.size.font14,
    },
  });

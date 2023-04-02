import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Image} from 'react-native-animatable';
import colors from '../../../utils/styles/themes/colors';
import dimensions from '../../../utils/styles/themes/dimensions';

const IconTab = ({icon, value, isActive, onSelect, size}) => {
  return (
    <TouchableOpacity
      style={styles(isActive).container}
      onPress={() => {
        onSelect(value);
      }}>
      {/* icon in form of svg */}
      <Image
        source={icon}
        style={{
          width: size ? size : dimensions.Width / 10,
          height: size ? size : dimensions.Width / 10,
          tintColor: isActive ? null : colors.secondary1 + '80',
        }}
        animation={`${isActive ? 'pulse' : 'fadeIn'}`}
      />
      <Text style={styles(isActive).value}>{value}</Text>
    </TouchableOpacity>
  );
};

export default IconTab;

const styles = isActive =>
  StyleSheet.create({
    container: {
      paddingVertical: dimensions.Width / 50,
      paddingHorizontal: dimensions.Width / 30,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: isActive ? colors.primaryMonoChrome100 : null,
      borderWidth: 1,
      borderColor: colors.primary1,
    },
  });

import {StyleSheet, Text, View, TextInput} from 'react-native';
import React from 'react';

import SearchIcon from '../../../assets/svgs/SearchIcon.svg';
import colors from '../../../utils/styles/themes/colors';
import dimensions from '../../../utils/styles/themes/dimensions';

const SearchInput = ({
  placeholder,
  value,
  onChange,
  type,
  placeholderColor,
}) => {
  return (
    <View style={styles(type).container}>
      <TextInput
        style={styles().input}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        placeholderTextColor={
          placeholderColor ? placeholderColor : colors.secondary1
        }
      />
      <SearchIcon style={styles().icon} />
    </View>
  );
};

export default SearchInput;

const styles = (type, paddingHorizontal) =>
  StyleSheet.create({
    container: {
      width: '100%',
      backgroundColor:
        type === 'outlined' ? colors.white : colors.secondaryMonoChrome100,
      borderWidth: type === 'outlined' ? 1 : 0,
      borderColor:
        type === 'outlined' ? colors.primary1 : colors.primaryMonoChrome100,
      borderRadius: dimensions.Width,
      flexDirection: 'row',
      borderWidth: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: paddingHorizontal
        ? paddingHorizontal
        : dimensions.Width / 50,
    },

    input: {
      color: colors.secondary1,
      width: '90%',
    },

    icon: {
      width: dimensions.Width / 20,
      height: dimensions.Width / 20,
    },
  });
import {StyleSheet, TextInput, View} from 'react-native';
import React from 'react';
import {Controller} from 'react-hook-form';

//importing theme
import colors from '../../../utils/styles/themes/colors';
import fonts from '../../../utils/styles/themes/fonts';
import dimensions from '../../../utils/styles/themes/dimensions';

const AutoNextInput = React.forwardRef((props, ref) => {
  return (
    <TextInput
      style={[styles(props?.type, props?.width, props?.height).root]}
      keyboardType="number-pad"
      ref={ref}
      onChangeText={text => {
        if (text.length >= props?.maxLength) {
          props?.onChangeText(text);
        }
      }}
      maxLength={props?.maxLength}
    />
  );
});

export default AutoNextInput;

const styles = (type, width, height) =>
  StyleSheet.create({
    root: {
      width: width,
      borderWidth: type === 'outlined' ? 1 : 0,
      borderRadius: 10,
      height: dimensions.Height / height,
      backgroundColor: type === 'outlined' ? 'white' : colors.secondaryLight,
      borderColor:
        type === 'outlined' ? colors.primary1 : colors.secondaryLight,
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      fontSize: fonts.size.font20,
      fontWeight: fonts.weight.bold,
      color: colors.secondary1,
    },
  });

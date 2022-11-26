import {StyleSheet, TextInput, View} from 'react-native';
import React from 'react';

//importing premade styles
import {AutoNextInputStyles} from './AutoNextInput.styles';
import colors from '../../../utils/styles/themes/colors';
import fonts from '../../../utils/styles/themes/fonts';

getInputType = type => {
  switch (type) {
    case 'filled':
      return AutoNextInputStyles.filled;
    case 'outlined':
      return AutoNextInputStyles.outlined;
    default:
      return 'default';
  }
};

const AutoNextInput = React.forwardRef((props, ref) => {
  return (
    <TextInput
      style={styles(props?.type, props?.width).root}
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

const styles = (type, width) =>
  StyleSheet.create({
    root: {
      width: width,
      borderWidth: type === 'outlined' ? 2 : 0,
      borderRadius: 10,
      height: 60,
      backgroundColor: type === 'outlined' ? 'white' : colors.secondaryLight,
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      fontSize: fonts.size.font20,
      fontWeight: fonts.weight.bold,
      color: colors.secondary1,
    },
    input: {
      ...getInputType(type),
    },
  });

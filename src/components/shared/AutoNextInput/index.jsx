import {StyleSheet, TextInput, View} from 'react-native';
import {forwardRef} from 'react';
import {Controller} from 'react-hook-form';

//importing theme
import colors from '../../../utils/styles/themes/colors';
import fonts from '../../../utils/styles/themes/fonts';
import dimensions from '../../../utils/styles/themes/dimensions';

const AutoNextInput = forwardRef(
  (
    {control, rules, type, width, height, maxLength, onChangeText, name},
    ref,
  ) => {
    return (
      <Controller
        control={control}
        rules={rules}
        name={name}
        render={({field: {onChange, onBlur}}) => (
          <TextInput
            style={[styles(type, width, height).root]}
            keyboardType="number-pad"
            ref={ref}
            onBlur={onBlur}
            onChangeText={text => {
              if (text?.length >= maxLength) {
                onChange(text);
                onChangeText();
              }
            }}
            maxLength={maxLength}
          />
        )}
      />
    );
  },
);

const styles = (type, width, height) =>
  StyleSheet.create({
    root: {
      width: width,
      borderWidth: type === 'outlined' ? 1 : 0,
      borderRadius: 10,
      height: dimensions.Height / height,
      backgroundColor:
        type === 'outlined' ? 'white' : colors.secondaryMonoChrome100,
      borderColor:
        type === 'outlined' ? colors.primary1 : colors.secondaryMonoChrome100,
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      fontSize: fonts.size.font20,
      fontWeight: fonts.weight.bold,
      color: colors.secondary1,
    },
  });

export default AutoNextInput;

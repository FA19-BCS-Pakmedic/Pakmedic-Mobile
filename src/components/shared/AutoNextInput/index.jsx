import {StyleSheet, TextInput, View} from 'react-native';
import React from 'react';
import {Controller} from 'react-hook-form';

//importing theme
import colors from '../../../utils/styles/themes/colors';
import fonts from '../../../utils/styles/themes/fonts';
import dimensions from '../../../utils/styles/themes/dimensions';

const AutoNextInput = React.forwardRef((props, ref) => {
  return (
    <Controller
      control={props.control}
      name={props.name}
      rules={props.rules}
      key={props.name}
      render={({
        field: {onChange, onBlur},
        fieldState: {error, isDirty, isTouched},
      }) => (
        <TextInput
          style={[
            styles(props?.type, props?.width, props?.height).root,
            {
              borderColor:
                (error || props?.customError) && props?.type === 'outlined'
                  ? colors.invalid
                  : colors.primary1,
            },
          ]}
          onBlur={onBlur}
          keyboardType="number-pad"
          ref={ref}
          onChangeText={text => {
            console.log(error);
            if (error) {
              props?.setCustomError(true);
            }
            {
              props?.setCustomError(false);
            }

            onChange(text);
            if (text.length >= props?.maxLength) {
              props?.onChangeText(text);
            }
          }}
          maxLength={props?.maxLength}
        />
      )}
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

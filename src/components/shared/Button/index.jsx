import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';

import fonts from '../../../utils/styles/themes/fonts';
import colors from '../../../utils/styles/themes/colors';
import dimensions from '../../../utils/styles/themes/dimensions';

export default Button = ({
  isDisabled,
  width,
  type,
  label,
  onPress,
  borderColor,
  height,
}) => {
  return (
    <TouchableOpacity
      style={
        isDisabled
          ? styles(type, width, height).disabled
          : styles(type, width, borderColor, height).button
      }
      activeOpacity={isDisabled ? 1 : 0.2}
      onPress={() => {
        !isDisabled && onPress ? onPress() : () => {};
      }}>
      <Text
        style={
          isDisabled ? styles().buttonLabelDisabled : styles().buttonLabel
        }>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = (type, width, borderColor, height) =>
  StyleSheet.create({
    button: {
      marginTop: dimensions.Height / 50, //remove if it there is unneseccary space
      height: height ? height : dimensions.Height / 17,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
      marginVertical: dimensions.Height / 60,
      backgroundColor: type === 'filled' ? colors.primary1 : colors.white,
      borderWidth: 2,
      borderColor: borderColor ? borderColor : colors.primary1,
      width: width,
    },

    disabled: {
      height: dimensions.Height / 15,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
      marginVertical: dimensions.Height / 60,
      backgroundColor: colors.gray1,
      width: width,
    },

    buttonLabel: {
      fontSize: fonts.size.font16,
      fontWeight: fonts.weight.bold,
    },

    buttonLabelDisabled: {
      fontSize: fonts.size.font16,
      fontWeight: fonts.weight.bold,
      color: colors.gray2,
    },
  });

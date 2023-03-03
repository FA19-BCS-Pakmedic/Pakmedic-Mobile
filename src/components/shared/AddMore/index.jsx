import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';

import fonts from '../../../utils/styles/themes/fonts';
import colors from '../../../utils/styles/themes/colors';
import dimensions from '../../../utils/styles/themes/dimensions';
import AddMore from '../../../assets/svgs/Add-More.svg';

export default Button = ({
  isDisabled,
  width,
  type,
  label,
  onPress,
  borderColor,
}) => {
  return (
    <TouchableOpacity
      style={[
        isDisabled
          ? styles(type, width).disabled
          : styles(type, width, borderColor).button,
      ]}
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
      <AddMore
        style={styles().icon}
        width={dimensions.Width / 14}
        height={dimensions.Height / 16}
      />
    </TouchableOpacity>
  );
};

const styles = (type, width, borderColor) =>
  StyleSheet.create({
    button: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      alignItems: 'center',
      borderRadius: 15,
      backgroundColor:
        type === 'filled' ? colors.secondaryMonoChrome100 : colors.white,
      borderWidth: borderColor ? 2 : 0,
      borderColor: borderColor ? borderColor : colors.primary1,
      width: dimensions.Width / 2.6,
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

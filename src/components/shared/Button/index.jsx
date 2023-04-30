import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
} from 'react-native';

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
  isLoading,
  marginVertical,
  fontSize = fonts.size.font16,
  fontColor = colors.secondary1,
  children,
}) => {
  return (
    <TouchableOpacity
      style={
        isDisabled
          ? styles(type, width, null, height, null, null, marginVertical)
              .disabled
          : styles(type, width, borderColor, height, null, null, marginVertical)
              .button
      }
      activeOpacity={isDisabled ? 1 : 0.2}
      onPress={() => {
        !isLoading && !isDisabled && onPress ? onPress() : () => {};
      }}>
      {isLoading ? (
        <ActivityIndicator size="small" color={colors.white} />
      ) : (
        <View style={styles().container}>
          {children}
          <Text
            style={
              isDisabled
                ? styles(null, null, null, null, fontSize, fontColor)
                    .buttonLabelDisabled
                : styles(null, null, null, null, fontSize, fontColor)
                    .buttonLabel
            }>
            {label}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = (
  type,
  width,
  borderColor,
  height,
  fontSize,
  fontColor,
  marginVertical,
) =>
  StyleSheet.create({
    button: {
      // marginTop: dimensions.Height / 50, //remove if it there is unneseccary space
      height: height ? height : dimensions.Height / 17,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
      borderWidth: 1,
      marginVertical: marginVertical ? marginVertical : dimensions.Height / 60,
      backgroundColor: type === 'filled' ? colors.primary1 : colors.white,
      borderWidth: 2,
      borderColor: borderColor ? borderColor : colors.primary1,
      width: width,
    },

    disabled: {
      height: height ? height : dimensions.Height / 17,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
      // marginVertical: dimensions.Height / 60,
      marginVertical: marginVertical ? marginVertical : dimensions.Height / 60,

      backgroundColor: colors.gray1,
      width: width,
    },

    buttonLabel: {
      fontSize: fontSize,
      fontWeight: fonts.weight.bold,
      color: fontColor,
      marginLeft: 2,
    },

    buttonLabelDisabled: {
      fontSize: fonts.size.font16,
      fontWeight: fonts.weight.bold,
      color: colors.gray2,
      marginLeft: 2,
    },
    container: {
      justifyContent: 'space-around',
      alignItems: 'center',
      flexDirection: 'row',
    },
  });

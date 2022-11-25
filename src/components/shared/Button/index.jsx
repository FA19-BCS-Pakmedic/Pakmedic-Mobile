import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';

import fonts from '../../../utils/styles/themes/fonts';
import colors from '../../../utils/styles/themes/colors';

export default Button = props => {
  return (
    <TouchableOpacity
      style={styles(props.type, props.width).button}
      onPress={props.onPress}>
      <Text style={styles().buttonLabel}>{props.label}</Text>
    </TouchableOpacity>
  );
};

const styles = (type, width) =>
  StyleSheet.create({
    button: {
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
      marginVertical: 10,
      backgroundColor: type === 'filled' ? colors.primary1 : colors.white,
      borderWidth: 2,
      borderColor: colors.primary1,
      width: width,
    },

    buttonLabel: {
      fontSize: fonts.size.font16,
      fontWeight: fonts.weight.bold,
    },
  });

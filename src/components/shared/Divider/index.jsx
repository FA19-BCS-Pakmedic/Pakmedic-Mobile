import {View, Text, StyleSheet} from 'react-native';

//import themes
import colors from '../../../utils/styles/themes/colors';
import fonts from '../../../utils/styles/themes/fonts';
import dimensions from '../../../utils/styles/themes/dimensions';

export const TextDivider = props => {
  return (
    <View style={styles().root}>
      <View style={styles(props.color).halfDivider}></View>
      <Text style={styles().content}>{props.label}</Text>
      <View style={styles(props.color).halfDivider}></View>
    </View>
  );
};

const styles = color =>
  StyleSheet.create({
    root: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: dimensions.Height / 30,
    },
    halfDivider: {
      height: dimensions.Height / 150,
      flex: 1,
      borderRadius: 20,
      backgroundColor: color,
    },
    content: {
      fontSize: fonts.size.font14,
      fontWeight: fonts.weight.semi,
      marginHorizontal: dimensions.Width * 0.05,
    },
  });

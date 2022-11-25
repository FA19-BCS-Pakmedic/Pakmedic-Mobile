import {View, Text, StyleSheet} from 'react-native';

import {DividerStyles} from './Divider.styles';

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
      ...DividerStyles.divider,
    },
    halfDivider: {
      ...DividerStyles.halfDivider,
      backgroundColor: color,
    },
    content: {
      ...DividerStyles.content,
    },
  });

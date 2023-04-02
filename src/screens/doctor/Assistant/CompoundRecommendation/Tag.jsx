import React from 'react';
import {
  StyleSheet,
  Text,
  Pressable,
  PressableProps,
  TextStyle,
} from 'react-native';

import colors from '../../../../utils/styles/themes/colors';
import fonts from '../../../../utils/styles/themes/fonts';
import dimensions from '../../../../utils/styles/themes/dimensions';

const Tag = ({label, textStyle, ...props}) => (
  <Pressable
    style={({pressed}) => [
      {
        opacity: pressed ? 0.7 : 1,
      },
      styles.container,
    ]}
    {...props}>
    <Text style={[styles.label, textStyle]}>{label}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.accent2,
    marginRight: 8,
    marginBottom: 8,
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 10,
  },
  label: {
    color: colors.secondaryMonoChrome1000,
    fontSize: 14,
  },
});

export default Tag;

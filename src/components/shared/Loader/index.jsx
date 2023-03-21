import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import colors from '../../../utils/styles/themes/colors';

const Loader = ({title}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={colors.primary1} animating />
      <Text>{title}</Text>
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

import {StyleSheet, View, SafeAreaView} from 'react-native';
import React from 'react';

import Header from '../components/shared/Header';

// importing dimensions
import dimensions from '../utils/styles/themes/dimensions';

const StaticContainer = ({children}) => {
  return (
    <SafeAreaView style={styles.root}>
      <Header />
      <View style={styles.container}>{children}</View>
    </SafeAreaView>
  );
};

export default StaticContainer;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: '100%',
  },

  container: {
    width: '100%',
    paddingHorizontal: dimensions.Width / 20,
    paddingVertical: dimensions.Height / 40,
  },
});

import {StyleSheet, View, SafeAreaView} from 'react-native';
import React from 'react';

import Header from '../components/shared/Header';

// importing dimensions
import dimensions from '../utils/styles/themes/dimensions';

import CustomNavHeader from '../components/shared/CustomNavHeader';
import colors from '../utils/styles/themes/colors';

const StaticContainer = ({
  children,
  customHeaderEnable = false,
  customHeaderName,
  headerColor,
}) => {
  return (
    <SafeAreaView style={styles.root}>
      <Header color={headerColor} />
      {customHeaderEnable && <CustomNavHeader screenName={customHeaderName} />}

      <View style={styles.container}>{children}</View>
    </SafeAreaView>
  );
};

export default StaticContainer;

const styles = StyleSheet.create({
  root: {
    flex: 1,

    width: dimensions.Width,
    borderWidth: 2,
    backgroundColor: colors.white,
  },

  container: {
    width: '100%',
    flex: 1,
    paddingHorizontal: dimensions.Width / 20,
    paddingVertical: dimensions.Height / 50,
  },
});

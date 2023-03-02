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
  isBack = true,
}) => {
  return (
    <SafeAreaView style={styles().root}>
      <Header />
      {customHeaderEnable && (
        <CustomNavHeader screenName={customHeaderName} isBack={isBack} />
      )}

      <View style={styles(!customHeaderEnable).container}>{children}</View>
    </SafeAreaView>
  );
};

export default StaticContainer;

const styles = isPadding =>
  StyleSheet.create({
    root: {
      width: dimensions.Width,
      height: dimensions.Height,
      // borderWidth: 1,
      // borderColor: 'red',
      backgroundColor: colors.white,
    },

    container: {
      width: '100%',
      flex: 1,
      paddingHorizontal: dimensions.Width / 20,
      paddingVertical: isPadding ? dimensions.Height / 50 : 0,
    },
  });

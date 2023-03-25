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
  isHorizontalPadding = true,
  disableHeader,
}) => {
  return (
    <SafeAreaView style={styles().root}>
      {disableHeader === true ? null : <Header />}
      {customHeaderEnable && (
        <CustomNavHeader screenName={customHeaderName} isBack={isBack} />
      )}

      <View style={styles(!customHeaderEnable, isHorizontalPadding).container}>
        {children}
      </View>
    </SafeAreaView>
  );
};

export default StaticContainer;

const styles = (isVerticalPadding, isHorizontalPadding) =>
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
      paddingHorizontal: isHorizontalPadding ? dimensions.Width / 20 : 0,
      paddingVertical: isVerticalPadding ? dimensions.Height / 50 : 0,
    },
  });

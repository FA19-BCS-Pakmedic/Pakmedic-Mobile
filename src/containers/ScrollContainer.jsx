import {StyleSheet, Text, ScrollView, View, SafeAreaView} from 'react-native';
import React from 'react';

//import custom components
import Header from '../components/shared/Header';

import CustomNavHeader from '../components/shared/CustomNavHeader';

//import dimension
import dimensions from '../utils/styles/themes/dimensions';
import colors from '../utils/styles/themes/colors';

const ScrollContainer = ({
  headerColor,
  children,
  customHeaderEnable,
  customHeaderName,
  isBack = true,
}) => {
  return (
    <SafeAreaView style={styles().root}>
      <Header color={headerColor} />
      {customHeaderEnable && (
        <CustomNavHeader screenName={customHeaderName} isBack={isBack} />
      )}

      <ScrollView
        style={styles().root}
        contentContainerStyle={styles(customHeaderEnable).child}
        nestedScrollEnabled={true}>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ScrollContainer;

const styles = isPadding =>
  StyleSheet.create({
    root: {
      height: dimensions.Height,
      width: dimensions.Width,
      backgroundColor: colors.white,
    },

    container: {
      width: '100%',
    },
    child: {
      flexGrow: 1,
      paddingHorizontal: dimensions.Width / 20,
      paddingVertical: isPadding ? dimensions.Height / 50 : 0,
    },
  });

import {StyleSheet, Text, ScrollView, View, SafeAreaView} from 'react-native';
import React from 'react';

//import custom components
import Header from '../components/shared/Header';

import CustomNavHeader from '../components/shared/CustomNavHeader';

//import dimension
import dimensions from '../utils/styles/themes/dimensions';
import colors from '../utils/styles/themes/colors';

const ScrollContainer = ({children, customHeaderEnable, customHeaderName}) => {
  return (
    <SafeAreaView style={styles.root}>
      <Header color={colors.primary1} />
      {customHeaderEnable && <CustomNavHeader screenName={customHeaderName} />}

      <ScrollView style={styles.root} contentContainerStyle={styles.child}>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ScrollContainer;

const styles = StyleSheet.create({
  root: {
    flex: 1,

    width: dimensions.Width,
    backgroundColor: colors.white,

  },

  container: {
    width: '100%',
  },

  child: {
    flexGrow: 1,
    paddingHorizontal: dimensions.Width / 20,
    paddingVertical: dimensions.Height / 50,
  },
});

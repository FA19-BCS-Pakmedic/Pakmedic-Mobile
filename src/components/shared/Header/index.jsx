import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

// import theme
import colors from '../../../utils/styles/themes/colors';
import fonts from '../../../utils/styles/themes/fonts';
import dimensions from '../../../utils/styles/themes/dimensions';

const Header = ({color}) => {
  return (
    <View style={styles(color).root}>
      <Text style={styles().text}>Pakmedic</Text>
    </View>
  );
};

export default Header;

const styles = color =>
  StyleSheet.create({
    root: {
      width: dimensions.Width,
      height: dimensions.Height / 20,
      backgroundColor: color || colors.secondaryLight,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      color: colors.secondary1,
      fontSize: fonts.size.font20,
      fontWeight: fonts.weight.bold,
    },
  });

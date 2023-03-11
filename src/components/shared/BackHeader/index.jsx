import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

// import theme
import colors from '../../../utils/styles/themes/colors';
import fonts from '../../../utils/styles/themes/fonts';
import dimensions from '../../../utils/styles/themes/dimensions';
import Back from '../../../assets/svgs/Backicon';

const BackHeader = ({text}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <Back width={dimensions.Width / 35} height={dimensions.Height / 35} />
      </TouchableOpacity>
      <Text style={styles.text}>{text}</Text>
      <View></View>
    </View>
  );
};

export default BackHeader;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: dimensions.Height / 20,
  },
  text: {
    alignSelf: 'center',
    color: colors.secondary1,
    fontSize: fonts.size.font20,
    fontWeight: fonts.weight.bold,
    paddingRight: dimensions.Width / 10,
  },
  button: {
    width: dimensions.Width / 10,
    height: dimensions.Height / 20,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    color: colors.secondary1,
    backgroundColor: colors.secondaryMonoChrome100,
  },
});

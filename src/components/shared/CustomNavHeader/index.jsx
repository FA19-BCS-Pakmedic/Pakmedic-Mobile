import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

// import theme files
import colors from '../../../utils/styles/themes/colors';
import fonts from '../../../utils/styles/themes/fonts';
import dimensions from '../../../utils/styles/themes/dimensions';

const CustomNavHeader = ({screenName}) => {
  return (
    <View style={styles.root}>
      <TouchableOpacity style={styles.iconContainer}>
        <Icon name="angle-left" size={25} />
      </TouchableOpacity>
      <Text style={styles.title}>{screenName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: dimensions.Width,
    height: dimensions.Height / 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },

  iconContainer: {
    width: dimensions.Width / 8,
    height: dimensions.Height / 17,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.secondaryLight,
    borderRadius: 10,
    position: 'absolute',
    left: dimensions.Width / 20,
  },

  titleContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },

  title: {
    fontSize: fonts.size.font20,
    fontWeight: fonts.weight.bold,
    alignContent: 'center',
  },
});

export default CustomNavHeader;

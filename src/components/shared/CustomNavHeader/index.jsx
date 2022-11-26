import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

// import theme files
import colors from '../../../utils/styles/themes/colors';
import fonts from '../../../utils/styles/themes/fonts';

const CustomNavHeader = ({screenName}) => {
  return (
    <View style={styles.root}>
      <TouchableOpacity style={styles.iconContainer}>
        <Icon name="angle-left" size={25} />
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{screenName}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
  },

  iconContainer: {
    width: '12%',
    height: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.secondaryLight,
    borderRadius: 10,
  },

  titleContainer: {
    width: '90%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontSize: fonts.size.font20,
    fontWeight: fonts.weight.bold,
  },
});

export default CustomNavHeader;

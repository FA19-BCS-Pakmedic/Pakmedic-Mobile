import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

import Back from '../../../assets/svgs/Backicon';

import {useNavigation} from '@react-navigation/native';

// import theme files
import colors from '../../../utils/styles/themes/colors';
import fonts from '../../../utils/styles/themes/fonts';
import dimensions from '../../../utils/styles/themes/dimensions';

const CustomNavHeader = ({screenName, isBack}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.root}>
      {isBack && (
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => {
            navigation.pop();
          }}>
          <Back width={dimensions.Width / 35} height={dimensions.Height / 35} />
        </TouchableOpacity>
      )}
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
    width: dimensions.Width / 10,
    height: dimensions.Height / 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.secondaryMonoChrome100,
    borderRadius: 7,
    position: 'absolute',
    left: dimensions.Width / 20,
  },
  title: {
    fontSize: fonts.size.font20,
    fontWeight: fonts.weight.bold,
    alignContent: 'center',
    maxWidth: dimensions.Width / 1.5,
    textAlign: 'center',
  },
});

export default CustomNavHeader;

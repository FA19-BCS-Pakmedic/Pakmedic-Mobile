import {View, Text, StyleSheet, TextInput, Alert} from 'react-native';
import React from 'react';

// import theme
import colors from '../../../utils/styles/themes/colors';
import fonts from '../../../utils/styles/themes/fonts';
import dimensions from '../../../utils/styles/themes/dimensions';

import Search from '../../../assets/svgs/SearchIcon';

const CommunitySearch = () => {
  return (
    <View style={styles.root}>
      <TextInput
        style={styles.input}
        placeholder="Search"
        placeholderTextColor={colors.secondary1}
      />
      {/*TODO: Add onPress event to Search icon*/}
      <Search
        width={dimensions.Width / 20}
        height={dimensions.Height / 20}
        onPress={() => {
          Alert.alert('haha u suck moeed and haris');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: dimensions.Width / 2.3,
    height: dimensions.Height / 22,
    borderColor: colors.primary1,
    borderWidth: 1,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  input: {
    width: dimensions.Width / 3,
    height: dimensions.Height / 20,
    paddingLeft: dimensions.Width / 40,
    color: colors.secondary1,
    fontSize: fonts.size.font12,
  },
});

export default CommunitySearch;

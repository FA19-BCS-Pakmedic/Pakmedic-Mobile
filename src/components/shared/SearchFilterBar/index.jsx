import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import dimensions from '../../../utils/styles/themes/dimensions';
import colors from '../../../utils/styles/themes/colors';

import FilterIcon from '../../../assets/svgs/FilterIcon.svg';
import fonts from '../../../utils/styles/themes/fonts';
import SearchInput from '../SearchInput';
import ROLES from '../../../utils/constants/ROLES';

const SearchFilterBar = ({role}) => {
  return (
    <View style={styles(null, role).container}>
      <TouchableOpacity style={styles().filterContainer}>
        <FilterIcon style={styles().filterIcon} />
        <Text style={styles().text}>Filter</Text>
      </TouchableOpacity>

      {/* Search input */}

      <View style={styles().searchContainer}>
        <SearchInput placeholder="Search" type={'outlined'} />
      </View>
    </View>
  );
};

export default SearchFilterBar;

const styles = (type, role) =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: dimensions.Height / 15,
      position: 'relative',
      left: 0,
      right: 0,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor:
        type === 'outlined' ? colors.white : (role === ROLES.doctor ? colors.secondaryMonoChrome100 : colors.primaryMonoChrome300),
      borderWidth: type === 'outlined' ? 1 : 0,
      borderColor:
        type === 'outlined' ? colors.primary1 : colors.secondaryMonoChrome100,
      paddingHorizontal: dimensions.Width / 25,
    },

    filterContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      width: dimensions.Width / 5,
    },

    text: {
      fontSize: fonts.size.font16,
      fontWeight: fonts.weight.semi,
    },

    filterIcon: {
      marginRight: dimensions.Width / 40,
    },

    searchContainer: {
      width: dimensions.Width / 2.5,
      height: '80%',
    },
  });

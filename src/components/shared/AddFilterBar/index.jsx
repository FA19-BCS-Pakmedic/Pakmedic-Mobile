import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import dimensions from '@/utils/styles/themes/dimensions';
import ROLES from '@/utils/constants/ROLES';
import colors from '@/utils/styles/themes/colors';
import fonts from '@/utils/styles/themes/fonts';

import FilterIcon from '@/assets/svgs/FilterIcon.svg';
import AddMore from '@/components/shared/AddMore';

const AddFilterBar = ({setVisible, setIsEdit, activeOption}) => {
  return (
    <View style={styles().container}>
      <TouchableOpacity style={styles().filterContainer}>
        <FilterIcon style={styles().filterIcon} />
        <Text style={styles().text}>Filter</Text>
      </TouchableOpacity>

      {/* Search input */}
      {activeOption !== 'Prescriptions' && (
        <AddMore
          label="Add"
          type="filled"
          onPress={() => {
            setVisible(true);
            setIsEdit(false);
          }}
        />
      )}
    </View>
  );
};

export default AddFilterBar;

const styles = () =>
  StyleSheet.create({
    container: {
      width: '100%',

      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',

      paddingHorizontal: dimensions.Width / 20,
      height: dimensions.Height / 15,
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

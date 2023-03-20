import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import dimensions from '../../../utils/styles/themes/dimensions';
import colors from '../../../utils/styles/themes/colors';

import LocationIcon from '../../../assets/svgs/Location.svg';
import fonts from '../../../utils/styles/themes/fonts';
import SearchInput from '../../shared/SearchInput';

const DoctorSearchbar = ({setVisible, setKeyword, keyword, location}) => {
  const [data, setData] = useState('');

  useEffect(() => {
    if (data.length === 0) {
      setKeyword(data);
    }
  }, [data]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.locationContainer}
        onPress={() => setVisible(true)}>
        <LocationIcon />
        <Text style={styles.text}>{location ? location : 'Location'}</Text>
      </TouchableOpacity>
      <View style={styles.searchInputContainer}>
        <SearchInput
          placeholder={'Search by name'}
          type={'outlined'}
          onChange={setData}
          onPress={() => {
            setKeyword(data);
          }}
        />
      </View>
    </View>
  );
};

export default DoctorSearchbar;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: dimensions.Height / 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },

  locationContainer: {
    flexDirection: 'row',
    width: dimensions.Width / 2.8,
    justifyContent: 'space-between',
    paddingHorizontal: dimensions.Width / 30,
    borderWidth: 1,
    borderColor: colors.secondary1,
    borderRadius: dimensions.Width,
    height: dimensions.Height / 20,
    alignItems: 'center',
  },

  text: {
    fontSize: fonts.size.font14,
    fontWeight: fonts.weight.semi,
  },

  searchInputContainer: {
    height: dimensions.Height / 20,
    width: dimensions.Width / 2.5,
  },
});

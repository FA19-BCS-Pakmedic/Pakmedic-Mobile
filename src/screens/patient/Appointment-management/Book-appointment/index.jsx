import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

//import {styles} from './styles';
import StaticContainer from '../../../../containers/StaticContainer';
import {useSelector} from 'react-redux';
import SearchFilterBar from '../../../../components/shared/SearchFilterBar';

import NotFound from '../../../../components/shared/NotFound';

import dimensions from '../../../../utils/styles/themes/dimensions';
import colors from '../../../../utils/styles/themes/colors';
import fonts from '../../../../utils/styles/themes/fonts';

const {useNavigation} = require('@react-navigation/native');

const BookAppointment = () => {
  const role = useSelector(state => state.role.role);
  return (
    <StaticContainer
      isBack={false}
      customHeaderName={'Book Appointment'}
      customHeaderEnable={true}
      isHorizontalPadding={false}>
      <View style={styles.container}>
        <View style={styles.filterSearchContainer}>
          <SearchFilterBar role={role} />
        </View>
        <View style={styles.notFoundContainer}>
          <NotFound
            title={'No Doctors Found'}
            text={'Sorry we could not find any doctors for you at the moment'}
            center
          />
        </View>
      </View>
    </StaticContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  filterSearchContainer: {
    flex: 0.1,
    backgroundColor: colors.white,
  },
  notFoundContainer: {
    flex: 0.9,
    backgroundColor: colors.white,
    paddingHorizontal: dimensions.Width / 20,
  },
});

export default BookAppointment;

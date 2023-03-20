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

const Appointments = () => {
  const role = useSelector(state => state.role.role);
  return (
    <StaticContainer
      isBack={false}
      customHeaderName={'Appointments'}
      customHeaderEnable={true}
      isHorizontalPadding={false}>
      <View style={styles.container}>
        <View style={styles.filterSearchContainer}>
          <SearchFilterBar role={role} />
        </View>
        <View style={styles.notFoundContainer}>
          <NotFound
            title={'No Appointments Found'}
            text={
              'There is no Patient Appointments scheduled for you at the moment'
            }
            center
            appoint
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
  },
});

export default Appointments;

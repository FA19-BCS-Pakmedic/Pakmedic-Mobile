import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';

import StaticContainer from '../../../../containers/StaticContainer';

import styles from './styles';
import SearchFilterBar from '../../../../components/shared/SearchFilterBar';
import AppointmentCard from '../../../../components/shared/AppointmentCard';

const UsersList = ({navigation}) => {
  const role = useSelector(state => state.role.role);

  return (
    <StaticContainer
      isBack={true}
      customHeaderName={role === 'doctor' ? 'Patients list' : 'Doctors list'}
      customHeaderEnable={true}
      isHorizontalPadding={false}>
      <View style={styles.container}>
        {/* filter and search option */}
        <View style={styles.filterSearchContainer}>
          <SearchFilterBar role={role} />
        </View>

        {/* Upcoming appointments section */}
        <ScrollView
          contentContainerStyle={styles.scrollContainerContent}
          style={styles.scrollContainer}>
          <View style={styles.appointmentsContainer}>
            <View style={styles.appointmentContainer}>
              <AppointmentCard role={role} navigation={navigation} />
            </View>
            <View style={styles.appointmentContainer}>
              <AppointmentCard role={role} navigation={navigation} />
            </View>
            <View style={styles.appointmentContainer}>
              <AppointmentCard role={role} navigation={navigation} />
            </View>
            <View style={styles.appointmentContainer}>
              <AppointmentCard role={role} navigation={navigation} />
            </View>
            <View style={styles.appointmentContainer}>
              <AppointmentCard role={role} navigation={navigation} />
            </View>
            <View style={styles.appointmentContainer}>
              <AppointmentCard role={role} navigation={navigation} />
            </View>
          </View>
        </ScrollView>
      </View>
    </StaticContainer>
  );
};

export default UsersList;

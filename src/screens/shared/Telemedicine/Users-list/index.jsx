import {View, Text, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

import StaticContainer from '../../../../containers/StaticContainer';

import styles from './styles';
import SearchFilterBar from '../../../../components/shared/SearchFilterBar';
import UserListCard from '../../../../components/shared/UserListCard';

import {getAppointmentsByUserId} from '../../../../services/appointmentServices';

const UsersList = ({navigation}) => {
  const role = useSelector(state => state.role.role);
  const user = useSelector(state => state.auth.user);

  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const getAppointments = async () => {
      try {
        const response = await getAppointmentsByUserId(`${role.toLowerCase()}=${user._id}`);

        console.log(response.data.data.data);

        setAppointments(response.data.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    if (user && role) {
      getAppointments();
    }
  }, [user, role]);

  const navigateToChat = receiver => {
    navigation.navigate('App', {
      screen: 'Chat',
      params: {
        receiver: receiver, //TODO: remove this id as it is only used for testing purpose
      },
    });
  };

  return (
    <StaticContainer isHorizontalPadding={false}>
      <View style={styles.container}>
        <View style={styles.filterSearchContainer}>
          <SearchFilterBar role={role} />
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContainerContent}
          style={styles.scrollContainer}>
          <View style={styles.appointmentsContainer}>
            {appointments.length > 0 &&
              appointments.map(appointment => (
                <View style={styles.appointmentContainer} key={appointment._id}>
                  <UserListCard
                    role={role}
                    appointment={appointment}
                    onPressContact={navigateToChat}
                  />
                </View>
              ))}
          </View>
        </ScrollView>
      </View>
    </StaticContainer>
  );
};

export default UsersList;

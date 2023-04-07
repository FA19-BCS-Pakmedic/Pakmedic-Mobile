import {View, Text, StyleSheet, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';

//import {styles} from './styles';
import StaticContainer from '../../../../containers/StaticContainer';
import {useSelector} from 'react-redux';
import SearchFilterBar from '../../../../components/shared/SearchFilterBar';
import Loader from '../../../../components/shared/Loader';

import NotFound from '../../../../components/shared/NotFound';

import dimensions from '../../../../utils/styles/themes/dimensions';
import colors from '../../../../utils/styles/themes/colors';
import fonts from '../../../../utils/styles/themes/fonts';
import ROLES from '../../../../utils/constants/ROLES';
import {getAppointmentsByUserId} from '../../../../services/appointmentServices';
import AppointmentCard from '../../../../components/doctor/Appointment-Card';

const {useNavigation, useRoute} = require('@react-navigation/native');

const Appointments = () => {
  const role = useSelector(state => state.role.role);
  const user = useSelector(state => state.auth.user);

  const [appointments, setAppointments] = useState([]);

  const [loading, setLoading] = useState(false);

  const getAppointments = async () => {
    const query =
      role === ROLES.patient ? `patient=${user._id}` : `doctor=${user._id}`;

    try {
      setLoading(true);
      const response = await getAppointmentsByUserId(query);
      setAppointments(response.data.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  const getAppointmentCard = appointment => {
    console.log(appointment);
    return <AppointmentCard appointment={appointment} />;
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <StaticContainer
          isBack={true}
          customHeaderName={'Book Appointment'}
          customHeaderEnable={true}
          isHorizontalPadding={false}>
          <View style={styles.container}>
            <View style={styles.filterSearchContainer}>
              <SearchFilterBar role={role} />
            </View>

            {appointments.length > 0 ? (
              <View style={styles.appointmentsContainer}>
                <FlatList
                  data={appointments}
                  renderItem={({item}) => (
                    <AppointmentCard appointment={item} />
                  )}
                  keyExtractor={item => item._id}
                />
              </View>
            ) : (
              <View style={styles.notFoundContainer}>
                <NotFound
                  title={'No Doctors Found'}
                  text={
                    'Sorry we could not find any doctors for you at the moment'
                  }
                  center
                />
              </View>
            )}
          </View>
        </StaticContainer>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },

  notFoundContainer: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: dimensions.Width / 20,
  },

  appointmentsContainer: {
    paddingVertical: dimensions.Height / 40,
    justifyContent: 'center',
    alignItems: 'center',

    marginBottom: dimensions.Height / 7,
  },
});

export default Appointments;

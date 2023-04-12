import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import StaticContainer from '../../../../containers/StaticContainer';
import {apiEndpoint} from '../../../../utils/constants/APIendpoint';
import ROLES from '../../../../utils/constants/ROLES';
import Button from '../../../../components/shared/Button';
import styles from './styles';

import PhysicalIcon from '../../../../assets/svgs/Physical-checkup.svg';
import VideoIcon from '../../../../assets/svgs/VideoOn.svg';
import ClockIcon from '../../../../assets/svgs/Clock.svg';
import CalendarIcon from '../../../../assets/svgs/Appointment.svg';
import {getDate} from '../../../../utils/helpers/getDate';
import dimensions from '../../../../utils/styles/themes/dimensions';
import colors from '../../../../utils/styles/themes/colors';

const AppointmentDetails = () => {
  const route = useRoute();
  const {appointment} = route.params;
  const navigation = useNavigation();

  const role = useSelector(state => state.role.role);

  const getRoleBasedInfo = property => {
    if (role === ROLES.doctor) {
      return appointment.patient[property];
    } else {
      return appointment.doctor[property];
    }
  };

  const navigate = screen => {
    navigation.navigate('App', {
      screen: screen,
      params: {
        appointment: appointment,
      },
    });
  };

  const getServiceInfo = () => {
    return appointment.service.isOnline ? (
      <>
        <View
          style={[
            styles.iconContainer,
            {
              backgroundColor:
                role === ROLES.doctor
                  ? colors.secondaryMonoChrome100
                  : colors.primaryMonoChrome100,
            },
          ]}>
          <VideoIcon width={20} />
        </View>

        <Text style={styles.appointmentInfoText}>Online consultation</Text>
      </>
    ) : (
      <>
        <View
          style={[
            styles.iconContainer,
            {
              backgroundColor:
                role === ROLES.doctor
                  ? colors.secondaryMonoChrome100
                  : colors.primaryMonoChrome100,
            },
          ]}>
          <PhysicalIcon width={20} />
        </View>
        <Text style={styles.appointmentInfoText}>Physical consultation</Text>
      </>
    );
  };

  return (
    <StaticContainer
      isBack={true}
      customHeaderEnabled={true}
      customHeaderTitle="Appointment Details">
      <View style={styles.container}>
        <View style={styles.appointmentInfoContainer}>
          <View style={styles.profileCard}>
            <View style={styles.profile}>
              <Image
                source={{
                  uri: `${apiEndpoint}files/${getRoleBasedInfo('avatar')}`,
                }}
                style={{
                  height: 100,
                  width: 100,
                  borderRadius: 50,
                }}
              />
            </View>
            <View style={styles.info}>
              <Text style={styles.name}>{getRoleBasedInfo('name')}</Text>
              <Button
                label={'View Profile'}
                width={dimensions.Width / 3}
                onPress={() => {}}
                type="filled"
              />
            </View>
          </View>

          <View style={styles.appointmentInfo}>
            <Text style={styles.heading}>Appointment Information</Text>

            <View style={styles.appointmentInfoRow}>
              <View
                style={[
                  styles.iconContainer,
                  {
                    backgroundColor:
                      role === ROLES.doctor
                        ? colors.secondaryMonoChrome100
                        : colors.primaryMonoChrome100,
                  },
                ]}>
                <CalendarIcon width={20} />
              </View>
              <Text style={styles.appointmentInfoText}>
                {getDate(appointment.date)}
              </Text>
            </View>

            <View style={styles.appointmentInfoRow}>
              <View
                style={[
                  styles.iconContainer,
                  {
                    backgroundColor:
                      role === ROLES.doctor
                        ? colors.secondaryMonoChrome100
                        : colors.primaryMonoChrome100,
                  },
                ]}>
                <ClockIcon width={20} />
              </View>
              <Text style={styles.appointmentInfoText}>{appointment.time}</Text>
            </View>

            <View style={styles.appointmentInfoRow}>{getServiceInfo()}</View>
          </View>
        </View>
        <View style={styles.controls}>
          <Button
            label={'Request Cancel'}
            onPress={() => {
              navigate('CancelAppointment');
            }}
            type="outlined"
            width={'48%'}
          />
          <Button
            label={'Request Reschedule'}
            onPress={() => {
              navigate('RescheduleAppointment');
            }}
            type="filled"
            width={'48%'}
          />
        </View>
      </View>
    </StaticContainer>
  );
};

export default AppointmentDetails;

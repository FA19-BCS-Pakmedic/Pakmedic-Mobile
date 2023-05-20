import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import openMap, {createOpenLink} from 'react-native-open-maps';
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
import { getAppointmentById, getAppointmentRequests, getAppointmentsByUserId } from '../../../../services/appointmentServices';
import { useCustomToast } from '../../../../hooks/useCustomToast';
import Loader from '../../../../components/shared/Loader';

const AppointmentDetails = () => {
  const route = useRoute();

  let appointmentId = route.params?.data;


  // if(!appointment) {
  //   console.log(route.params, "ROUTE PARAMS");
  //   appointment = route.params.data.appointmentId;
  // }

  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  const travelType = 'drive';
  const address = appointment?.service?.hospital?.address;

  const { showToast } = useCustomToast(); 

  useEffect(() => {

    const getAppointment = async () => {
      try {
        setLoading(true);
        const response = await getAppointmentById(appointmentId);

      

        if(response.data && response.data.status === "success") {
          setAppointment(response.data.data.data);
        }

      }catch(err) {
        showToast(err.message, 'danger');
      } finally {
        setLoading(false);
      }
    }

    if(appointmentId) {
      getAppointment()
    }

  }, [appointmentId]);



  const [end] = useState(
    address ? `${address?.address} ${address?.city} ${address?.country}` : null,
  );

  const role = useSelector(state => state.role.role);

  const getRoleBasedInfo = property => {
    if (role === ROLES.doctor) {
      return appointment?.patient[property];
    } else {
      return appointment?.doctor[property];
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

  const _openMaps = () => {
    return createOpenLink({travelType, end, provider: 'google'});
  };

  const getServiceInfo = () => {
    return appointment?.service.isOnline ? (
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


  if(loading) 
    return <Loader title={'loading appointment data....'} />




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
                {getDate(appointment?.date)}
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
              <Text style={styles.appointmentInfoText}>{appointment?.time}</Text>
            </View>

            <View style={styles.appointmentInfoRow}>{getServiceInfo()}</View>
          </View>
        </View>

        {address ? (
          <View style={styles.mapContainer}>
            <Text style={styles.text}>Click to open google maps</Text>
            <TouchableOpacity
              onPress={_openMaps()}
              style={styles.overlay}></TouchableOpacity>
            <MapView
              initialRegion={{
                latitude: address.lat,
                longitude: address.lng,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              style={styles.map}>
              <Marker
                coordinate={{latitude: address.lat, longitude: address.lng}}
              />
            </MapView>
          </View>
        ) : (
          <View style={styles.mapContainer}>
            <Text style={styles.heading}>No Location Found</Text>
          </View>
        )}

        {appointment?.status === 'upcoming' && (
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
        )}
      </View>
    </StaticContainer>
  );
};

export default AppointmentDetails;

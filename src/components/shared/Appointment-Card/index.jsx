import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, { useState } from 'react';

import PhysicalIcon from '../../../assets/svgs/Physical-checkup.svg';
import VideoIcon from '../../../assets/svgs/VideoOn.svg';
import MessageIcon from '../../../assets/svgs/Message.svg';
import HealthRecordIcon from '../../../assets/svgs/Health-Record.svg';
import CallIcon from '../../../assets/svgs/CallPick.svg';

import {getDate} from '../../../utils/helpers/getDate';
import Button from '../../shared/Button';
import colors from '../../../utils/styles/themes/colors';
import dimensions from '../../../utils/styles/themes/dimensions';
import fonts from '../../../utils/styles/themes/fonts';
import {useSelector} from 'react-redux';
import ROLES from '../../../utils/constants/ROLES';
import {useNavigation} from '@react-navigation/native';
import { useCustomToast } from '../../../hooks/useCustomToast';
import { requestEhrAccess } from '../../../services/ehrServices';
import { requestPermissions } from '../../../services/voxServices';

const AppointmentCard = ({appointment}) => {
  const doctor = appointment.doctor;
  const service = appointment.service;
  const patient = appointment.patient;
  const doctorId = doctor._id;

  const navigation = useNavigation();

  const role = useSelector(state => state.role.role);
  const [btnLoading, setBtnLoading] = useState(false);

  const {showToast} = useCustomToast();
  //   const role = 'Doctor';

  const hasAccess = () => {
    if (patient?.ehrAccess) {
      return patient.ehrAccess.some(access => {
        return access.doctor === doctorId;
      });
    }

    return false;
  };

  const handleRequstEHR = async () => {
    setBtnLoading(true);
    try{
      const response = await requestEhrAccess(patient._id);
      showToast(response.data.message, "success");
    }catch(err) {
      showToast("Error requesting EHR", "danger");
    }finally {  
      setBtnLoading(false);
    }
  }

  const onPressCall = async (receiver) => {
    const permissionsGranted = await requestPermissions(true);

    if (permissionsGranted) {
      navigation.navigate('App', {
        screen: 'OngoingCall',
        params: {
          callee: receiver._id,
          isVideoCall: false,
          isIncomingCall: false,
          otherUsername: receiver.name,
        },
      });
    }
  };

  return (
    <TouchableOpacity
      style={styles().container}
      onPress={() => {
        navigation.navigate('App', {
          screen: 'AppointmentDetails',
          params: {
            data: appointment._id,
          },
        });
      }}>
      <View style={styles().nameContainer}>
        <Text style={styles().name}>
          {role === ROLES.doctor && patient ? patient.name : doctor.name}
        </Text>
      </View>
      <View style={styles().appointmentInfoContainer}>
        <View style={styles(role).iconContainer}>
          {service && !service.isOnline ? <PhysicalIcon /> : <VideoIcon />}
        </View>
        <View style={styles().appointmentInfo}>
          <Text style={styles().appointmentInfoText}>
            Date: {appointment ? getDate(appointment.date) : '12/12/24'}
          </Text>
        </View>
        <View style={styles().appointmentInfo}>
          <Text style={styles().appointmentInfoText}>
            Time: {appointment ? appointment.time : '10:30-11:00'}
          </Text>
        </View>
      </View>
      <View style={styles().controls}>
        {role === ROLES.doctor &&
          (!hasAccess ? (
            <Button
              height={dimensions.Height / 25}
              fontSize={fonts.size.font12}
              width={dimensions.Width / 4}
              marginVertical={'5%'}
              label={'View EHR'}
              onPress={() => {}}
              type="filled">
              <HealthRecordIcon />
            </Button>
          ) : (
            <Button
              height={dimensions.Height / 25}
              fontSize={fonts.size.font12}
              width={dimensions.Width / 4}
              marginVertical={'5%'}
              label={'Request EHR'}
              onPress={handleRequstEHR}
              type="filled">
              <HealthRecordIcon />
            </Button>
          ))}

        <Button
          height={dimensions.Height / 25}
          fontSize={fonts.size.font12}
          width={dimensions.Width / 4}
          marginVertical={'5%'}
          label={'Message'}
          onPress={() => {
            navigation.navigate('Chat', 
            {
              data: role === 'Doctor' ? patient._id : doctor._id, //TODO: remove this id as it is only used for testing purpose
              receiver: role === 'Doctor' ? patient : doctor,
            })
          }}
          type="filled">
            
          <MessageIcon />
        </Button>

        <Button
          height={dimensions.Height / 25}
          fontSize={fonts.size.font12}
          width={dimensions.Width / 4}
          marginVertical={'5%'}
          label="Call"
          onPress={() => {
            onPressCall(role === 'Doctor' ? patient : doctor);
          }}
          type="filled">
          <CallIcon width={15} />
        </Button>
      </View>
    </TouchableOpacity>
  );
};

export default AppointmentCard;

const styles = role =>
  StyleSheet.create({
    container: {
      borderWidth: 1,
      width: dimensions.Width / 1.05,
      borderRadius: dimensions.Width / 30,
      borderColor: colors.primary1,
      padding: dimensions.Width / 50,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      marginVertical: dimensions.Height / 90,
      minHeight: dimensions.Height / 5,
    },

    nameContainer: {
      maxWidth: dimensions.Width / 3,
    },

    name: {
      fontSize: fonts.size.font18,
      fontWeight: fonts.weight.semi,
      maxWidth: dimensions.Width / 5,
    },

    iconContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      width: dimensions.Width / 10,
      height: dimensions.Width / 10,
      borderRadius: dimensions.Width / 20,
      backgroundColor:
        role === 'Patient'
          ? colors.primaryMonoChrome100
          : colors.secondaryMonoChrome100,
    },

    appointmentInfoContainer: {
      alignItems: 'center',
    },
    appointmentInfoText: {
      fontSize: fonts.size.font14,
      fontWeight: fonts.weight.semi,
      marginVertical: dimensions.Height / 200,
    },
    controls: {
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

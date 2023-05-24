import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import dimensions from '../../../utils/styles/themes/dimensions';
import ROLES from '../../../utils/constants/ROLES';
import colors from '../../../utils/styles/themes/colors';

import fonts from '../../../utils/styles/themes/fonts';
import Button from '../Button';
import {getDate} from '../../../utils/helpers/getDate';
import {apiEndpoint} from '../../../utils/constants/APIendpoint';

import ReviewAddModal from '../../patient/ReviewAddModal';
import {useSelector} from 'react-redux';

const UserListCard = ({
  role,
  appointment,
  onPressContact,
  onPressViewProfile,
  handleRequestEHR,
  handleRevokeEhr,
  handleWritePrescription,
}) => {
  const receiver =
    role === ROLES.doctor ? appointment?.patient : appointment?.doctor;

  const user = useSelector(state => state.auth.user);

  const [visible, setVisible] = React.useState(false);

  const [isEhrAccess, setIsEhrAccess] = React.useState(false);

  const checkEhrAccess = (doctor, id) => {
    if (doctor && doctor.accessList) {
      return doctor.accessList.find(patient => patient._id === id);
    }
  };

  // useEffect(() => {
  //   setIsEhrAccess(checkEhrAccess());
  // }, [receiver])

  const getControls = () => {
    switch (role) {
      case ROLES.patient:
        return (
          <>
            <View style={styles().controls}>
              <Button
                label="View Profile"
                type="filled"
                width="48%"
                height={dimensions.Height / 20}
                marginVertical={dimensions.Height / 1000}
                fontSize={fonts.size.font14}
                onPress={() => onPressViewProfile(receiver?._id)}
              />
              <Button
                label="Contact"
                onPress={() => {
                  onPressContact(receiver);
                }}
                type="filled"
                width="48%"
                height={dimensions.Height / 20}
                marginVertical={dimensions.Height / 1000}
                fontSize={fonts.size.font14}
              />
            </View>
            <View style={styles().controls}>
              <Button
                label="Add Review"
                onPress={() => {
                  setVisible(true);
                }}
                type="filled"
                width={
                  checkEhrAccess(appointment.doctor, appointment.patient._id)
                    ? '48%'
                    : '100%'
                }
                fontSize={fonts.size.font14}
                height={dimensions.Height / 20}
                marginVertical={dimensions.Height / 1000}
              />
              {checkEhrAccess(appointment.doctor, appointment.patient._id) && (
                <Button
                  label="Revoke EHR Access"
                  onPress={() => {
                    handleRevokeEhr(appointment.doctor._id);
                  }}
                  type="filled"
                  width={'48%'}
                  fontSize={fonts.size.font14}
                  height={dimensions.Height / 20}
                  marginVertical={dimensions.Height / 1000}
                />
              )}
            </View>
            <ReviewAddModal
              Visible={visible}
              setModalVisible={setVisible}
              item={receiver}
            />
          </>
        );
      case ROLES.doctor:
        return (
          <>
            <>
              <View style={styles().controls}>
                <Button
                  label="Contact"
                  onPress={() => onPressContact(receiver)}
                  type="filled"
                  width="48%"
                  height={dimensions.Height / 20}
                  marginVertical={dimensions.Height / 1000}
                />
                <Button
                  label="Request EHR"
                  onPress={() => {
                    handleRequestEHR(appointment.patient._id);
                  }}
                  type="filled"
                  width="48%"
                  height={dimensions.Height / 20}
                  marginVertical={dimensions.Height / 1000}
                  isDisabled={checkEhrAccess(
                    appointment.doctor,
                    appointment.patient._id,
                  )}
                />
              </View>
              <View style={styles().controls}>
                <Button
                  label="Write Prescription"
                  onPress={() =>
                    handleWritePrescription(appointment.patient._id)
                  }
                  type="filled"
                  width="48%"
                  height={dimensions.Height / 20}
                  marginVertical={dimensions.Height / 1000}
                  isDisabled={appointment.status.toLowerCase() !== 'completed'}
                />
                <Button
                  label="View Profile"
                  type="filled"
                  width="48%"
                  height={dimensions.Height / 20}
                  marginVertical={dimensions.Height / 1000}
                  onPress={() => onPressViewProfile(receiver?._id)}
                />
              </View>
            </>
          </>
        );
      default:
        return (
          <>
            <Text>Default controls</Text>
          </>
        );
    }
  };

  return (
    <View style={styles(role).container}>
      <View style={styles().informationContainer}>
        <View style={styles().imageContainer}>
          <Image
            source={{
              uri: `${apiEndpoint}files/${receiver?.avatar ? receiver.avatar : 'default.png'}`,
            }}
            style={styles().image}
          />
        </View>
        <View style={styles().informationContent}>
          <View style={styles().information}>
            <Text style={styles().label}>Name:</Text>
            <Text style={styles().value}>
              {receiver?.name ? receiver.name : 'Abdul Moeed'}
            </Text>
          </View>
          <View style={styles().information}>
            <Text style={styles().label}>Appointment Date:</Text>
            <Text style={styles().value}>
              {appointment?.date ? getDate(appointment.date) : '02/02/2021'}
            </Text>
          </View>
          {role === ROLES.patient && (
            <View style={styles().information}>
              <Text style={styles().label}>Speciality:</Text>
              <Text style={styles().value}>
                {receiver?.speciality
                  ? receiver.speciality
                  : 'General Physician'}
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* Controls */}

      <View style={styles().controlsContainer}>{getControls()}</View>
    </View>
  );
};

export default UserListCard;

const styles = role =>
  StyleSheet.create({
    container: {
      width: '100%',
      minHeight: dimensions.Height / 4,
      borderRadius: dimensions.Width / 20,
      backgroundColor:
        role === ROLES.doctor
          ? colors.secondaryMonoChrome100
          : colors.primaryMonoChrome100,
      paddingHorizontal: dimensions.Width / 30,
      paddingVertical: dimensions.Height / 50,
    },

    informationContainer: {
      width: '100%',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
    },

    imageContainer: {
      width: dimensions.Width / 4,
      height: dimensions.Width / 4,
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      borderRadius: dimensions.Width / 10,
      shadowColor: colors.secondary1,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 20,
    },
    image: {
      width: dimensions.Width / 3.5,
      height: dimensions.Width / 3.5,
    },

    informationContent: {
      width: '65%',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },

    information: {
      width: '100%',
      flexDirection: 'row',
      marginVertical: dimensions.Height / 400,
    },

    label: {
      fontWeight: fonts.weight.semi,
      marginRight: dimensions.Width / 60,
    },

    controls: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      marginVertical: dimensions.Height / 200,
    },
  });

import {View, Text, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

import StaticContainer from '../../../../containers/StaticContainer';
import styles from './styles';
import SearchFilterBar from '../../../../components/shared/SearchFilterBar';
import UserListCard from '../../../../components/shared/UserListCard';

import {getAppointmentsByUserId} from '../../../../services/appointmentServices';

import useCustomApi from '../../../../hooks/useCustomApi';
import Loader from '../../../../components/shared/Loader';
import NotFound from '../../../../components/shared/NotFound';
import { handleEhrRequest, requestEhrAccess } from '../../../../services/ehrServices';
import { useCustomToast } from '../../../../hooks/useCustomToast';

const UsersList = ({navigation}) => {
  const role = useSelector(state => state.role.role);
  const user = useSelector(state => state.auth.user);

  const {showToast} = useCustomToast();

  const [appointments, setAppointments] = useState([]);

  const {callApi, isLoading} = useCustomApi();


  const getAppointments = async () => {
    try {
      // const response = await getAppointmentsByUserId(
      //   `${role.toLowerCase()}=${user._id}`,
      // );

      const data = await callApi(
        getAppointmentsByUserId,
        `${role.toLowerCase()}=${user._id}`,
      );

      console.log(isLoading);

      setAppointments(data.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    

    if (user && role) {
      getAppointments();
    }
  }, [user, role]);

  const navigateToChat = receiver => {
    navigation.navigate('App', {
      screen: 'Chat',
      params: {
        data: receiver._id, //TODO: remove this id as it is only used for testing purpose
        receiver: receiver,
      },
    });
  };


  const navigateToProfile = (id) => {
    
    console.log("ID", id);

    navigation.navigate('App', {
      screen: "ViewProfile",
      params: {
        isViewing: true,
        userId: id
      }
    })  
  }

  const handleRequestEhr = async (patientId) => {
    try{
      const response = await requestEhrAccess(patientId);
      showToast(response.data.message, "success");
    }catch(err) {
      showToast("Error requesting EHR", "danger");
    }finally {  
    }
  }

  const handleRevokeEhr = async (doctorId) => {
    
    const data = {
        status: "Revoke",
        doctorId,
    }
    try {
        await handleEhrRequest(data);
        showToast("Ehr access revoked", "success");
    } catch(err) {
        console.log(err);
        showToast(err.response.data.message, 'danger');
    } finally {
        getAppointments();
      }
}


  return (
    <>
      <StaticContainer isHorizontalPadding={false}>
        <View style={styles.container}>
          <View style={styles.filterSearchContainer}>
            <SearchFilterBar role={role} />
          </View>

          <>
            {isLoading ? (
              <Loader title={'Loading users....'} />
            ) : appointments.length > 0 ? (
              <ScrollView
                contentContainerStyle={styles.scrollContainerContent}
                style={styles.scrollContainer}>
                <View style={styles.appointmentsContainer}>
                  {appointments.length > 0 &&
                    appointments.map(appointment => (
                      <View
                        style={styles.appointmentContainer}
                        key={appointment._id}>
                        <UserListCard
                          role={role}
                          appointment={appointment}
                          onPressContact={navigateToChat}
                          onPressViewProfile={navigateToProfile}
                          handleRequestEHR={handleRequestEhr}
                          handleRevokeEhr={handleRevokeEhr}
                        />
                      </View>
                    ))}
                </View>
              </ScrollView>
            ) : (
              <View style={styles.notFoundContainer}>
                <NotFound
                  title={'No User history Found'}
                  text={'Sorry it seems like there is no user History'}
                  center
                />
              </View>
            )}
          </>
        </View>
      </StaticContainer>
    </>
  );
};

export default UsersList;

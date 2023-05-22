import 'react-native-gesture-handler';
import React from 'react';

import {Text, Alert} from 'react-native';
//import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//import DoctorModalNavigator from './doctor.modal.navigator';
import {NavigationContainer} from '@react-navigation/native';

import PatientTabStack from './patient.tab.navigator';
//Screens
import Support from '../../../screens/shared/Support-communities/Home';
import CommunityDetails from '../../../screens/shared/Support-communities/Community-details';
import Chat from '../../../screens/shared/Telemedicine/Chat';
import OngoingCall from '../../../screens/shared/Telemedicine/Ongoing-call';
import IncomingCall from '../../../screens/shared/Telemedicine/Incoming-call';
import Post from '../../../screens/shared/Support-communities/Post';
import ElectronicHealthRecords from '../../../screens/shared/E-health-records/Home';
import DoctorsList from '../../../screens/patient/Appointment-management/Doctors-list';

import notifee, {EventType, AndroidImportance} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import {useEffect} from 'react';

import {useNavigation} from '@react-navigation/native';
import ProfileManagement from '../../../screens/patient/Profile-management/Home';
import DoctorProfile from '../../../screens/doctor/Profile-management/Home';
import EditProfile from '../../../screens/patient/Profile-management/Edit-Profile';

import SpecialistCategory from '../../../screens/patient/Appointment-management/Specialist-category';
import BookAppointment from '../../../screens/patient/Appointment-management/Book-appointment';
import OnlinePayment from '../../../screens/patient/Appointment-management/Online-payment';
import AppointmentDetails from '../../../screens/shared/Appointment-management/Appointment-details';
import RescheduleAppointment from '../../../screens/shared/Appointment-management/Reschedule-appointment';
import CancelAppointment from '../../../screens/shared/Appointment-management/Cancel-appointment';

import MedicineScheduler from '../../../screens/patient/Medicine-reminder/Medicine-scheduler';
import MedicineDetails from '../../../screens/patient/Medicine-reminder/Medicine-details';
import PrescriptionDetail from '../../../screens/shared/E-health-records/PrescriptionDetail';
import Complaint from '../../../screens/shared/Complaint-desk/Complaint';
import ComplaintDesk from '../../../screens/shared/Complaint-desk/Home';
import {eventEmitter} from '../../../../index.js';
import { authLogout } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import logout from '../../../utils/helpers/logout';
import EhrAccess from '../../../screens/patient/Ehr';
import Notifications from '../../../screens/shared/Notifications';


const Stack = createNativeStackNavigator();

const PatientNavigation = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  useEffect(() => {
    eventEmitter.on('notificationReceived', notification => {
      if (notification?.data?.navigate) {
        navigation.navigate(notification?.data?.navigate, 
          {
            image: notification?.data?.image,
            data: notification?.data?.data,
        });
      }
    });
    
    eventEmitter.on('logout', () => {
      logout(dispatch, authLogout, navigation);
    })
  }, []);
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="PatientTabStack">
      <Stack.Screen name="PatientTabStack" component={PatientTabStack} />
      <Stack.Screen name="PrescriptionDetail" component={PrescriptionDetail} />
      <Stack.Screen name="Support Communities" component={Support} />
      <Stack.Screen name="ComplaintDesk" component={ComplaintDesk} />
      <Stack.Screen name="Complaint" component={Complaint} />
      <Stack.Screen name="CommunityDetails" component={CommunityDetails} />
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="OngoingCall" component={OngoingCall} />
      <Stack.Screen name="IncomingCall" component={IncomingCall} />
      <Stack.Screen name="Post" component={Post} />
      <Stack.Screen name="EHR" component={ElectronicHealthRecords} />
      <Stack.Screen name="DoctorsList" component={DoctorsList} />
      <Stack.Screen name="ProfileManagement" component={ProfileManagement} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="Specialists" component={SpecialistCategory} />
      <Stack.Screen name="BookAppointment" component={BookAppointment} />
      <Stack.Screen name="OnlinePayment" component={OnlinePayment} />
      <Stack.Screen name="Notifications" component={Notifications} />

      <Stack.Screen name="AppointmentDetails" component={AppointmentDetails} />
      <Stack.Screen
        name="RescheduleAppointment"
        component={RescheduleAppointment}
      />
      <Stack.Screen name="CancelAppointment" component={CancelAppointment} />
      <Stack.Screen name="MedicineScheduler" component={MedicineScheduler} />
      <Stack.Screen name="MedicineDetails" component={MedicineDetails} />
      <Stack.Screen name="ViewProfile" component={DoctorProfile} />
      <Stack.Screen name="EhrRequest" component={EhrAccess} />

    </Stack.Navigator>
  );
};

export default PatientNavigation;

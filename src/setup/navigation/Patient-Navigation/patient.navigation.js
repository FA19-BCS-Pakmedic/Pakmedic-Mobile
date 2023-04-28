import 'react-native-gesture-handler';
import React from 'react';

import {Text} from 'react-native';
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
import EditProfile from '../../../screens/patient/Profile-management/Edit-Profile';

import SpecialistCategory from '../../../screens/patient/Appointment-management/Specialist-category';
import BookAppointment from '../../../screens/patient/Appointment-management/Book-appointment';
import OnlinePayment from '../../../screens/patient/Appointment-management/Online-payment';
import AppointmentDetails from '../../../screens/shared/Appointment-management/Appointment-details';
import RescheduleAppointment from '../../../screens/shared/Appointment-management/Reschedule-appointment';
import CancelAppointment from '../../../screens/shared/Appointment-management/Cancel-appointment';

const Stack = createNativeStackNavigator();

const onMessageReceived = async message => {
  notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });
  await notifee.displayNotification(JSON.parse(message.data.notifee));
};

const onBackgroundMessage = navigation => {
  notifee.onBackgroundEvent(async ({type, detail}) => {
    const {notification, pressAction} = detail;

    // Check if the user pressed the "Mark as read" action

    console.log('Inside onBackgroundEvent');
    if (type === EventType.PRESS) {
      // Update external API
      console.log('Pressed Notification');

      if (notification?.data?.navigate) {
        navigation.navigate(notification?.data?.navigate, {
          params: {image: notification?.data?.image},
        });
      }

      // Remove the notification
      await notifee.cancelNotification(notification.id);
    }
  });
};

const PatientNavigation = () => {
  const navigation = useNavigation();

  useEffect(() => {
    messaging().onMessage(onMessageReceived);
    messaging().setBackgroundMessageHandler(onMessageReceived);
    onBackgroundMessage(navigation);
  }, []);
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="PatientTabStack">
      <Stack.Screen name="PatientTabStack" component={PatientTabStack} />
      <Stack.Screen name="Support Communities" component={Support} />
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
      <Stack.Screen name="AppointmentDetails" component={AppointmentDetails} />
      <Stack.Screen
        name="RescheduleAppointment"
        component={RescheduleAppointment}
      />
      <Stack.Screen name="CancelAppointment" component={CancelAppointment} />
    </Stack.Navigator>
  );
};

export default PatientNavigation;

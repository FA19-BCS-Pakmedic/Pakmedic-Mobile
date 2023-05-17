import 'react-native-gesture-handler';
import React from 'react';

import {Text} from 'react-native';
//import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import DoctorModalNavigator from './doctor.modal.navigator';
import {NavigationContainer} from '@react-navigation/native';

import DoctorTabStack from './doctor.tab.navigator';
//Screens
import Support from '../../../screens/shared/Support-communities/Home';
import ComplaintDesk from '../../../screens/shared/Complaint-desk/Home';
import Complaint from '../../../screens/shared/Complaint-desk/Complaint';
import CommunityDetails from '../../../screens/shared/Support-communities/Community-details';
import Post from '../../../screens/shared/Support-communities/Post';
import ProfileManagement from '../../../screens/doctor/Profile-management/Home';
import EditProfile from '../../../screens/doctor/Profile-management/Edit-Profile';
import Chat from '../../../screens/shared/Telemedicine/Chat';
import OngoingCall from '../../../screens/shared/Telemedicine/Ongoing-call';
import IncomingCall from '../../../screens/shared/Telemedicine/Incoming-call';

import Retinopathy from '../../../screens/doctor/Assistant/Retinopathy';
import Xray from '../../../screens/doctor/Assistant/Xray';
import RiskOfDeath from '../../../screens/doctor/Assistant/RiskOfDeath';
import CompoundRecommendation from '../../../screens/doctor/Assistant/CompoundRecommendation';
import CompoundResults from '../../../screens/doctor/Assistant/CompoundRecommendation/CompoundResults';

import BrainMri from '../../../screens/doctor/Assistant/BrainMri';

import notifee, {EventType, AndroidImportance} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import {useEffect} from 'react';

import {useNavigation} from '@react-navigation/native';
import ResultsScreen from '../../../screens/doctor/Assistant/ResultsScreen';

import Notifications from '../../../screens/shared/Notifications';
import RescheduleAppointment from '../../../screens/shared/Appointment-management/Reschedule-appointment';
import CancelAppointment from '../../../screens/shared/Appointment-management/Cancel-appointment';
import AppointmentDetails from '../../../screens/shared/Appointment-management/Appointment-details';

import PrescriptionManagement from '../../../screens/doctor/Prescription/Prescription-management';
import FinanceHome from '../../../screens/shared/Finance/Home';

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
        navigation.navigate('App', {
          screen: notification?.data?.navigate,
          params: {image: notification?.data?.image},
        });
      }

      // Remove the notification
      await notifee.cancelNotification(notification.id);
    }
  });
};

const DoctorNavigation = () => {
  const navigation = useNavigation();
  useEffect(() => {
    messaging().onMessage(onMessageReceived);
    messaging().setBackgroundMessageHandler(onMessageReceived);
    onBackgroundMessage(navigation);
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="PrescriptionManagement">
      <Stack.Screen name="DoctorTabStack" component={DoctorTabStack} />
      <Stack.Screen name="FinanceHome" component={FinanceHome} />
      <Stack.Screen name="Support Communities" component={Support} />
      <Stack.Screen name="CommunityDetails" component={CommunityDetails} />
      <Stack.Screen name="ComplaintDesk" component={ComplaintDesk} />
      <Stack.Screen name="Complaint" component={Complaint} />
      <Stack.Screen name="ProfileManagement" component={ProfileManagement} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="Retinopathy" component={Retinopathy} />
      <Stack.Screen name="Xray" component={Xray} />
      <Stack.Screen name="RiskOfDeath" component={RiskOfDeath} />
      <Stack.Screen
        name="CompoundRecommendation"
        component={CompoundRecommendation}
      />
      <Stack.Screen name="CompoundResults" component={CompoundResults} />
      <Stack.Screen name="ResultsScreen" component={ResultsScreen} />
      <Stack.Screen name="BrainMri" component={BrainMri} />
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="OngoingCall" component={OngoingCall} />
      <Stack.Screen name="IncomingCall" component={IncomingCall} />
      <Stack.Screen name="Post" component={Post} />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="AppointmentDetails" component={AppointmentDetails} />
      <Stack.Screen
        name="RescheduleAppointment"
        component={RescheduleAppointment}
      />
      <Stack.Screen
        name="PrescriptionManagement"
        component={PrescriptionManagement}
      />
      <Stack.Screen name="CancelAppointment" component={CancelAppointment} />
    </Stack.Navigator>
  );
};

export default DoctorNavigation;

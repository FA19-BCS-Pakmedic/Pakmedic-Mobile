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
import CommunityDetails from '../../../screens/shared/Support-communities/Community-details';
import Post from '../../../screens/shared/Support-communities/Post';
import ProfileManagement from '../../../screens/doctor/Profile-management/Home';
import EditProfile from '../../../screens/patient/Profile-management/Edit-Profile';
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

const Stack = createNativeStackNavigator();

const onMessageReceived = async message => {
  notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    importance: AndroidImportance.HIGH,
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

      navigation.navigate('App', {
        screen: 'Xray',
      });

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
      initialRouteName="DoctorTabStack">
      <Stack.Screen name="DoctorTabStack" component={DoctorTabStack} />
      <Stack.Screen name="Support Communities" component={Support} />
      <Stack.Screen name="CommunityDetails" component={CommunityDetails} />
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
      <Stack.Screen name="BrainMri" component={BrainMri} />
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="OngoingCall" component={OngoingCall} />
      <Stack.Screen name="IncomingCall" component={IncomingCall} />
      <Stack.Screen name="Post" component={Post} />
    </Stack.Navigator>
  );
};

export default DoctorNavigation;

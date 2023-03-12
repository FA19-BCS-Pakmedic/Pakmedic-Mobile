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

const Stack = createNativeStackNavigator();

const PatientNavigation = () => {
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
    </Stack.Navigator>
  );
};

export default PatientNavigation;

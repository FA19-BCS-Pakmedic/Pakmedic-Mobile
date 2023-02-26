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
import ProfileManagement from '../../../screens/doctor/Profile-management/Home';

const Stack = createNativeStackNavigator();

const DoctorNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="DoctorTabStack">
      <Stack.Screen name="DoctorTabStack" component={DoctorTabStack} />
      <Stack.Screen name="Support Communities" component={Support} />
      <Stack.Screen name="CommunityDetails" component={CommunityDetails} />
      <Stack.Screen name="ProfileManagement" component={ProfileManagement} />
    </Stack.Navigator>
  );
};

export default DoctorNavigation;

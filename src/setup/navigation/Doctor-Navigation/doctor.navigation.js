import 'react-native-gesture-handler';
import React from 'react';

import {Text} from 'react-native';
//import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import DoctorTabStack from './doctor.tab.navigator';
import DoctorModalNavigator from './doctor.modal.navigator';

const Stack = createNativeStackNavigator();

const DoctorNavigation = () => {
  return (
    <>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="DoctorTabStack">
        <Stack.Screen name="DoctorTabStack" component={DoctorTabStack} />
        <Stack.Screen
          name="DoctorModalNavigator"
          component={DoctorModalNavigator}
        />
      </Stack.Navigator>
    </>
  );
};

export default DoctorNavigation;

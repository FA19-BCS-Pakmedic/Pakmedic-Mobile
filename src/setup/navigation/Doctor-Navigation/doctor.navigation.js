import 'react-native-gesture-handler';
import React from 'react';

import {Text} from 'react-native';
import Colors from '../../../utils/styles/themes/colors';

//ICONS
import HomeIcon from '../../../assets/svgs/homeIcon.svg';
// import ChatBotIcon from '../../../assets/svgs/chatBotIcon.svg';
import AppointmentIcon from '../../../assets/svgs/AppointmentIcon.svg';
// import TelemedicineIcon from '../../../assets/svgs/telemedicineIcon.svg';
// import MenuIcon from '../../../assets/svgs/menuIcon.svg';

//Screens
import Dashboard from '../../../screens/doctor/Authentication/Dashboard';
// import Assistant from '../../../src/screens/doctor/Assistant';
import Appointment from '../../../screens/doctor/Appointment-management/Appointments';
// import Telemedicine from '../../../screens/doctor/Telemedicine/Patients-list';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

const DoctorTabStack = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={({route, navigation}) => ({
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'HomeScreen') {
            return focused ? (
              <HomeIcon
                width={25}
                height={25}
                fill={Colors.primaryMonoChrome300}
              />
            ) : (
              <HomeIcon
                width={25}
                height={25}
                fill={Colors.secondaryMonoChrome300}
              />
            );
          }
          if (route.name === 'AppointmentScreen') {
            return focused ? (
              <AppointmentIcon
                width={25}
                height={25}
                fill={Colors.primaryMonoChrome300}
              />
            ) : (
              <AppointmentIcon
                width={25}
                height={25}
                fill={Colors.secondaryMonoChrome300}
              />
            );
          }
        },
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 50,
          backgroundColor: Colors.secondaryMonoChrome300,
        },
      })}>
      <Tab.Screen name="HomeScreen" component={Dashboard} />
      <Tab.Screen name="AppointmentScreen" component={Appointment} />
    </Tab.Navigator>
  );
};
export default DoctorTabStack;

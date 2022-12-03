import 'react-native-gesture-handler';
import React from 'react';

import {Text, StyleSheet} from 'react-native';

//ICONS
import HomeIcon from '../../../assets/svgs/homeIcon.svg';
import ChatBotIcon from '../../../assets/svgs/chatBotIcon.svg';
import AppointmentIcon from '../../../assets/svgs/AppointmentIcon.svg';
import TelemedicineIcon from '../../../assets/svgs/telemedicineIcon.svg';
import MenuIcon from '../../../assets/svgs/menuIcon.svg';

//Screens
import Home from '../../../screens/doctor/Authentication/Dashboard';
import Assistant from '../../../screens/doctor/Assistant/Assistant-home';
import Appointment from '../../../screens/doctor/Appointment-management/Appointments';
import Telemedicine from '../../../screens/doctor/Telemedicine/Patients-list';
import Modal from './doctor.modal.navigator';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

//theme
import dimensions from '../../../utils/styles/themes/dimensions';
import fonts from '../../../utils/styles/themes/fonts';
import Colors from '../../../utils/styles/themes/colors';

const Tab = createBottomTabNavigator();

const DoctorTabStack = () => {
  const [isModalVisible, setModalVisible] = React.useState(false);
  return (
    <>
      <Tab.Navigator
        initialRouteName="HomeScreen"
        screenOptions={({route, navigation}) => ({
          tabBarHideOnKeyboard: true,
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === 'HomeScreen') {
              return (
                <HomeIcon
                  width={dimensions.Width / 15}
                  height={dimensions.Height / 15}
                />
              );
            } else if (route.name === 'AssistantScreen') {
              return (
                <ChatBotIcon
                  width={dimensions.Width / 15}
                  height={dimensions.Height / 15}
                />
              );
            } else if (route.name === 'AppointmentScreen') {
              return (
                <AppointmentIcon
                  width={dimensions.Width / 15}
                  height={dimensions.Height / 15}
                />
              );
            } else if (route.name === 'TelemedicineScreen') {
              return (
                <TelemedicineIcon
                  width={dimensions.Width / 15}
                  height={dimensions.Height / 15}
                />
              );
            } else if (route.name === 'MenuScreen') {
              return (
                <MenuIcon
                  width={dimensions.Width / 15}
                  height={dimensions.Height / 15}
                />
              );
            }
          },
          tabBarLabel: () => {
            if (route.name === 'HomeScreen') {
              return <Text style={styles.labelText}>Home</Text>;
            }
            if (route.name === 'AppointmentScreen') {
              return <Text style={styles.labelText}>Appointments</Text>;
            }
            if (route.name === 'TelemedicineScreen') {
              return <Text style={styles.labelText}>Telemedicine</Text>;
            }
            if (route.name === 'AssistantScreen') {
              return <Text style={styles.labelText}>Assistant</Text>;
            }
            if (route.name === 'MenuScreen') {
              return <Text style={styles.labelText}>Menu</Text>;
            }
          },
          tabBarStyle: {
            height: dimensions.Height / 12,
            backgroundColor: Colors.secondaryMonoChrome100,
          },
          tabBarActiveBackgroundColor: Colors.secondaryMonoChrome300,
        })}>
        <Tab.Screen name="HomeScreen" component={Home} />
        <Tab.Screen name="AssistantScreen" component={Assistant} />
        <Tab.Screen name="AppointmentScreen" component={Appointment} />
        <Tab.Screen name="TelemedicineScreen" component={Telemedicine} />
        <Tab.Screen
          name="MenuScreen"
          component={Home}
          listeners={({navigation}) => ({
            tabPress: e => {
              e.preventDefault();
              setModalVisible(true);
            },
          })}
        />
        {/* <Tab.Screen name="MenuScreen" component={Modal}/> */}
      </Tab.Navigator>
      {/* <Modal Visible={isModalVisible} /> */}
    </>
  );
};

const styles = StyleSheet.create({
  labelText: {
    fontSize: fonts.size.font8,
    marginBottom: dimensions.Height / 100,
    color: Colors.secondary1,
  },
});
export default DoctorTabStack;

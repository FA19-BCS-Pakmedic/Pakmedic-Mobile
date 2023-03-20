import 'react-native-gesture-handler';
import React from 'react';

import {View, Text, StyleSheet} from 'react-native';

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

import PopupAlerts from '../../../components/shared/PopupAlerts';

//theme
import dimensions from '../../../utils/styles/themes/dimensions';
import fonts from '../../../utils/styles/themes/fonts';
import Colors from '../../../utils/styles/themes/colors';
import UsersList from '../../../screens/shared/Telemedicine/Users-list';

const Tab = createBottomTabNavigator();

const DoctorTabStack = props => {
  const [isModalVisible, setModalVisible] = React.useState(false);
  return (
    <>
      <Tab.Navigator
        initialRouteName="HomeScreen"
        screenOptions={({route, navigation}) => ({
          tabBarHideOnKeyboard: true,
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => {
            if (route.name === 'HomeScreen') {
              return focused ? (
                <View style={styles.activeStyle}>
                  <HomeIcon
                    width={dimensions.Width / 15}
                    height={dimensions.Height / 15}
                  />
                  <Text style={styles.labelText}>Home</Text>
                </View>
              ) : (
                <View style={styles.inactiveStyle}>
                  <HomeIcon
                    width={dimensions.Width / 15}
                    height={dimensions.Height / 15}
                  />
                  <Text style={styles.labelText}>Home</Text>
                </View>
              );
            } else if (route.name === 'AssistantScreen') {
              return focused ? (
                <View style={styles.activeStyle}>
                  <ChatBotIcon
                    width={dimensions.Width / 15}
                    height={dimensions.Height / 15}
                  />
                  <Text style={styles.labelText}>Assistant</Text>
                </View>
              ) : (
                <View style={styles.inactiveStyle}>
                  <ChatBotIcon
                    width={dimensions.Width / 15}
                    height={dimensions.Height / 15}
                  />
                  <Text style={styles.labelText}>Assistant</Text>
                </View>
              );
            } else if (route.name === 'AppointmentScreen') {
              return focused ? (
                <View style={styles.activeStyle}>
                  <AppointmentIcon
                    width={dimensions.Width / 15}
                    height={dimensions.Height / 15}
                  />
                  <Text style={styles.labelText}>Appointment</Text>
                </View>
              ) : (
                <View style={styles.inactiveStyle}>
                  <AppointmentIcon
                    width={dimensions.Width / 15}
                    height={dimensions.Height / 15}
                  />
                  <Text style={styles.labelText}>Appointment</Text>
                </View>
              );
            } else if (route.name === 'TelemedicineScreen') {
              return focused ? (
                <View style={styles.activeStyle}>
                  <TelemedicineIcon
                    width={dimensions.Width / 15}
                    height={dimensions.Height / 15}
                  />
                  <Text style={styles.labelText}>Telemedicine</Text>
                </View>
              ) : (
                <View style={styles.inactiveStyle}>
                  <TelemedicineIcon
                    width={dimensions.Width / 15}
                    height={dimensions.Height / 15}
                  />
                  <Text style={styles.labelText}>Telemedicine</Text>
                </View>
              );
            } else if (route.name === 'MenuScreen') {
              return focused ? (
                <View style={styles.activeStyle}>
                  <MenuIcon
                    width={dimensions.Width / 15}
                    height={dimensions.Height / 15}
                  />
                  <Text style={styles.labelText}>Menu</Text>
                </View>
              ) : (
                <View style={styles.inactiveStyle}>
                  <MenuIcon
                    width={dimensions.Width / 15}
                    height={dimensions.Height / 15}
                  />
                  <Text style={styles.labelText}>Menu</Text>
                </View>
              );
            }
          },
          tabBarShowLabel: false,
          tabBarStyle: {
            height: dimensions.Height / 12,
            backgroundColor: Colors.secondaryMonoChrome100,
            borderTopWidth: 0,
          },
          //tabBarActiveBackgroundColor: Colors.secondaryMonoChrome300,
        })}>
        <Tab.Screen name="HomeScreen" component={Home} />
        <Tab.Screen name="AssistantScreen" component={Assistant} />
        <Tab.Screen name="AppointmentScreen" component={Appointment} />
        <Tab.Screen name="TelemedicineScreen" component={UsersList} />
        <Tab.Screen
          name="MenuScreen"
          component={Home}
          listeners={() => ({
            tabPress: e => {
              e.preventDefault();
              setModalVisible(true);
            },
          })}
        />
        {/* <Tab.Screen name="MenuScreen" component={Modal}/> */}
      </Tab.Navigator>
      <Modal
        Visible={isModalVisible}
        setModalVisible={setModalVisible}
        {...props}
      />
    </>
  );
};

const styles = StyleSheet.create({
  labelText: {
    fontSize: 9,
    marginBottom: dimensions.Height * 0.01,
    color: Colors.secondary1,
  },
  activeStyle: {
    justifyContent: 'space-around',
    alignItems: 'center',
    width: dimensions.Width / 6,
    height: dimensions.Height / 13,
    backgroundColor: Colors.secondaryMonoChrome500,
    borderRadius: 5,
    elevation: 5,
    padding: dimensions.Height / 200,
  },
  inactiveStyle: {
    justifyContent: 'space-around',
    alignItems: 'center',
    width: dimensions.Width / 6,
    height: dimensions.Height / 13,
    padding: dimensions.Height / 200,
  },
});
export default DoctorTabStack;

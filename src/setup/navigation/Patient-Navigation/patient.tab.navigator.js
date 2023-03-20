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
import Home from '../../../screens/patient/Authentication/Dashboard';
import Chatbot from '../../../screens/patient/Chatbot';
import Appointment from '../../../screens/patient/Appointment-management/Book-appointment';
import Telemedicine from '../../../screens/patient/Labs/Home';
import Modal from './patient.modal.navigator';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

//theme
import dimensions from '../../../utils/styles/themes/dimensions';
import fonts from '../../../utils/styles/themes/fonts';
import Colors from '../../../utils/styles/themes/colors';
import {useNavigation} from '@react-navigation/native';
import UsersList from '../../../screens/shared/Telemedicine/Users-list';

const Tab = createBottomTabNavigator();

const PatientTabStack = props => {
  const [isModalVisible, setModalVisible] = React.useState(false);

  const navigation = useNavigation();

  const navigateToTelemedicine = () => {
    navigation.navigate('App', {screen: 'TelemedicineScreen'});
  };

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
            } else if (route.name === 'ChatbotScreen') {
              return focused ? (
                <View style={styles.activeStyle}>
                  <ChatBotIcon
                    width={dimensions.Width / 15}
                    height={dimensions.Height / 15}
                  />
                  <Text style={styles.labelText}>Chatbot</Text>
                </View>
              ) : (
                <View style={styles.inactiveStyle}>
                  <ChatBotIcon
                    width={dimensions.Width / 15}
                    height={dimensions.Height / 15}
                  />
                  <Text style={styles.labelText}>Chatbot</Text>
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
                <View
                  style={styles.activeStyle}
                  onPress={navigateToTelemedicine}>
                  <TelemedicineIcon
                    width={dimensions.Width / 15}
                    height={dimensions.Height / 15}
                  />
                  <Text style={styles.labelText}>Telemedicine</Text>
                </View>
              ) : (
                <View
                  style={styles.inactiveStyle}
                  onPress={navigateToTelemedicine}>
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
            display: route.name === 'ChatbotScreen' ? 'none' : 'flex',
            height: dimensions.Height / 12,
            backgroundColor: Colors.primaryMonoChrome100,
          },
          //tabBarActiveBackgroundColor: Colors.secondaryMonoChrome300,
        })}>
        <Tab.Screen name="HomeScreen" component={Home} />
        <Tab.Screen name="ChatbotScreen" component={Chatbot} />
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
    marginBottom: dimensions.Height / 100,
    color: Colors.secondary1,
  },
  activeStyle: {
    justifyContent: 'space-around',
    alignItems: 'center',
    width: dimensions.Width / 6,
    height: dimensions.Height / 13,
    backgroundColor: Colors.primaryMonoChrome300,
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
export default PatientTabStack;

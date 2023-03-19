// app entry point

import AppNavigation from './src/setup/navigation/app.navigation';

// your entry point
import {MenuProvider} from 'react-native-popup-menu';
import SplashScreen from 'react-native-splash-screen';

//redux toolkit store
import {Provider} from 'react-redux';
import {store} from './src/setup/redux/store';
import CallHome from './src/screens/shared/Telemedicine/Home';
import {NavigationContainer} from '@react-navigation/native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import History from './src/screens/shared/Telemedicine/History';
import {voximplant} from './src/services/voxServices';
import {Voximplant} from 'react-native-voximplant';
import {useEffect} from 'react';
import IncomingCall from './src/screens/shared/Telemedicine/Incoming-call';
import OngoingCall from './src/screens/shared/Telemedicine/Ongoing-call';
import calls from './src/utils/helpers/Store';
import ElectronicHealthRecords from './src/screens/shared/E-health-records/Home';

import notifee, {EventType} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';

const StackNavigate = createNativeStackNavigator();

let token = null;
const registerDeviceForMessaging = async () => {
  await messaging().registerDeviceForRemoteMessages();
  token = await messaging().getToken();
  console.log(token);

  // Save the token
  // await postToApi('/users/1234/tokens', { token });
};

const App = () => {
  useEffect(() => {
    registerDeviceForMessaging();
  }, []);

  https: return (
    <Provider store={store}>
      <MenuProvider>
        <AppNavigation />
      </MenuProvider>
    </Provider>
    // <NavigationContainer>
    //   <StackNavigate.Navigator initialRouteName="Home">
    //     <StackNavigate.Screen name="Home" component={CallHome} />
    //     <StackNavigate.Screen name="History" component={History} />
    //     <StackNavigate.Screen name="IncomingCall" component={IncomingCall} />
    //     <StackNavigate.Screen name="OngoingCall" component={OngoingCall} />
    //   </StackNavigate.Navigator>
    // </NavigationContainer>
  );
};

export default App;

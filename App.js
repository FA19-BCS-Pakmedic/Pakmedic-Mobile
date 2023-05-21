// app entry point

import AppNavigation from './src/setup/navigation/app.navigation';

// your entry point
import {MenuProvider} from 'react-native-popup-menu';
import SplashScreen from 'react-native-splash-screen';

import {enableLatestRenderer} from 'react-native-maps';

//redux toolkit store
import {Provider} from 'react-redux';
import {store} from './src/setup/redux/store';
import CallHome from './src/screens/shared/Telemedicine/Home';
import {NavigationContainer} from '@react-navigation/native';
import {ToastProvider} from 'react-native-toast-notifications';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import History from './src/screens/shared/Telemedicine/History';
import {voximplant} from './src/services/voxServices';
import {Voximplant} from 'react-native-voximplant';
import {useEffect} from 'react';
import IncomingCall from './src/screens/shared/Telemedicine/Incoming-call';
import OngoingCall from './src/screens/shared/Telemedicine/Ongoing-call';
import calls from './src/utils/helpers/Store';
import ElectronicHealthRecords from './src/screens/shared/E-health-records/Home';

import {Provider as PaperProvider, MD2LightTheme} from 'react-native-paper';

import {Alert} from 'react-native';

import notifee, {EventType} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';

// import {register} from './src/services/notificationService';
import deviceStorage from './src/utils/helpers/deviceStorage';
import Toast from 'react-native-toast-notifications';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {googleConfig} from './src/utils/helpers/googleConfig';

const StackNavigate = createNativeStackNavigator();

const registerDeviceForMessaging = async () => {
  await messaging().registerDeviceForRemoteMessages();
  const token = await messaging().getToken();

  await deviceStorage.saveItem('FCMToken', token);

  console.log('FCM Token: ', token);
  // Register the token
  // await register(token);
};

enableLatestRenderer();

const battery = async () => {
  const batteryOptimizationEnabled =
    await notifee.isBatteryOptimizationEnabled();
  if (batteryOptimizationEnabled) {
    // 2. ask your users to disable the feature
    Alert.alert(
      'Restrictions Detected',
      'To ensure notifications are delivered, please disable battery optimization for the app.',
      [
        // 3. launch intent to navigate the user to the appropriate screen
        {
          text: 'OK, open settings',
          onPress: async () => await notifee.openBatteryOptimizationSettings(),
        },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  }
};

const power = async () => {
  const powerManagerInfo = await notifee.getPowerManagerInfo();
  if (powerManagerInfo.activity) {
    // 2. ask your users to adjust their settings
    Alert.alert(
      'Restrictions Detected',
      'To ensure notifications are delivered, please adjust your settings to prevent the app from being killed',
      [
        // 3. launch intent to navigate the user to the appropriate screen
        {
          text: 'OK, open settings',
          onPress: async () => await notifee.openPowerManagerSettings(),
        },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  }
};

const App = () => {
  useEffect(() => {
    battery();
    power();
    registerDeviceForMessaging();
    GoogleSignin.configure(googleConfig);
  }, []);

  https: return (
    <Provider store={store}>
      <MenuProvider>
        <PaperProvider theme={MD2LightTheme}>
          <ToastProvider>
            <AppNavigation />
          </ToastProvider>
        </PaperProvider>
      </MenuProvider>
    </Provider>
  );
};

export default App;

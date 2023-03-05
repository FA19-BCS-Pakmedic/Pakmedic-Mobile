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

const StackNavigate = createNativeStackNavigator();

const App = () => {
  SplashScreen.hide();


  useEffect(() => {
    // voximplant.on(Voximplant.ClientEvents.IncomingCall, incomingCallEvent => {
    //   calls.set(incomingCallEvent.call.callId, incomingCallEvent.call);
    //   navigation.navigate('IncomingCall', {
    //     callId: incomingCallEvent.call.callId,
    //   });
    // });

    voximplant.on(Voximplant.ClientEvents.ConnectionEstablished, event => {
      console.log('Connection established');
    });

    voximplant.on(Voximplant.ClientEvents.AuthResult, event => {
      console.log('Auth result');
      console.log(event);
    });

    return () => {
      voximplant.off(Voximplant.ClientEvents.AuthResult);
      voximplant.off(Voximplant.ClientEvents.ConnectionEstablished);
    };
  });

  https: return (
    // <Provider store={store}>
    //   <MenuProvider>
    //     <AppNavigation />
    //   </MenuProvider>
    // </Provider>
    <NavigationContainer>
      <StackNavigate.Navigator initialRouteName="Home">
        <StackNavigate.Screen name="Home" component={CallHome} />
        <StackNavigate.Screen name="History" component={History} />
        <StackNavigate.Screen name="IncomingCall" component={IncomingCall} />
        <StackNavigate.Screen name="OnCall" component={OngoingCall} />
      </StackNavigate.Navigator>
    </NavigationContainer>
  );
};

export default App;

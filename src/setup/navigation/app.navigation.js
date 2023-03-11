import {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AnimatedSplash from 'react-native-animated-splash-screen';
import SplashScreen from 'react-native-splash-screen';
import RootNavigation from './root.navigation';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

import {googleConfig} from '../../utils/helpers/googleConfig';
import ProfileManagement from '../../screens/doctor/Profile-management/Home';
import EditProfile from '../../screens/patient/Profile-management/Edit-Profile';

import {useSelector, useDispatch} from 'react-redux';

import {voximplant} from '../../services/voxServices';
import {Voximplant} from 'react-native-voximplant';
import deviceStorage from '../../utils/helpers/deviceStorage';
import calls from '../../utils/helpers/Store';

import {useNavigation} from '@react-navigation/native';

const AppNavigation = () => {
  const [isLoading, setIsLoading] = useState(true);

  // const navigation = useNavigation();

  useEffect(() => {
    GoogleSignin.configure({...googleConfig});
    SplashScreen.hide();
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  // useEffect(() => {
  //   voximplant.on(Voximplant.ClientEvents.IncomingCall, incomingCallEvent => {
  //     calls.set(incomingCallEvent.call.callId, incomingCallEvent.call);
  //     navigation.navigate('IncomingCall', {
  //       callId: incomingCallEvent.call.callId,
  //     });
  //   });

  //   voximplant.on(Voximplant.ClientEvents.ConnectionEstablished, event => {
  //     console.log('Connection established');
  //   });

  //   voximplant.on(Voximplant.ClientEvents.AuthResult, event => {
  //     console.log('Auth result');
  //     console.log(event);

  //   });

  //   return () => {
  //     voximplant.off(Voximplant.ClientEvents.AuthResult);
  //     voximplant.off(Voximplant.ClientEvents.ConnectionEstablished);
  //     voximplant.off(Voximplant.ClientEvents.IncomingCall);
  //   };
  // });

  return (
    <AnimatedSplash
      isLoaded={!isLoading}
      logoImage={require('../../assets/images/Logo.png')}
      backgroundColor={'#FFFFFF'}
      logoHeight={200}
      logoWidth={200}>
      <NavigationContainer>
        <RootNavigation />
      </NavigationContainer>
    </AnimatedSplash>
  );
};

export default AppNavigation;

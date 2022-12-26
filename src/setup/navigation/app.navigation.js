import {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AnimatedSplash from 'react-native-animated-splash-screen';
import SplashScreen from 'react-native-splash-screen';
import RootNavigation from './root.navigation';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

import {googleConfig} from '../../utils/helpers/googleConfig';
import ProfileManagement from '../../screens/doctor/Profile-management/Home';

const AppNavigation = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    GoogleSignin.configure({...googleConfig});
    SplashScreen.hide();
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    // <AnimatedSplash
    //   isLoaded={!isLoading}
    //   logoImage={require('../../assets/images/Logo.png')}
    //   backgroundColor={'#FFFFFF'}
    //   logoHeight={200}
    //   logoWidth={200}>
    <NavigationContainer>
      {/* <RootNavigation /> */}
      <ProfileManagement />
    </NavigationContainer>
    // </AnimatedSplash>
  );
};

export default AppNavigation;

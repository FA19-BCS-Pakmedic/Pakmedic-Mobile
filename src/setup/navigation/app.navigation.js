import {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AnimatedSplash from 'react-native-animated-splash-screen';
import SplashScreen from 'react-native-splash-screen';
import RootNavigation from './root.navigation';

import ProfileManagement from '../../screens/doctor/Profile-management/Home';
import EditProfile from '../../screens/patient/Profile-management/Edit-Profile';

import {useSelector, useDispatch} from 'react-redux';

const AppNavigation = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    SplashScreen.hide();
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <AnimatedSplash
      isLoaded={!isLoading}
      logoImage={require('../../assets/images/Logo.png')}
      backgroundColor={'#FFFFFF'}
      logoHeight={200}
      logoWidth={200}>
      <NavigationContainer
        theme={{
          colors: {
            background: '#FFFFFF',
          },
        }}
        style={{backgroundColor: '#FFFFFF'}}>
        <RootNavigation />
        {/* <EditProfile /> */}
        {/* <ProfileManagement /> */}
      <NavigationContainer>
        <RootNavigation />
      </NavigationContainer>
    </AnimatedSplash>
  );
};

export default AppNavigation;

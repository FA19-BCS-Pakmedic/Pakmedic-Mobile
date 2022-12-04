import {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AnimatedSplash from 'react-native-animated-splash-screen';
import SplashScreen from 'react-native-splash-screen';
import RootNavigation from './root.navigation';

const AppNavigation = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    SplashScreen.hide();
    setTimeout(() => {
      setIsLoaded(true);
    }, 1000);
  });

  // return isLoaded ? (
  //   <NavigationContainer>
  //     <RootNavigation />
  //   </NavigationContainer>
  // ) : (
  //   <AnimatedSplash
  //     translucent={true}
  //     isLoaded={isLoaded}
  //     logoImage={require('../../assets/images/Logo.png')}
  //     backgroundColor={'#FFFFFF'}
  //     logoHeight={200}
  //     logoWidth={200}></AnimatedSplash>
  // );

  return (
    <NavigationContainer>
      <RootNavigation />
    </NavigationContainer>
  );
};

export default AppNavigation;

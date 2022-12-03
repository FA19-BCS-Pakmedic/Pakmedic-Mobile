//libraries import
import {useEffect, useState, React} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import AnimatedSplash from 'react-native-animated-splash-screen';

// import root navigation
import RootNavigation from './src/setup/navigation/root.navigation';
import OnboardingNavigation from './src/setup/navigation/onboarding.navigation';
// import CompleteProfile from './src/screens/patient/Authentication/Complete-profile';
// import Register from './src/screens/doctor/Authentication/Register';
import Register from './src/screens/patient/Authentication/Register';
import Login from './src/screens/shared/Authentication/Login';
import SplashScreen from 'react-native-splash-screen';
import ForgotPassword from './src/screens/shared/Authentication/Forgot-password';
import OtpVerification from './src/screens/shared/Authentication/OTP-verification';
import SetNewPassword from './src/screens/shared/Authentication/Set-new-password';
import Onboarding from './src/screens/doctor/On-Boarding';
import SupportHome from './src/screens/shared/Support-communities/Home';
import CompleteProfile from './src/screens/patient/Authentication/Complete-profile';

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    SplashScreen.hide();
    setTimeout(() => {
      setIsLoaded(true);
    }, 1000);
  });

  return (
    // <AnimatedSplash
    //   translucent={true}
    //   isLoaded={isLoaded}
    //   logoImage={require('./src/assets/images/Logo.png')}
    //   backgroundColor={'#FFFFFF'}
    //   logoHeight={200}
    //   logoWidth={200}>
    //   <NavigationContainer>
    //     <OnboardingNavigation side="doctor" />
    //   </NavigationContainer>
    // </AnimatedSplash>
    // <NavigationContainer>
    //   <OnboardingNavigation side="doctor" />
    // </NavigationContainer>
    <SafeAreaView style={styles.root}>
      <SupportHome />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;

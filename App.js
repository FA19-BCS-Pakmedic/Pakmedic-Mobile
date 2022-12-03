//libraries import
import {useEffect, useState, React} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import AnimatedSplash from 'react-native-animated-splash-screen';

// import root navigation
import RootNavigation from './src/setup/navigation/root.navigation';
import OnboardingNavigation from './src/setup/navigation/onboarding.navigation';
// import CompleteProfile from './src/screens/patient/Authentication/Complete-profile';
import Register from './src/screens/doctor/Authentication/Register';
// import Register from './src/screens/patient/Authentication/Register';
//import Doctor TabStack
import DoctorNavigation from './src/setup/navigation/Doctor-Navigation/doctor.navigation';
import DoctorTabStack from './src/setup/navigation/Doctor-Navigation/doctor.tab.navigator';
import Login from './src/screens/shared/Authentication/Login';
import SplashScreen from 'react-native-splash-screen';
import ForgotPassword from './src/screens/shared/Authentication/Forgot-password';
import OtpVerification from './src/screens/shared/Authentication/OTP-verification';
import SetNewPassword from './src/screens/shared/Authentication/Set-new-password';
import SupportHome from './src/screens/shared/Support-communities/Home';
import CompleteProfile from './src/screens/patient/Authentication/Complete-profile';
import ChooseRole from './src/screens/shared/ChooseRole';
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
    <NavigationContainer>
      <DoctorTabStack />
    </NavigationContainer>
    // <SafeAreaView style={styles.root}>
    //   <DoctorNavigation />
    // </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {},
});

export default App;

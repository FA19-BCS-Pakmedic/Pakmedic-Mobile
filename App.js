//libraries import
import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

// import root navigation
import RootNavigation from './src/setup/navigation/root.navigation';
import OnboardingNavigation from './src/setup/navigation/onboarding.navigation';
import CompleteProfile from './src/screens/doctor/Authentication/Complete-profile';
import Register from './src/screens/doctor/Authentication/Register';
import Login from './src/screens/shared/Authentication/Login';
import Onboarding from './src/screens/shared/On-Boarding';

const App = () => {
  return (
    <NavigationContainer>
      <OnboardingNavigation />
    </NavigationContainer>
    // <SafeAreaView style={styles.root}>
    //   <Onboarding
    //     screenName="DocOnboarding1"
    //     text="Hassle Free Appointment Booking Facility for Online and In Person
    //         Consultation"
    //     pagination="Pagination1"
    //   />
    // </SafeAreaView>
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

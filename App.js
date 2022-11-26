//libraries import
import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

// import root navigation
import RootNavigation from './src/setup/navigation/root.navigation';
import CompleteProfile from './src/screens/doctor/Authentication/Complete-profile';
import Register from './src/screens/doctor/Authentication/Register';
import Login from './src/screens/shared/Authentication/Login';
import ForgotPassword from './src/screens/shared/Authentication/Forgot-password';
import OtpVerification from './src/screens/shared/Authentication/OTP-verification';

const App = () => {
  return (
    // <NavigationContainer>
    //   <RootNavigation />
    // </NavigationContainer>
    <SafeAreaView style={styles.root}>
      <OtpVerification />
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

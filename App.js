//libraries import
import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

// import root navigation
import RootNavigation from './src/setup/navigation/root.navigation';
import CompleteProfile from './src/screens/doctor/Authentication/Complete-profile';
import Register from './src/screens/doctor/Authentication/Register';

const App = () => {
  return (
    // <NavigationContainer>
    //   <RootNavigation />
    // </NavigationContainer>
    <SafeAreaView style={styles.root}>
      <CompleteProfile />
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

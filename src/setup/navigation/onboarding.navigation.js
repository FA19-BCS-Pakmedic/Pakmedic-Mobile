import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {useEffect} from 'react';

import Onboarding from '../../screens/shared/On-Boarding';
import Onboarding2 from '../../screens/shared/On-Boarding';

const onboardingStack = createNativeStackNavigator();

//stack navigator for onboarding Screens
const OnboardingNavigation = props => {
  return (
    <>
      <onboardingStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="DoctorOnboarding">
        <onboardingStack.Screen name="Onboarding1">
          {props => (
            <Onboarding
              {...props}
              screenName="DocOnboarding1"
              text="Hassle Free Appointment Booking Facility for Online and In Person
            Consultation"
              pagination="Pagination1"
            />
          )}
        </onboardingStack.Screen>
        <onboardingStack.Screen name="Onboarding2">
          {props => (
            <Onboarding
              {...props}
              screenName="DocOnboarding2"
              text="AI Based support for medical Diagnosis and Medical Prognosis"
              pagination="Pagination2"
            />
          )}
        </onboardingStack.Screen>
        <onboardingStack.Screen name="Onboarding3">
          {props => (
            <Onboarding
              {...props}
              screenName="DocOnboarding3"
              text="Lets enjoin hands in a better healthcare future for our Community"
              pagination="Pagination3"
            />
          )}
        </onboardingStack.Screen>
      </onboardingStack.Navigator>
    </>
  );
};

export default OnboardingNavigation;

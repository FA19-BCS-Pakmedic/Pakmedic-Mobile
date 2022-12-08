import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useEffect, useState} from 'react';

import Onboarding from '../../screens/shared/On-Boarding';
import ROLES from '../../utils/constants/ROLES';
import {useSelector} from 'react-redux';

const onboardingStack = createNativeStackNavigator();

const doctorText = [
  'Hassle Free Appointment Booking Facility for Online and In PersonConsultation',
  'AI Based support for medical Diagnosis and Medical Prognosis',
  'Lets enjoin hands in a better healthcare future for our Community',
];

const patientText = [
  'Thousands of Doctors and Experts  to help you with your Health Concerns',
  'Medical Specialty Chatbot to help you find the right healthcare professional',
  'Automated Prescriptions and reminder system to keep all your needs in check',
];

const doctorSide = () => {
  return (
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
            text={doctorText[0]}
            pagination="Pagination1"
          />
        )}
      </onboardingStack.Screen>
      <onboardingStack.Screen name="Onboarding2">
        {props => (
          <Onboarding
            {...props}
            screenName="DocOnboarding2"
            text={doctorText[1]}
            pagination="Pagination2"
          />
        )}
      </onboardingStack.Screen>
      <onboardingStack.Screen name="Onboarding3">
        {props => (
          <Onboarding
            {...props}
            screenName="DocOnboarding3"
            text={doctorText[2]}
            pagination="Pagination3"
          />
        )}
      </onboardingStack.Screen>
    </onboardingStack.Navigator>
  );
};

const patientSide = () => {
  return (
    <onboardingStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="PatientOnboarding">
      <onboardingStack.Screen name="Onboarding1">
        {props => (
          <Onboarding
            {...props}
            screenName="PatOnboarding1"
            text={patientText[0]}
            pagination="Pagination1"
          />
        )}
      </onboardingStack.Screen>
      <onboardingStack.Screen name="Onboarding2">
        {props => (
          <Onboarding
            {...props}
            screenName="PatOnboarding2"
            text={patientText[1]}
            pagination="Pagination2"
          />
        )}
      </onboardingStack.Screen>
      <onboardingStack.Screen name="Onboarding3">
        {props => (
          <Onboarding
            {...props}
            screenName="PatOnboarding3"
            text={patientText[2]}
            pagination="Pagination3"
          />
        )}
      </onboardingStack.Screen>
    </onboardingStack.Navigator>
  );
};

//stack navigator for onboarding Screens
const OnboardingNavigation = () => {
  const role = useSelector(state => state.role.role);

  return role == ROLES.doctor ? doctorSide() : patientSide();
};

export default OnboardingNavigation;

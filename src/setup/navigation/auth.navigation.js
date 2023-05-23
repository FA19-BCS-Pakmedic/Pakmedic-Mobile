import {View, Text} from 'react-native';

import {useCustomToast} from '../../hooks/useCustomToast';

// importing stack navigator
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useDispatch, useSelector} from 'react-redux';

// importing screens
import Login from '../../screens/shared/Authentication/Login';
import DoctorRegister from '../../screens/doctor/Authentication/Register';
import PatientRegister from '../../screens/patient/Authentication/Register';
import DoctorCompleteProfile from '../../screens/doctor/Authentication/Complete-profile';
import PatientCompleteProfile from '../../screens/patient/Authentication/Complete-profile';
import ForgotPassword from '../../screens/shared/Authentication/Forgot-password';
import SetNewPassword from '../../screens/shared/Authentication/Set-new-password';
import OtpVerification from '../../screens/shared/Authentication/OTP-verification';

//import constants
import ROLES from '../../utils/constants/ROLES';

//import helper functions
import deviceStorage from '../../utils/helpers/deviceStorage';
import {useEffect, useState} from 'react';
import {getDoctor} from '../../services/doctorServices';
import {getPatient} from '../../services/patientServices';
import {authSuccess} from '../redux/actions';
import {loginVox} from '../../services/voxServices';
import Loader from '../../components/shared/Loader';

// create stacks
const authStack = createNativeStackNavigator();

// configure screen options for navigation bar
const screenOptions = {
  headerShown: false,
};

//stack navigator for nested register and login screen
const AuthNavigation = ({navigation}) => {
  const role = useSelector(state => state.role.role);
  const [loading, setLoading] = useState(false);
  const {showToast} = useCustomToast();

  const dispatch = useDispatch();

  //useEffect hook to check if the user is already logged in
  useEffect(() => {
    const checkIfLoggedIn = async () => {
      const token = await deviceStorage.loadItem('jwtToken');
      if (token && role) {
        try {
          //getting logged in user data
          setLoading(true);
          const response =
            role === ROLES.doctor
              ? await getDoctor(token)
              : await getPatient(token);

          const user = response.data.data.user;
          if (user) {
            await loginVox(user);
            // setting the global state with the jwt and user information received in the response
            dispatch(
              authSuccess({
                user: response?.data?.data?.user,
                token: token,
              }),
            );

            showToast(response.data.message, response.data.message.includes('warn') ? 'warning': 'success');

            //navigate to user app if the user is logged in
            navigation.replace('App');
          }
        } catch (err) {
          console.log(err);
          showToast(err.response.data.message, 'danger');
          await deviceStorage.deleteItem('jwtToken');
        } finally {
          setLoading(false);
        }
      }
    };
    checkIfLoggedIn();
  }, []);

  return (
    <>
      {loading ? (
        <Loader title={'Loading Data...'} />
      ) : (
        <authStack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="Login">
          <authStack.Screen name="Login" component={Login} />

          {role === ROLES.doctor ? (
            <authStack.Screen name="Register" component={DoctorRegister} />
          ) : (
            <authStack.Screen name="Register" component={PatientRegister} />
          )}
          {role === ROLES.doctor ? (
            <authStack.Screen
              name="CompleteProfile"
              component={DoctorCompleteProfile}
            />
          ) : (
            <authStack.Screen
              name="CompleteProfile"
              component={PatientCompleteProfile}
            />
          )}

          <authStack.Screen name="ForgotPassword" component={ForgotPassword} />
          <authStack.Screen
            name="OtpVerification"
            component={OtpVerification}
          />
          <authStack.Screen name="SetNewPassword" component={SetNewPassword} />
        </authStack.Navigator>
      )}
    </>
  );
};

export default AuthNavigation;

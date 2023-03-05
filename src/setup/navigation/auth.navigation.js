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
import {useEffect} from 'react';
import {getDoctor} from '../../services/doctorServices';
import {getPatient} from '../../services/patientServices';
import {authSuccess} from '../redux/actions';
import {loginVox} from '../../services/voxServices';

// create stacks
const authStack = createNativeStackNavigator();

// configure screen options for navigation bar
const screenOptions = {
  headerShown: false,
};

//stack navigator for nested register and login screen
const AuthNavigation = ({navigation}) => {
  const role = useSelector(state => state.role.role);

  const dispatch = useDispatch();

  //useEffect hook to check if the user is already logged in
  useEffect(() => {
    const checkIfLoggedIn = async () => {
      const token = await deviceStorage.loadItem('jwtToken');
      if (token && role) {
        try {
          //getting logged in user data
          const response =
            role === ROLES.doctor
              ? await getDoctor(token)
              : await getPatient(token);

          if (response.data.data.user) {
            await loginVox('jimmy'); //TODO: replace the value passed with name of the logged in user
            // setting the global state with the jwt and user information received in the response
            dispatch(
              authSuccess({
                user: response?.data?.data?.user,
                token: token,
              }),
            );

            //navigate to user app if the user is logged in
            navigation.replace('App');
          }
        } catch (err) {
          console.log(err);
        }
      }
    };
    checkIfLoggedIn();
  }, []);

  return (
    <authStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="LoginNavigation">
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
      <authStack.Screen name="OtpVerification" component={OtpVerification} />
      <authStack.Screen name="SetNewPassword" component={SetNewPassword} />
    </authStack.Navigator>
  );
};

export default AuthNavigation;

// importing stack navigator
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useState, useEffect} from 'react';

// importing screens
import Login from '../../screens/shared/Authentication/Login';
import DoctorRegister from '../../screens/doctor/Authentication/Register';
import PatientRegister from '../../screens/patient/Authentication/Register';
import ForgotPassword from '../../screens/shared/Authentication/Forgot-password';
import SetNewPassword from '../../screens/shared/Authentication/Set-new-password';
import OtpVerification from '../../screens/shared/Authentication/OTP-verification';

//import constants
import ROLES from '../../utils/constants/ROLES';

//import helper functions
import deviceStorage from '../../utils/helpers/deviceStorage';

// create stacks
const authStack = createNativeStackNavigator();

// configure screen options for navigation bar
const screenOptions = {
  headerShown: false,
};

//stack navigator for nested register and login screen
const AuthNavigation = () => {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const getRole = async () => {
      // let role;
      let role = await deviceStorage?.loadItem('role');
      if (!role) {
        role = 'Patient';
      }

      setRole(role);
    };

    getRole();
  }, []);

  return (
    <authStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="LoginNavigation">
      <authStack.Screen name="Login" component={Login} />
      {/* <authStack.Screen name="Register" component={getRegisterScreen} /> */}
      {role === ROLES.doctor ? (
        <authStack.Screen name="Register" component={DoctorRegister} />
      ) : (
        <authStack.Screen name="Register" component={PatientRegister} />
      )}
      <authStack.Screen name="ForgotPassword" component={ForgotPassword} />
      <authStack.Screen name="OtpVerification" component={OtpVerification} />
      <authStack.Screen name="SetNewPassword" component={SetNewPassword} />
    </authStack.Navigator>
  );
};

export default AuthNavigation;

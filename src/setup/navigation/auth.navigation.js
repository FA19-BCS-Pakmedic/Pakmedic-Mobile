// importing stack navigator
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// importing screens
import Login from '../../screens/shared/Authentication/Login';
import Register from '../../screens/doctor/Authentication/Register';
import ForgotPassword from '../../screens/shared/Authentication/Forgot-password';
import OtpVerifcation from '../../screens/shared/Authentication/OTP-verification';

// create stacks
const loginStack = createNativeStackNavigator();
const registerStack = createNativeStackNavigator();
const authStack = createNativeStackNavigator();

// configure screen options for navigation bar
const screenOptions = {
  headerShown: false,
};

// stack navigator for only the login screens
const LoginNavigation = () => {
  return (
    <loginStack.Navigator
      initialRouteName="Login"
      screenOptions={screenOptions}>
      <loginStack.Screen name="Login" component={Login} />
      <loginStack.Screen name="ForgotPassword" component={ForgotPassword} />
    </loginStack.Navigator>
  );
};

//stack navigator for only the register screens
const RegisterNavigation = () => {
  return (
    <registerStack.Navigator
      initialRouteName="Register"
      screenOptions={screenOptions}>
      <registerStack.Screen name="Register" component={Register} />
      <registerStack.Screen name="OtpVerifcation" component={OtpVerifcation} />
    </registerStack.Navigator>
  );
};

//stack navigator for nested register and login screen
const AuthNavigation = () => {
  return (
    <>
      <authStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="LoginNavigation">
        <authStack.Screen name="LoginNavigation" component={LoginNavigation} />
        <authStack.Screen
          name="RegisterNavigation"
          component={RegisterNavigation}
        />
      </authStack.Navigator>
    </>
  );
};

export default AuthNavigation;

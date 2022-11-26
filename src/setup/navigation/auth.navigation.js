// importing stack navigator
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// importing screens
import Login from '../../screens/shared/Authentication/Login';
import Register from '../../screens/doctor/Authentication/Register';
import ForgotPassword from '../../screens/shared/Authentication/Forgot-password';
import OtpVerifcation from '../../screens/shared/Authentication/OTP-verification';

// import header component
import Header from '../../components/shared/Header';
import colors from '../../utils/styles/themes/colors';

// create stacks
const loginStack = createNativeStackNavigator();
const registerStack = createNativeStackNavigator();
const authStack = createNativeStackNavigator();

// configure screen options for navigation bar
const screenOptions = {
  headerShown: true,
};

// stack navigator for only the login screens
const LoginNavigation = () => {
  return (
    <loginStack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}>
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
      screenOptions={{
        headerShown: false,
      }}>
      <registerStack.Screen name="Register" component={Register} />
      <registerStack.Screen name="OtpVerifcation" component={OtpVerifcation} />
    </registerStack.Navigator>
  );
};

//stack navigator for nested register and login screen
const AuthNavigation = () => {
  return (
    <>
      <Header color={colors.primary1} />
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

//import stack navigator
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//import navigation stacks
import AuthNavigation from './auth.navigation';

//create stacks
const rootStack = createNativeStackNavigator();

//configure root navigator
export default RootNavigation = () => {
  console.log(AuthNavigation);

  return (
    <rootStack.Navigator
      initialRouteName="Auth"
      screenOptions={{
        headerShown: false,
      }}>
      <rootStack.Screen name="Auth" component={AuthNavigation} />
    </rootStack.Navigator>
  );
};

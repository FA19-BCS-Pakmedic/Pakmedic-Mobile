//import stack navigator
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//import navigation stacks
import OnboardingNavigation from './onboarding.navigation';
import AuthNavigation from './auth.navigation';
import ChooseRole from '../../screens/shared/ChooseRole';
import deviceStorage from '../../utils/helpers/deviceStorage';

//create stacks
const rootStack = createNativeStackNavigator();

//configure root navigator
export default RootNavigation = () => {
  const getRole = async () => {
    const role = await deviceStorage.loadItem('role');
    return role;
  };

  return (
    <rootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <rootStack.Screen name="ChooseRole" component={ChooseRole} />
      <rootStack.Screen
        name="Onboarding"
        component={OnboardingNavigation}
        side={getRole()}
      />

      <rootStack.Screen name="Auth" component={AuthNavigation} />
    </rootStack.Navigator>
  );
};

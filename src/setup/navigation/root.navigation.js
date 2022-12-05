import {useState, useEffect} from 'react';

//import stack navigator
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//import navigation stacks
import OnboardingNavigation from './onboarding.navigation';
import AuthNavigation from './auth.navigation';
import ChooseRole from '../../screens/shared/ChooseRole';
import deviceStorage from '../../utils/helpers/deviceStorage';
import ROLES from '../../utils/constants/ROLES';
import DoctorNavigation from './Doctor-Navigation/doctor.navigation';
import PatientNavigation from './Patient-Navigation/patient.navigation';

//create stacks
const rootStack = createNativeStackNavigator();

//configure root navigator
export default RootNavigation = () => {
  const [role, setRole] = useState(null);
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [jwt, setJwt] = useState(null);

  //useEffect to get roles
  useEffect(() => {
    const getRole = async () => {
      // let role;
      let role = await deviceStorage?.loadItem('role');
      console.log('HERE IN ROOT NAVIGATION', role);
      setRole(role);
    };

    getRole();
  }, []);

  //useEffect to get the firstTime
  useEffect(() => {
    const getFirstTime = async () => {
      let firstTime = await deviceStorage?.loadItem('isFirstTime');
      firstTime && setIsFirstTime(false);
    };
    getFirstTime();
  }, []);

  return (
    <rootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {!role && <rootStack.Screen name="ChooseRole" component={ChooseRole} />}
      {isFirstTime && (
        <rootStack.Screen
          name="Onboarding"
          component={OnboardingNavigation}
          side={role}
        />
      )}

      <rootStack.Screen name="Auth" component={AuthNavigation} />

      {role === ROLES.doctor ? (
        <rootStack.Screen name="App" component={DoctorNavigation} />
      ) : (
        <rootStack.Screen name="App" component={PatientNavigation} />
      )}
    </rootStack.Navigator>
  );
};

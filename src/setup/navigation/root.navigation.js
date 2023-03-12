import {useState, useEffect} from 'react';

//import stack navigator
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//import redux hooks
import {useDispatch} from 'react-redux';

//import actions
import {authSuccess, setRole} from '../redux/actions';

//import services
import {getPatient} from '../../services/patientServices';
import {getDoctor} from '../../services/doctorServices';

//import navigation stacks
import OnboardingNavigation from './onboarding.navigation';
import AuthNavigation from './auth.navigation';
import ChooseRole from '../../screens/shared/ChooseRole';
import deviceStorage from '../../utils/helpers/deviceStorage';
import ROLES from '../../utils/constants/ROLES';
import DoctorNavigation from './Doctor-Navigation/doctor.navigation';
import PatientNavigation from './Patient-Navigation/patient.navigation';
import { voximplant } from '../../services/voxServices';
import { Voximplant } from 'react-native-voximplant';
import calls from '../../utils/helpers/Store';
import { useNavigation } from '@react-navigation/native';

//create stacks
const rootStack = createNativeStackNavigator();

//configure root navigator
export default RootNavigation = () => {
  const [userRole, setUserRole] = useState();
  const [isFirstTime, setIsFirstTime] = useState(true);
  const dispatch = useDispatch();

  const navigation = useNavigation();


  // use effect to check if user has selected a role
  useEffect(() => {
    const getRole = async () => {
      const storedRole = await deviceStorage.loadItem('role');
      if (storedRole) {
        dispatch(setRole(storedRole));
        setUserRole(storedRole);
      }
    };
    getRole();
  }, []);

  // use effect to check if the user has already gone through the onboarding
  useEffect(() => {
    const getIsFirstTime = async () => {
      const isFirstTime = await deviceStorage.loadItem('isFirstTime');
      setIsFirstTime(isFirstTime === null);
    };

    getIsFirstTime();
  });

  useEffect(() => {
    voximplant.on(Voximplant.ClientEvents.IncomingCall, incomingCallEvent => {
      calls.set(incomingCallEvent.call.callId, incomingCallEvent.call);
      navigation.navigate('IncomingCall', {
        callId: incomingCallEvent.call.callId,
      });
    });

    voximplant.on(Voximplant.ClientEvents.ConnectionEstablished, event => {
      console.log('Connection established');
    });

    voximplant.on(Voximplant.ClientEvents.AuthResult, event => {
      console.log('Auth result');
      console.log(event);
    });

    return () => {
      voximplant.off(Voximplant.ClientEvents.AuthResult);
      voximplant.off(Voximplant.ClientEvents.ConnectionEstablished);
      voximplant.off(Voximplant.ClientEvents.IncomingCall);
    };
  });

  return (
    <rootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {!userRole && (
        <rootStack.Screen name="ChooseRole" component={ChooseRole} />
      )}
      {isFirstTime && (
        <rootStack.Screen name="Onboarding" component={OnboardingNavigation} />
      )}

      <rootStack.Screen name="Auth" component={AuthNavigation} />

      {userRole === ROLES.doctor ? (
        <rootStack.Screen name="App" component={DoctorNavigation} />
      ) : (
        <rootStack.Screen name="App" component={PatientNavigation} />
      )}
    </rootStack.Navigator>
  );
};

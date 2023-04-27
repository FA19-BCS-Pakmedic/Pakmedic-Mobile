import {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AnimatedSplash from 'react-native-animated-splash-screen';
import SplashScreen from 'react-native-splash-screen';
import RootNavigation from './root.navigation';

import ProfileManagement from '../../screens/doctor/Profile-management/Home';
import EditProfile from '../../screens/patient/Profile-management/Edit-Profile';

import {useSelector, useDispatch} from 'react-redux';
import {setRole} from '../redux/actions';
import ChooseRole from '../../screens/shared/ChooseRole';
import deviceStorage from '../../utils/helpers/deviceStorage';

const AppNavigation = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [userRole, setUserRole] = useState();

  const dispatch = useDispatch();

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
  });

  const selectRole = role => {
    setUserRole(role);
  };

  useEffect(() => {
    SplashScreen.hide();
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <AnimatedSplash
      isLoaded={!isLoading}
      logoImage={require('../../assets/images/Logo.png')}
      backgroundColor={'#FFFFFF'}
      logoHeight={200}
      logoWidth={200}>
      <>
        {!userRole && <ChooseRole selectRole={selectRole} />}
        {userRole && (
          <NavigationContainer
            theme={{
              colors: {
                background: '#FFFFFF',
              },
            }}
            style={{backgroundColor: '#FFFFFF'}}>
            <RootNavigation />
            {/* <EditProfile /> */}
            {/* <ProfileManagement /> */}
          </NavigationContainer>
        )}
      </>
    </AnimatedSplash>
  );
};

export default AppNavigation;

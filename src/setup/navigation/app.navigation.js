import {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AnimatedSplash from 'react-native-animated-splash-screen';
import SplashScreen from 'react-native-splash-screen';
import RootNavigation from './root.navigation';

import {useSelector, useDispatch} from 'react-redux';
import {setLoading} from '../redux/actions';

const AppNavigation = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();
  const loading = useSelector(state => state.load.loading);

  useEffect(() => {
    SplashScreen.hide();
    setTimeout(() => {
      dispatch(setLoading(false));
      setIsLoaded(!loading);
    }, 1000);
  });
  return (
    <AnimatedSplash
      isLoaded={isLoaded}
      logoImage={require('../../assets/images/Logo.png')}
      backgroundColor={'#FFFFFF'}
      logoHeight={200}
      logoWidth={200}>
      <NavigationContainer>
        <RootNavigation />
      </NavigationContainer>
    </AnimatedSplash>
  );
};

export default AppNavigation;

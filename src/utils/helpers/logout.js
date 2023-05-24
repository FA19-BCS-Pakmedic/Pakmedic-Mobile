import deviceStorage from './deviceStorage';
import { voximplant } from '../../services/voxServices';
import {GoogleSignin} from '@react-native-google-signin/google-signin';



const logout = async (dispatch, authLogout, navigation) => {
    navigation.replace('Auth', {
      screen: 'Login',
    });
    await deviceStorage.deleteItem('jwtToken');
    await voximplant.disconnect();
    dispatch(authLogout());
    await GoogleSignin.signOut();

  };

export default logout;
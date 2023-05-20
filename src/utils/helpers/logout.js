import deviceStorage from './deviceStorage';
import { voximplant } from '../../services/voxServices';


const logout = async (dispatch, authLogout, navigation) => {
    await deviceStorage.deleteItem('jwtToken');
    await voximplant.disconnect();
    dispatch(authLogout());
    navigation.replace('Auth', {
      screen: 'Login',
    });
  };

export default logout;
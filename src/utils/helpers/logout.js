import deviceStorage from './deviceStorage';
import { voximplant } from '../../services/voxServices';


const logout = async (dispatch, authLogout, navigation) => {
    navigation.replace('Auth', {
      screen: 'Login',
    });
    await deviceStorage.deleteItem('jwtToken');
    await voximplant.disconnect();
    dispatch(authLogout());
  };

export default logout;
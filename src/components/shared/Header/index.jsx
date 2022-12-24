import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

// import theme
import colors from '../../../utils/styles/themes/colors';
import fonts from '../../../utils/styles/themes/fonts';
import dimensions from '../../../utils/styles/themes/dimensions';

//import utils
import deviceStorage from '../../../utils/helpers/deviceStorage';
import ROLES from '../../../utils/constants/ROLES';

//import actions
import {authLogout} from '../../../setup/redux/actions';

//import svgs
import Logo from '../../../assets/svgs/main-logo.svg';
import Notification from '../../../assets/svgs/notif-icon.svg';
import MenuDropdown from '../MenuDropdown';

const Header = ({color}) => {
  const navigation = useNavigation();

  const [visible, setVisible] = useState(false);

  const links = [
    {
      title: 'Profile',
      route: 'Profile',
    },
  ];

  const role = useSelector(state => state.role.role);
  const user = useSelector(state => state.auth.user) || null;

  const notif = true;

  const dispatch = useDispatch();

  const logout = async () => {
    await deviceStorage.deleteItem('jwtToken');
    dispatch(authLogout());
    navigation.navigate('Auth', {
      screen: 'Login',
    });
  };

  const openMenu = () => {
    setVisible(true);
  };
  const closeMenu = () => {
    setVisible(false);
  };

  return !user ? (
    <View style={styles(role, 'center').root}>
      <Text style={styles().text}>Pakmedic</Text>
    </View>
  ) : (
    <View style={styles(role).root}>
      {/* Logo Container */}
      <View style={styles().logoContainer}>
        <Logo width={dimensions.Width / 10} />
        <Text style={styles().text}>Pakmedic</Text>
      </View>

      {/* User avatar and notification bell */}
      <View style={styles().actionsContainer}>
        <TouchableOpacity style={styles().notificationContainer}>
          <Notification width={30} height={30} />
          {notif && <View style={styles().notifIndicator}></View>}
        </TouchableOpacity>
        {/* <MenuDropdown visible={visible} closeMenu={closeMenu} links={links} /> */}

        <TouchableOpacity onPress={openMenu}>
          <Image
            source={require('../../../assets/images/default-avatar.png')}
            style={styles().avatar}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = (role, justifyContent) =>
  StyleSheet.create({
    root: {
      width: dimensions.Width,
      height: dimensions.Height / 15,
      backgroundColor:
        role === ROLES.doctor
          ? colors.secondaryMonoChrome300
          : colors.primaryMonoChrome300,
      flexDirection: 'row',
      justifyContent: justifyContent || 'space-between',
      alignItems: 'center',
      paddingHorizontal: 10,
    },
    text: {
      color: colors.secondary1,
      fontSize: fonts.size.font24,
      fontWeight: fonts.weight.bold,
    },

    logoContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },

    actionsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },

    notificationContainer: {
      position: 'relative',
      padding: 5,
    },

    notifIndicator: {
      position: 'absolute',
      top: 3,
      right: 3,
      width: dimensions.Width / 40,
      height: dimensions.Height / 80,
      borderRadius: 10,
      backgroundColor: colors.accent1,
    },

    avatar: {
      width: dimensions.Width / 11,
      height: dimensions.Height / 21,
      marginLeft: dimensions.Width / 60,
    },
  });

import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

// import theme
import colors from '../../../utils/styles/themes/colors';
import fonts from '../../../utils/styles/themes/fonts';
import dimensions from '../../../utils/styles/themes/dimensions';
import deviceStorage from '../../../utils/helpers/deviceStorage';
import ROLES from '../../../utils/constants/ROLES';
import {useDispatch, useSelector} from 'react-redux';
import {authLogout} from '../../../setup/redux/actions';

const Header = ({color}) => {
  const navigation = useNavigation();

  const role = useSelector(state => state.role.role);
  const user = useSelector(state => state.auth.user) || null;

  const dispatch = useDispatch();

  const logout = async () => {
    await deviceStorage.deleteItem('jwtToken');
    dispatch(authLogout());
    navigation.navigate('Auth', {
      screen: 'Login',
    });
  };

  return (
    <View style={styles(role).root}>
      <Text style={styles().text}>Pakmedic</Text>
      {user && (
        <TouchableOpacity onPress={logout} style={styles().logoutContainer}>
          <Text>Logout</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;

const styles = role =>
  StyleSheet.create({
    root: {
      width: dimensions.Width,
      height: dimensions.Height / 15,
      backgroundColor:
        role === ROLES.doctor
          ? colors.secondaryMonoChrome300
          : colors.primaryMonoChrome300,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
    },
    text: {
      color: colors.secondary1,
      fontSize: fonts.size.font24,
      fontWeight: fonts.weight.bold,
    },
    logoutContainer: {
      position: 'absolute',
      right: 10,
    },
  });

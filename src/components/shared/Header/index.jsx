import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

// import theme
import colors from '../../../utils/styles/themes/colors';
import fonts from '../../../utils/styles/themes/fonts';
import dimensions from '../../../utils/styles/themes/dimensions';
import deviceStorage from '../../../utils/helpers/deviceStorage';

const Header = ({color}) => {
  const navigation = useNavigation();

  const [token, setToken] = useState(null);

  useEffect(() => {
    const getToken = async () => {
      const data = await deviceStorage.loadItem('jwtToken');
      setToken(data);
    };
    getToken();
  }, []);

  const logout = async () => {
    await deviceStorage.deleteItem('jwtToken');
    setToken(null);
    navigation.navigate('Auth', {
      screen: 'Login',
    });
  };

  return (
    <View style={styles(color).root}>
      <Text style={styles().text}>Pakmedic</Text>
      {token && (
        <TouchableOpacity onPress={logout} style={styles().logoutContainer}>
          <Text>Logout</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;

const styles = color =>
  StyleSheet.create({
    root: {
      width: dimensions.Width,
      height: dimensions.Height / 15,
      backgroundColor: color || colors.secondaryMonoChrome300,
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

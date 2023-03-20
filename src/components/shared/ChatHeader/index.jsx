import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

import dimensions from '../../../utils/styles/themes/dimensions';
import fonts from '../../../utils/styles/themes/fonts';
import colors from '../../../utils/styles/themes/colors';

import BackIcon from '../../../assets/svgs/Backicon.svg';
import CallIcon from '../../../assets/svgs/PhoneOutlined.svg';
import VideoIcon from '../../../assets/svgs/Video-on.svg';

import ROLES from '../../../utils/constants/ROLES';

import {useNavigation} from '@react-navigation/native';

const ChatHeader = ({role, user, onPressCall, callee}) => {
  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };
  return (
    <View style={styles().container}>
      <TouchableOpacity style={styles().backIconContainer} onPress={goBack}>
        <BackIcon />
      </TouchableOpacity>
      <Text style={styles().text}>{user ? user.name : 'Abdul Moeed'}</Text>
      <View style={styles().optionsContainer}>
        <TouchableOpacity
          style={styles().option}
          onPress={() => {
            onPressCall(callee, false);
          }}>
          <CallIcon />
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={styles().option}
          onPress={() => {
            onPressCall(callee, true);
          }}>
          <VideoIcon />
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default ChatHeader;

const styles = role =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: dimensions.Height / 12,
      backgroundColor: colors.white,
      borderBottomWidth: 2,
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      paddingHorizontal: dimensions.Width / 20,
      borderBottomColor: colors.primary1,
    },

    backIconContainer: {
      width: dimensions.Width / 10,
      height: dimensions.Width / 10,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: dimensions.Width / 50,
      backgroundColor:
        role === ROLES.doctor
          ? colors.secondaryMonoChrome100
          : colors.primaryMonoChrome300,
    },

    text: {
      fontSize: fonts.size.font20,
      fontWeight: fonts.weight.semi,
      position: 'absolute',
      left: 0,
      right: 0,
      textAlign: 'center',
      zIndex: -1,
    },

    optionsContainer: {
      height: '100%',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
    },

    option: {
      width: dimensions.Width / 10,
      height: dimensions.Width / 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

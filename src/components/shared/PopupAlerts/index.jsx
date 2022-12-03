import React from 'react';
import {StyleSheet, View, Text, ActivityIndicator} from 'react-native';
import {useEffect} from 'react';

import ModalContainer from '../../../containers/ModalContainer';
import dimensions from '../../../utils/styles/themes/dimensions';

import fonts from '../../../utils/styles/themes/fonts';
import colors from '../../../utils/styles/themes/colors';

import ProfileSuccess from '../../../assets/svgs/ProfileSuccess.svg';
import ProfileFailure from '../../../assets/svgs/ProfileFailure.svg';

const PopupAlerts = props => {
  const {isModalVisible, setModalVisible, height, width, type, alertName} =
    props;

  const alertsList = {
    LoginSuccess: ProfileSuccess,
    LoginFailure: ProfileFailure,
    RegisterSuccess: ProfileSuccess,
    RegisterFailure: ProfileFailure,
  };

  const Alert = alertsList[props.alertName];

  return (
    <ModalContainer
      isModalVisible={isModalVisible}
      setModalVisible={setModalVisible}
      height={dimensions.Height / height}
      width={dimensions.Width / width}
      type={type}>
      <Alert />
      <Text style={styles().font}>{props.message}</Text>
      <Text style={styles().message}>{`You will be redirected to ${
        !props?.redirect ? '' : props?.redirect
      } Page in a Few Seconds`}</Text>
      <ActivityIndicator
        size="large"
        color={alertName.includes('Failure') == false ? '#69db7c' : '#d9480f'}
      />
    </ModalContainer>
  );
};

const styles = () =>
  StyleSheet.create({
    font: {
      fontSize: fonts.size.font20,
      fontWeight: fonts.weight.bold,
      color: colors.secondary1,
    },
    message: {width: '80%'},
  });

export default PopupAlerts;

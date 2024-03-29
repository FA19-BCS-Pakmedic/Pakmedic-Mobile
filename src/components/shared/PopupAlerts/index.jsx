import React from 'react';
import {StyleSheet, View, Text, ActivityIndicator} from 'react-native';
import {useEffect} from 'react';

import ModalContainer from '../../../containers/ModalContainer';
import dimensions from '../../../utils/styles/themes/dimensions';

import {useNavigation} from '@react-navigation/native';

import fonts from '../../../utils/styles/themes/fonts';
import colors from '../../../utils/styles/themes/colors';

import ProfileSuccess from '../../../assets/svgs/ProfileSuccess.svg';
import VectorFailure from '../../../assets/svgs/VectorFailure.svg';
import ProfileFailure from '../../../assets/svgs/ProfileFailure.svg';

const PopupAlerts = props => {
  const {
    isModalVisible,
    setModalVisible,
    height,
    width,
    type,
    alertName,
    backDropOpacity,
    backDropColor,
    bgColor,
    timer,
  } = props;

  const alertsList = {
    LoginSuccess: ProfileSuccess,
    LoginFailure: VectorFailure,
    RegisterSuccess: ProfileSuccess,
    RegisterFailure: VectorFailure,
  };

  const Alert = alertsList[props?.alertName];

  const navigation = useNavigation();

  useEffect(() => {
    if (!isModalVisible) return;
    setTimeout(
      () => {
        console.log(props.redirect);
        navigation.navigate('App', props.redirect);
        setModalVisible(false);
      },
      timer ? timer : 1000,
    );
  }, [isModalVisible]);

  return (
    <ModalContainer
      isModalVisible={isModalVisible}
      setModalVisible={setModalVisible}
      height={dimensions.Height / height}
      width={dimensions.Width / width}
      bgColor={bgColor}
      type={type}>
      <Alert />
      <Text style={styles()?.font}>{props.message}</Text>
      <Text style={styles()?.message}>{`You will be redirected to ${
        !props?.redirect?.screen ? '' : props?.redirect?.screen
      } Page in a Few Seconds`}</Text>
      <ActivityIndicator
        size="large"
        color={
          alertName?.includes('Failure') == false
            ? colors.primary1
            : colors.accent1
        }
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

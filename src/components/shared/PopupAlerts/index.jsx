import React from 'react';
import {StyleSheet, View, Text, ActivityIndicator} from 'react-native';
import {useEffect} from 'react';

import ModalContainer from '../../../containers/ModalContainer';
import dimensions from '../../../utils/styles/themes/dimensions';

import {useNavigation} from '@react-navigation/native';

import fonts from '../../../utils/styles/themes/fonts';
import colors from '../../../utils/styles/themes/colors';

import ProfileSuccess from '../../../assets/svgs/VectorSuccess.svg';
import VectorFailure from '../../../assets/svgs/VectorFailure.svg';
import ProfileFailure from '../../../assets/svgs/ProfileFailure.svg';

import Lottie from 'lottie-react-native';

const PopupAlerts = ({
  isModalVisible,
  setModalVisible,
  height,
  width,
  type,
  alertName,
  bgColor,
  timer,
  redirect,
  message,
  isReplace = false,
  isNavigate = true,
  isBack = false,
}) => {
  // const {} = props;

  const alertsList = {
    LoginSuccess: ProfileSuccess,
    LoginFailure: VectorFailure,
    RegisterSuccess: ProfileSuccess,
    RegisterFailure: VectorFailure,
  };

  const Alert = alertsList[alertName];

  const navigation = useNavigation();

  useEffect(() => {
    if (!isModalVisible) return;
    setTimeout(
      () => {
        console.log('navigating to ', redirect);

        if (!alertName.includes('Failure') && isNavigate) {
          if (isBack) {
            navigation.goBack();
          } else {
            navigation[isReplace ? 'replace' : 'navigate']('App', redirect);
          }
        }
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
      <Text style={styles()?.message}>{message}</Text>
      {/* <Text style={styles()?.message}>{`You will be redirected to ${
        !redirect?.screen ? '' : redirect?.screen
      } Page in a Few Seconds`}</Text> */}
      <View style={styles().lottie}>
        <Lottie
          style={[
            {
              transform: [{scale: 1.6}],
            },
          ]}
          source={
            alertName?.includes('Failure') == false
              ? require('../../../assets/lottie/success.json')
              : require('../../../assets/lottie/error.json')
          }
          autoPlay
          loop
          resizeMode="cover"
        />
      </View>
    </ModalContainer>
  );
};

const styles = () =>
  StyleSheet.create({
    font: {
      width: dimensions.Width / 1.5,
      textAlign: 'center',
      margin: 10,
      fontSize: fonts.size.font20,
      fontWeight: fonts.weight.bold,
      color: colors.secondary1,
    },
    message: {width: dimensions.Width / 1.5, margin: 5, textAlign: 'center'},
    lottie: {
      width: dimensions.Width / 5,
      height: dimensions.Width / 5,
    },
  });

export default PopupAlerts;

import React from 'react';
import {StyleSheet, View, SafeAreaView, Dimensions} from 'react-native';
import {useEffect} from 'react';
import Modal from 'react-native-modal';

import dimensions from '../utils/styles/themes/dimensions';

const Height = Dimensions.get('screen').height;

const ModalContainer = props => {
  const {
    isModalVisible,
    setModalVisible,
    type,
    height,
    width,
    backDropColor,
    backDropOpacity,
    bgColor,
    padding,
    borderColor,
  } = props;
  return (
    <Modal
      deviceHeight={Height}
      backdropColor={backDropColor ? backDropColor : 'black'}
      backdropOpacity={backDropOpacity ? backDropOpacity : 0.9}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationInTiming={400}
      isVisible={isModalVisible}
      style={[styles().container, type == 'bottom' ? styles().bottom : {}]}
      onBackdropPress={() => {
        setModalVisible(false);
      }}>
      <View
        style={[
          styles(bgColor, height, width, padding, borderColor).modal,
          type == 'bottom'
            ? {borderTopLeftRadius: 30, borderTopRightRadius: 30}
            : {borderRadius: 30},
        ]}>
        {props.children}
      </View>
    </Modal>
  );
};

const styles = (bgColor, height, width, padding, borderColor) =>
  StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    modal: {
      paddingVertical: padding ? padding : dimensions.Height / 15,
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: bgColor ? bgColor : 'white',
      height: height ? height : 600,
      width: width ? width : '100%',
      borderColor: borderColor ? borderColor : 'white',
      borderWidth: borderColor ? 2 : 0,
    },
    bottom: {
      justifyContent: 'flex-end',
      margin: 0,
    },
  });
export default ModalContainer;

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useEffect} from 'react';
import Modal from 'react-native-modal';

import dimensions from '../utils/styles/themes/dimensions';

const ModalContainer = props => {
  const {isModalVisible, setModalVisible, type, height, width} = props;

  return (
    <Modal
      backdropColor="black"
      backdropOpacity={0.9}
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
          styles(height, width).modal,
          type == 'bottom'
            ? {borderTopLeftRadius: 30, borderTopRightRadius: 30}
            : {borderRadius: 30},
        ]}>
        {props.children}
      </View>
    </Modal>
  );
};

const styles = (height, width) =>
  StyleSheet.create({
    container: {justifyContent: 'center', alignItems: 'center'},
    modal: {
      paddingVertical: dimensions.Height / 15,
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: 'white',
      height: height ? height : 600,
      width: width ? width : '100%',
    },
    bottom: {
      justifyContent: 'flex-end',
      margin: 0,
    },
  });
export default ModalContainer;

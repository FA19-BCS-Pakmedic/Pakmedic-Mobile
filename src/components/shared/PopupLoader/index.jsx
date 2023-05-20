import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import PopupAlerts from '../PopupAlerts';

const PopupLoader = ({
  isModalVisible,
  setModalVisible,
  alertName,
  message,
  redirectScreen,
  timer,
  isReplace = false,
  stackName = 'App',
  isLoading = false,
}) => {
  return (
    <View style={styles.container}>
      <PopupAlerts
        isLoading={isLoading}
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        height={1.8}
        width={1.2}
        timer={timer}
        alertName={alertName}
        message={message}
        redirect={{screen: redirectScreen}}
        isReplace={isReplace}
        stackName={stackName}></PopupAlerts>
    </View>
  );
};

export default PopupLoader;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
  },
});

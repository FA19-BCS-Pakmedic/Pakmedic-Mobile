import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';

import ModalContainer from '../../../containers/ModalContainer';
import PopupAlerts from '../../../components/shared/PopupAlerts';

import dimensions from '../../../utils/styles/themes/dimensions';
import fonts from '../../../utils/styles/themes/fonts';
import colors from '../../../utils/styles/themes/colors';

const DoctorModalNavigator = Visible => {
  return (
    <ModalContainer
      isModalVisible={Visible}
      height={1.8}
      width={1.2}
      type="bottom">
      <View style={styles.container}>
        <Text style={styles.text}>Hello World</Text>
      </View>
    </ModalContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: fonts.font20,
    color: colors.black,
  },
});

export default DoctorModalNavigator;

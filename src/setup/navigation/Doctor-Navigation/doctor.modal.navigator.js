import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

import ModalContainer from '../../../containers/ModalContainer';
import PopupAlerts from '../../../components/shared/PopupAlerts';

import dimensions from '../../../utils/styles/themes/dimensions';
import fonts from '../../../utils/styles/themes/fonts';
import colors from '../../../utils/styles/themes/colors';

import {useNavigation} from '@react-navigation/native';

const DoctorModalNavigator = props => {
  const {Visible, setModalVisible, navigation} = props;


  const navigate = (screenName, data) => {
    navigation.navigate('App', {
      screen: screenName,
      params: {
        data
      }
    })
  }


  return (
    <ModalContainer
      isModalVisible={Visible}
      setModalVisible={setModalVisible}
      height={dimensions.Height / 2}
      width={dimensions.Width}
      type="bottom"
      backDropOpacity={0.5}
      padding={dimensions.Height / 50}
      bgColor={colors.secondaryMonoChrome100}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>Services</Text>
        </TouchableOpacity>
        <View style={styles.line} />

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setModalVisible(false);
            navigation.navigate('Support Communities');
          }}>
          <Text style={styles.text}>Support Communities</Text>
        </TouchableOpacity>
        <View style={styles.line} />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>Contact</Text>
        </TouchableOpacity>
        <View style={styles.line} />

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setModalVisible(false);
            navigation.navigate('ComplaintDesk');
          }}>
          <Text style={styles.text}>Complaint Desk</Text>
        </TouchableOpacity>
        <View style={styles.line} />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>Analytics</Text>
        </TouchableOpacity>
        <View style={styles.line} />

        <TouchableOpacity style={styles.button} onPress={() => navigate("FinanceHome")}>
          <Text style={styles.text}>Finance</Text>
        </TouchableOpacity>
      </View>
    </ModalContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: colors.secondaryMonoChrome100,
  },
  button: {
    width: dimensions.Width,
    height: dimensions.Height / 15,
    justifyContent: 'center',
    alignItems: 'center',
    //borderBottomWidth: 0.5,
    // marginTop: dimensions.Height / 50,
  },
  // line: {
  //   borderBottomWidth: 1,
  //   width: dimensions.Width / 2,
  //   borderBottomColor: colors.secondary1,
  //   borderRadius: 5,
  // },
  text: {
    fontSize: fonts.size.font16,
    color: colors.secondary1,
    fontWeight: 'bold',
    textAlign: 'center',
    textDecorationLine: 'underline',
    textDecorationColor: colors.secondary1,
  },
});

export default DoctorModalNavigator;

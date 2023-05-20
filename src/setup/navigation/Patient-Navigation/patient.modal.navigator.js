import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

import ModalContainer from '../../../containers/ModalContainer';

import dimensions from '../../../utils/styles/themes/dimensions';
import fonts from '../../../utils/styles/themes/fonts';
import colors from '../../../utils/styles/themes/colors';

import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const PatientModalNavigator = props => {
  const user = useSelector(state => state.auth.user);

  const {Visible, setModalVisible, navigation} = props;
  //const navigation = useNavigation();
  return (
    <ModalContainer
      isModalVisible={Visible}
      setModalVisible={setModalVisible}
      height={dimensions.Height / 1.8}
      width={dimensions.Width}
      type="bottom"
      backDropOpacity={0.5}
      padding={dimensions.Height / 50}
      bgColor={colors.primaryMonoChrome100}>
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

        <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>Complaint Desk</Text>
        </TouchableOpacity>
        <View style={styles.line} />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>Analytics</Text>
        </TouchableOpacity>
        <View style={styles.line} />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>Finance</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setModalVisible(false);
            navigation.navigate('EHR', {id: user._id});
          }}>
          <Text style={styles.text}>EHR</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setModalVisible(false);
            navigation.navigate('MedicineScheduler', {id: user._id});
          }}>
          <Text style={styles.text}>Reminders</Text>
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
    backgroundColor: colors.primaryMonoChrome100,
  },
  button: {
    width: dimensions.Width,
    height: dimensions.Height / 15,
    justifyContent: 'center',
    alignItems: 'center',
    //borderBottomWidth: 0.5,
    //marginTop: dimensions.Height * 0.01,
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

export default PatientModalNavigator;

import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';

const AppointmentDetails = () => {
  const route = useRoute();
  const {appointment} = route.params;

  console.log(appointment);

  return (
    <View>
      <Text>AppointmentDetails</Text>
    </View>
  );
};

export default AppointmentDetails;

const styles = StyleSheet.create({});

import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';

import ProfileInfo from './ProfileInfo';

const ProfileInformation = () => {
  const icons = ['license', 'person', 'phone', 'email', 'id'];
  return (
    <View style={styles.container}>
      {icons.map((icon, index) => (
        <ProfileInfo icon={icon} key={index} value="value" />
      ))}
    </View>
  );
};

export default ProfileInformation;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
  },

  infoContainer: {
    flexDirection: 'row',
  },

  info: {
    flexDirection: 'column',
  },
});

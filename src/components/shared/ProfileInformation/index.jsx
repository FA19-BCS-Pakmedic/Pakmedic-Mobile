import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';

import ProfileInfo from './ProfileInfo';

const ProfileInformation = props => {
  // const icons = ['license', 'person', 'phone', 'email', 'id'];

  console.log(props);

  return (
    <View style={styles.container}>
      {props.information?.map((info, index) => (
        <ProfileInfo
          icon={info.icon}
          key={index}
          value={info.value}
          label={info.label}
        />
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

import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {apiEndpoint} from '../../../utils/constants/APIendpoint';

import CameraIcon from '../../../assets/svgs/VideoOn.svg';
import PhysicalIcon from '../../../assets/svgs/Physical-checkup.svg';
import MoneyIcon from '../../../assets/svgs/Money.svg';
import dimensions from '../../../utils/styles/themes/dimensions';
import fonts from '../../../utils/styles/themes/fonts';

const ServiceInformation = ({service, doctor}) => {
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image
          style={{
            width: dimensions.Width / 4,
            height: dimensions.Width / 4,
          }}
          source={{uri: `${apiEndpoint}files/${doctor.avatar}`}}
        />
      </View>
      <View>
        <Text style={styles.name}>Dr. {doctor.name}</Text>
        <View style={styles.serviceInfo}>
          <View style={styles.iconContainer}>
            {service.isOnline ? (
              <CameraIcon width={dimensions.Width / 25} />
            ) : (
              <PhysicalIcon width={dimensions.Width / 25} />
            )}
          </View>
          <Text style={styles.text}>
            {service.isOnline
              ? 'Online consultation'
              : `${service.hospital.name}`}
          </Text>
        </View>
        <View style={styles.serviceInfo}>
          <View style={styles.iconContainer}>
            <MoneyIcon width={dimensions.Width / 25} />
          </View>
          <Text style={styles.text}>Rs.{service.fee} </Text>
        </View>
      </View>
    </View>
  );
};

export default ServiceInformation;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    // borderWidth: 1,
    alignItems: 'center',
    paddingVertical: dimensions.Height / 100,
    // paddingHorizontal: dimensions.Width / 30,
  },

  name: {
    fontSize: fonts.size.font24,
    fontWeight: fonts.weight.bold,
  },

  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: dimensions.Width / 30,
    borderRadius: 100,
  },

  iconContainer: {
    marginRight: dimensions.Width / 100,
  },

  serviceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  text: {
    fontSize: fonts.size.font16,
    fontWeight: fonts.weight.semi,
  },
});

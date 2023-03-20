import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Image} from 'react-native-animatable';
import React from 'react';

import VerifiedIcon from '@/assets/svgs/VerifiedLogo.svg';
import StarIcon from '@/assets/svgs/Star.svg';

import dimensions from '../../../utils/styles/themes/dimensions';
import fonts from '../../../utils/styles/themes/fonts';
import colors from '../../../utils/styles/themes/colors';
import {apiEndpoint} from '../../../utils/constants/APIendpoint';
import DoctorService from './DoctorService';

const DoctorCard = ({doctor}) => {
  return (
    <View style={styles.container}>
      <View style={styles.doctorContent}>
        <View>
          <Image
            source={{
              uri: `${apiEndpoint}files/${doctor?.avatar}`,
            }}
            style={{
              width: dimensions.Width / 5,
              height: dimensions.Width / 5,
              marginRight: dimensions.Width / 20,
              borderRadius: dimensions.Width,
            }}
            animation="bounceIn"
          />
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>
              DR. {doctor ? doctor?.name : 'Doctor name'}
            </Text>
            <View style={styles.verifiedIconContainer}>
              <VerifiedIcon />
              <Text style={styles.verify}>PMC</Text>
            </View>
          </View>
          <Text style={styles.text}>
            {doctor ? doctor?.speciality : 'Speciality'}
          </Text>
          <Text style={styles.text}>
            {doctor ? doctor?.location : 'Location'}
          </Text>
          <View style={styles.ratingsContainer}>
            <StarIcon />
            <Text style={[styles.text, {marginLeft: dimensions.Width / 100}]}>
              4.5/5 674 reviews
            </Text>
          </View>
        </View>
      </View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {doctor.services.length > 0 &&
          doctor.services.map((service, index) => {
            return <DoctorService key={index} service={service} />;
          })}
      </ScrollView>
    </View>
  );
};

export default DoctorCard;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: dimensions.Height / 30,
    borderBottomWidth: 2,
    borderBottomColor: colors.accent1,
  },

  doctorContent: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: dimensions.Height / 50,
  },

  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  name: {
    fontSize: fonts.size.font20,
    fontWeight: fonts.weight.semi,
    marginRight: dimensions.Width / 60,
  },
  verifiedIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verify: {
    fontSize: fonts.size.font12,
    fontWeight: fonts.weight.semi,
    color: colors.primary1,
    marginLeft: dimensions.Width / 100,
  },
  ratingsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

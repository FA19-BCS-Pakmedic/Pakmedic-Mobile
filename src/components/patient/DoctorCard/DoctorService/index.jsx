import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import PhysicalCheckupIcon from '../../../../assets/svgs/Physical-checkup.svg';
import CalendarIcon from '../../../../assets/svgs/AppointmentIcon.svg';
import VideoCallIcon from '../../../../assets/svgs/VideoOn.svg';
import ClockIcon from '../../../../assets/svgs/Clock.svg';
import Button from '../../../shared/Button';
import colors from '../../../../utils/styles/themes/colors';
import dimensions from '../../../../utils/styles/themes/dimensions';
import fonts from '../../../../utils/styles/themes/fonts';

const DoctorService = ({service, onPressBooking}) => {
  const getDays = daysArr => {
    // convert array of days into a string with days separated by -
    let days = '';
    daysArr.forEach((day, index) => {
      if (index === 0) {
        days = day.slice(0, 3);
      } else {
        days = days + '-' + day.slice(0, 3);
      }
    });
    return days;
  };

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <View style={styles.iconContainer}>
          {!service.isOnline ? (
            <PhysicalCheckupIcon height={dimensions.Height / 30} />
          ) : (
            <VideoCallIcon height={dimensions.Height / 30} />
          )}
        </View>
        <View style={styles.serviceInfoContainer}>
          <Text style={styles.title}>
            {service?.isOnline
              ? 'Online Consultation'
              : service?.hospital?.name}
          </Text>
          <Text style={styles.location}>
            {!service?.isOnline && service?.hospital?.address?.address}
          </Text>
          <View style={styles.iconTextContainer}>
            <View style={styles.hintIcon}>
              <CalendarIcon />
            </View>
            <Text style={styles.text}>
              {service?.days?.length > 0 && getDays(service?.days)}
            </Text>
          </View>
          <View style={styles.iconTextContainer}>
            <View style={styles.hintIcon}>
              <ClockIcon />
            </View>
            <Text style={styles.text}>
              {service?.availFrom} - {service?.availTo}
            </Text>
          </View>
          <Text style={styles.price}>Rs:{service?.fee}</Text>
        </View>
      </View>
      <View style={styles.btnContainer}>
        <Button
          label={'Book Appointment'}
          onPress={() => {
            onPressBooking(service);
          }}
          width={'100%'}
          type="filled"
        />
      </View>
    </View>
  );
};

export default DoctorService;

const styles = StyleSheet.create({
  container: {
    width: dimensions.Width / 1.3,
    borderWidth: 2,
    borderColor: colors.primary1,
    borderRadius: dimensions.Width / 20,
    padding: dimensions.Width / 30,
    marginHorizontal: dimensions.Width / 30,
    paddingBottom: 0,
  },

  infoContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  iconContainer: {
    marginRight: dimensions.Width / 80,
  },
  icon: {
    width: dimensions.Width / 10,
    height: dimensions.Width / 10,
    borderWidth: 1,
  },

  serviceInfoContainer: {
    width: '89.5%',
  },
  title: {fontSize: fonts.size.font20, fontWeight: fonts.weight.semi},

  location: {fontSize: fonts.size.font16},
  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: dimensions.Height / 100,
  },
  text: {
    marginLeft: dimensions.Width / 100,
    fontSize: fonts.size.font14,
    fontWeight: fonts.weight.semi,
  },
  price: {
    width: '100%',
    textAlign: 'right',
    fontSize: fonts.size.font20,
    fontWeight: fonts.weight.semi,
    color: colors.accent1,
  },
});

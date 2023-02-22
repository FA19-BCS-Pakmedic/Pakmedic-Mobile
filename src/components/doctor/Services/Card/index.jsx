import {View, Text, StyleSheet} from 'react-native';

import dimensions from '../../../../utils/styles/themes/dimensions';
import colors from '../../../../utils/styles/themes/colors';
import fonts from '../../../../utils/styles/themes/fonts';

import VideoIcon from '../../../../assets/svgs/Video-on.svg';
import PhyscialCheckupIcon from '../../../../assets/svgs/Physical-checkup.svg';
import ClockIcon from '../../../../assets/svgs/material-symbols_nest-clock-farsight-analog-outline-rounded.svg';
import MoneyIcon from '../../../../assets/svgs/fa6-regular_money-bill-1.svg';
import AppointmentIcon from '../../../../assets/svgs/Appointment.svg';
import OptionsIcon from '../../../../assets/svgs/Options.svg';

export default function ServiceCard() {
  const icons = {
    video: <VideoIcon />,
    physicalCheckup: <PhyscialCheckupIcon />,
    clock: (
      <ClockIcon
        width={dimensions.Width / 15}
        height={dimensions.Height / 30}
      />
    ),
    money: (
      <MoneyIcon
        width={dimensions.Width / 15}
        height={dimensions.Height / 30}
      />
    ),
    appointment: (
      <AppointmentIcon
        width={dimensions.Width / 15}
        height={dimensions.Height / 30}
      />
    ),
    options: <OptionsIcon />,
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.left}>
          <View style={styles.iconContainer}>{icons[`video`]}</View>

          <View>
            <Text style={styles.infoHospital}>Islamabad Diagnostic center</Text>
            <Text>Blue area, Islamabad</Text>
          </View>
        </View>

        <View style={styles.optionsIconContainer}>{icons[`options`]}</View>
      </View>

      {/* Fees */}

      <View style={styles.info}>
        <View style={styles.left}>
          <View style={styles.infoIconContainer}>{icons[`money`]}</View>
          <Text style={styles.infoLabel}>Fees</Text>
        </View>
        <Text style={styles.infoValue}>Rs. 3500</Text>
      </View>

      {/* Days */}

      <View style={styles.info}>
        <View style={styles.left}>
          <View style={styles.infoIconContainer}>{icons[`appointment`]}</View>
          <Text style={styles.infoLabel}>Days</Text>
        </View>
        <Text style={styles.infoValue}>Mon-Tue-Wed-Thu</Text>
      </View>

      {/* Time */}

      <View style={[styles.info, {borderBottomWidth: 0}]}>
        <View style={styles.left}>
          <View style={styles.infoIconContainer}>{icons[`clock`]}</View>
          <Text style={styles.infoLabel}>Time</Text>
        </View>
        <Text style={styles.infoValue}>5:00pm - 5:00pm</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: dimensions.Height / 40,
    borderWidth: 1,
    borderColor: colors.primary1,
    borderRadius: 20,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: colors.primary1,
  },

  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconContainer: {
    width: dimensions.Width / 10,
    fontSize: fonts.size.font20,
    color: colors.primary1,
    marginRight: 10,
  },

  infoHospital: {
    fontSize: fonts.size.font16,
    fontWeight: fonts.weight.semi,
  },

  info: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.primary1,
  },

  infoIconContainer: {
    width: dimensions.Width / 10,
    fontSize: fonts.size.font20,
    color: colors.primary1,
    marginRight: 10,
  },

  infoValue: {
    fontSize: fonts.size.font16,
    fontWeight: fonts.weight.semi,
  },
});

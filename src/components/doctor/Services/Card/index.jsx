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
import MenuDropdown from '../../../shared/MenuDropdown';
import ConfirmationAlert from '../../../shared/ConfirmationAlert';
import {useState} from 'react';

export default function ServiceCard({service, onEdit, onDelete}) {
  const [visible, setVisible] = useState(false);

  const menuDropDownOptions = [
    {text: 'Edit', onSelect: () => onEdit(service._id)},
    {text: 'Delete', onSelect: () => setVisible(true)},
  ];

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

  const getConfirmationModal = () => {
    return (
      <ConfirmationAlert
        alertText={'Are you sure you want to delete this service?'}
        cancelControl={{
          width: dimensions.Width / 3,
          onPress: () => {
            setVisible(false);
          },
        }}
        confirmControl={{
          width: dimensions.Width / 3,
          onPress: () => {
            console.log('deleted');
            setVisible(false);
          },
        }}
        height={dimensions.Height / 5}
        width={dimensions.Width / 1.2}
        isModalVisible={visible}
        setModalVisible={setVisible}
        type="center"
      />
    );
  };

  return (
    <View style={styles.container}>
      {getConfirmationModal()}
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.left}>
          <View style={styles.iconContainer}>
            {icons[`${service.isOnline ? 'video' : 'physicalCheckup'}`]}
          </View>

          <View>
            {service.isOnline ? (
              <Text style={styles.infoHospital}>Online Consultation</Text>
            ) : (
              <>
                <Text style={styles.infoHospital}>{service.hospital.name}</Text>
                <Text>{service.hospital.address.address}</Text>
              </>
            )}
          </View>
        </View>
        <MenuDropdown options={menuDropDownOptions}>
          <View style={styles.optionsIconContainer}>{icons[`options`]}</View>
        </MenuDropdown>
      </View>

      {/* Fees */}

      <View style={styles.info}>
        <View style={styles.left}>
          <View style={styles.infoIconContainer}>{icons[`money`]}</View>
          <Text style={styles.infoLabel}>Fees</Text>
        </View>
        <Text style={styles.infoValue}>Rs. {service.fee}</Text>
      </View>

      {/* Days */}

      <View style={styles.info}>
        <View style={styles.left}>
          <View style={styles.infoIconContainer}>{icons[`appointment`]}</View>
          <Text style={styles.infoLabel}>Days</Text>
        </View>
        <Text style={styles.infoValue}>
          {service.days.map((day, index) => {
            return `${day}${index === service.days.length - 1 ? '' : '-'}`;
          })}
        </Text>
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
    borderRadius: dimensions.Width / 50,
    marginBottom: dimensions.Height / 40,
    borderWidth: 2,
    borderColor: colors.primary1,
    position: 'relative',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: colors.primary1,
  },

  optionsIconContainer: {
    height: dimensions.Width / 10,
    width: dimensions.Width / 10,
    justifyContent: 'center',
    alignItems: 'center',
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
    maxWidth: dimensions.Width / 2,
  },
});

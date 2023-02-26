import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {Component} from 'react';
import LicenseIcon from '../../../../assets/svgs/License.svg';
import PersonIcon from '../../../../assets/svgs/Person.svg';
import PhoneIcon from '../../../../assets/svgs/PhoneOutlined.svg';
import EmailIcon from '../../../../assets/svgs/Email.svg';
import IDIcon from '../../../../assets/svgs/id.svg';
import {LineDivider} from '../../Divider';

import colors from '../../../../utils/styles/themes/colors';
import fonts from '../../../../utils/styles/themes/fonts';
import dimensions from '../../../../utils/styles/themes/dimensions';

const ProfileInfo = ({icon, label, value}) => {
  const icons = {
    license: (
      <LicenseIcon
        style={styles.liscense}
        width={dimensions.Width / 20}
        height={dimensions.Height / 20}
      />
    ),
    person: <PersonIcon />,
    phone: <PhoneIcon />,
    email: <EmailIcon />,
    id: <IDIcon />,
  };

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        {/* logo */}
        <View style={styles.iconContainer}>{icons[`${icon}`]}</View>
        {/* information */}
        <View style={styles.info}>
          <Text style={styles.infoLabel}>{label}</Text>
          <Text style={styles.infoValue}>{value}</Text>
        </View>
      </View>
      <LineDivider color={colors.primary1} gap={50} />
    </View>
  );
};

export default ProfileInfo;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },

  iconContainer: {
    width: dimensions.Width / 10,
    fontSize: fonts.size.font20,
    justifyContent: 'center',
    alignItems: 'center',
    width: dimensions.Width / 10,
    height: dimensions.Width / 10,
  },

  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  info: {
    flexDirection: 'column',
    marginLeft: dimensions.Width / 20,
  },

  infoLabel: {
    fontSize: fonts.size.font20,
    fontWeight: fonts.weight.semiBold,
  },

  infoValue: {
    fontSize: fonts.size.font16,
    fontWeight: fonts.weight.normal,
  },

  liscense: {},
});

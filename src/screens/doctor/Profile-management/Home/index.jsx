import {View, Text} from 'react-native';
import React from 'react';

import {styles} from './styles';
import ProfileCard from '../../../../components/shared/ProfileCard';
import StaticContainer from '../../../../containers/StaticContainer';
import ProfileOptions from '../../../../components/shared/ProfileOptions';
import ProfileInformation from '../../../../components/shared/ProfileInformation';
import Services from '../../../../components/doctor/Services';
import AvailableTreatments from '../../../../components/doctor/Available-Treatments';
import Experiences from '../../../../components/doctor/Experience';
import Reviews from '../../../../components/doctor/Reviews';

const ProfileManagement = () => {
  return (
    <StaticContainer>
      <View style={styles.root}>
        <ProfileCard />
        <ProfileOptions />
        {/* <ProfileInformation /> */}
        {/* <Services /> */}
        {/* <AvailableTreatments /> */}
        {/* <Experiences /> */}
        <Reviews />
      </View>
    </StaticContainer>
  );
};

export default ProfileManagement;

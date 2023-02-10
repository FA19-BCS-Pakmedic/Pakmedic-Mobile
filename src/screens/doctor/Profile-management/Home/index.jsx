import {View, Text} from 'react-native';
import React from 'react';

import {styles} from './styles';
import ProfileCard from '../../../../components/shared/ProfileCard';
import StaticContainer from '../../../../containers/StaticContainer';
import ProfileOptions from '../../../../components/shared/ProfileOptions';
import ProfileInformation from '../../../../components/shared/ProfileInformation';

const ProfileManagement = () => {
  return (
    <StaticContainer>
      <View style={styles.root}>
        <ProfileCard />
        <ProfileOptions />
        <ProfileInformation />
      </View>
    </StaticContainer>
  );
};

export default ProfileManagement;

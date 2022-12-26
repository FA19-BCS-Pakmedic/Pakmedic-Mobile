import {View, Text} from 'react-native';
import React from 'react';

import {styles} from './styles';
import ProfileCard from '../../../../components/shared/ProfileCard';
import StaticContainer from '../../../../containers/StaticContainer';

const ProfileManagement = () => {
  return (
    <StaticContainer>
      <View>
        <ProfileCard />
      </View>
    </StaticContainer>
  );
};

export default ProfileManagement;

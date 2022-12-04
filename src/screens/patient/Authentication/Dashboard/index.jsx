import {View, Text} from 'react-native';
import {styles} from './styles';

import React from 'react';
import StaticContainer from '../../../../containers/StaticContainer';
import colors from '../../../../utils/styles/themes/colors';

const Dashboard = () => {
  return (
    <StaticContainer headerColor={colors.primaryMonoChrome300}>
      <View>
        <Text>PATIENT Dashboard</Text>
      </View>
    </StaticContainer>
  );
};

export default Dashboard;

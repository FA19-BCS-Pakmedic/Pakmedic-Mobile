import {View, Text} from 'react-native';
import {styles} from './styles';

import React from 'react';
import StaticContainer from '../../../../containers/StaticContainer';

const Dashboard = () => {
  const [isModalVisible, setModalVisible] = React.useState(false);
  return (
    <StaticContainer>
      <View>
        <Text style={{fontSize: 30}}>DOCTOR Dashboard</Text>
      </View>
    </StaticContainer>
  );
};

export default Dashboard;

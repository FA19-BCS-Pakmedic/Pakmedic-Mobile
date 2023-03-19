import {View, Text} from 'react-native';
import {styles} from './styles';

import {useSelector} from 'react-redux';
import React from 'react';
import StaticContainer from '../../../../containers/StaticContainer';

const Dashboard = () => {
  const [isModalVisible, setModalVisible] = React.useState(false);

  const user = useSelector(state => state.auth.user);
  return (
    <StaticContainer>
      <View>
        <Text style={{fontSize: 30}}>DOCTOR Dashboard</Text>
      </View>
    </StaticContainer>
  );
};

export default Dashboard;

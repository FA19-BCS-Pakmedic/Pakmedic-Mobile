import {View, Text} from 'react-native';
import {styles} from './styles';

import React from 'react';
import StaticContainer from '../../../../containers/StaticContainer';
import colors from '../../../../utils/styles/themes/colors';
import {useSelector} from 'react-redux';

const Dashboard = () => {
  const user = useSelector(state => state.auth.user);

  console.log(user);

  return (
    <StaticContainer>
      <View>
        <Text>welcome {user?.name}</Text>
      </View>
    </StaticContainer>
  );
};

export default Dashboard;

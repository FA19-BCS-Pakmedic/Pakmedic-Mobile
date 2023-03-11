import {View, Text} from 'react-native';
import React from 'react';

import {styles} from './styles';
import StaticContainer from '../../../../containers/StaticContainer';
import colors from '../../../../utils/styles/themes/colors';

const Home = () => {
  return (
    <StaticContainer>
      <View>
        <Text>Home</Text>
      </View>
    </StaticContainer>
  );
};

export default Home;

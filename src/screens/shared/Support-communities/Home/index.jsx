import {View, Text, Dimensions} from 'react-native';
import React from 'react';

import {styles} from './styles';
const {width, height} = Dimensions.get('window');

const Home = () => {
  return (
    <View>
      <Text>
        {width} + {height}
      </Text>
    </View>
  );
};

export default Home;

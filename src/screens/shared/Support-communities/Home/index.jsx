import {View, Text, Dimensions} from 'react-native';
import React from 'react';
import colors from '../../../../utils/styles/themes/colors';
import ScrollContainer from '../../../../containers/ScrollContainer';
import BackHeader from '../../../../components/shared/BackHeader';

import {styles} from './styles';
const {width, height} = Dimensions.get('window');

const Home = () => {
  return (
    <ScrollContainer>
      <BackHeader text={'Communities'} />
      <View></View>
    </ScrollContainer>
  );
};

export default Home;

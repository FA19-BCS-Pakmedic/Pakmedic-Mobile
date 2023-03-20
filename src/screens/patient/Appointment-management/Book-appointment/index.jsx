import {View, Text, TouchableOpacityBase, TouchableOpacity} from 'react-native';
import React from 'react';

import {styles} from './styles';
import StaticContainer from '../../../../containers/StaticContainer';
import colors from '../../../../utils/styles/themes/colors';

const {useNavigation} = require('@react-navigation/native');

const BookAppointment = () => {
  const navigation = useNavigation();
  return (
    <StaticContainer>
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ChatbotScreen');
          }}>
          <Text>BookAppointment</Text>
        </TouchableOpacity>
      </View>
    </StaticContainer>
  );
};

export default BookAppointment;

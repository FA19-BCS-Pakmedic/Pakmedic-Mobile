import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import React from 'react';
import StaticContainer from '../../../../containers/StaticContainer';

import {styles} from './styles';
import dimensions from '../../../../utils/styles/themes/dimensions';

const XrayScreen = navigation => {
  return (
    <StaticContainer>
      <View>
        <Text style={styles.heading}>Xray</Text>
      </View>
    </StaticContainer>
  );
};

export default XrayScreen;

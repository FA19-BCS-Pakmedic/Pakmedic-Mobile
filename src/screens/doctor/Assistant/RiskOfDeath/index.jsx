import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import React from 'react';
import StaticContainer from '../../../../containers/StaticContainer';

import {styles} from './styles';
import dimensions from '../../../../utils/styles/themes/dimensions';

const RiskOfDeathScreen = navigation => {
  return (
    <StaticContainer>
      <View>
        <Text style={styles.heading}>RiskOfDeath</Text>
      </View>
    </StaticContainer>
  );
};

export default RiskOfDeathScreen;

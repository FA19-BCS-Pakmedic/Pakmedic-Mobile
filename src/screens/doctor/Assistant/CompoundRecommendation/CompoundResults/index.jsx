import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
} from 'react-native';
import {React, useState} from 'react';
import StaticContainer from '../../../../../containers/StaticContainer';

import {styles} from './styles';
import dimensions from '../../../../../utils/styles/themes/dimensions';

import {useRoute} from '@react-navigation/native';
import {useEffect} from 'react';

import Ellipse from '../../../../../assets/svgs/Ellipse.svg';

const Results = props => {
  const route = useRoute();

  const {results} = route.params;

  const data = Object.entries(results).map(([key, value]) => ({
    category: key,
    medicines: value,
  }));

  const renderItem = ({item}) => (
    <View>
      <Text style={styles.category}>{item.category}</Text>
      <View style={styles.item}>
        {item.medicines.map(medicine => (
          <View style={styles.flex} key={medicine}>
            <Ellipse
              width={dimensions.Width / 50}
              height={dimensions.Height / 50}
            />
            <Text key={medicine} style={styles.medicine}>
              {medicine}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <StaticContainer
      customHeaderEnable={true}
      customHeaderName="Recommend Compound">
      <View style={styles.container}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.category}
        />
      </View>
    </StaticContainer>
  );
};

export default Results;

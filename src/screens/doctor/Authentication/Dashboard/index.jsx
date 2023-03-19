import {View, Text} from 'react-native';
import {styles} from './styles';

import {useSelector} from 'react-redux';
import React from 'react';
import StaticContainer from '../../../../containers/StaticContainer';

import {useNavigation} from '@react-navigation/native';

const Dashboard = () => {
  const [isModalVisible, setModalVisible] = React.useState(false);

  const navigation = useNavigation();

  const user = useSelector(state => state.auth.user);
  return (
    <StaticContainer>
      <View>
        <Text
          style={{fontSize: 30}}
          onPress={() => {
            navigation.navigate('App', {
              screen: 'ResultsScreen',
              params: {image: '83dec317-Diagnosis.png'},
            });
          }}>
          DOCTOR Dashboard
        </Text>
      </View>
    </StaticContainer>
  );
};

export default Dashboard;

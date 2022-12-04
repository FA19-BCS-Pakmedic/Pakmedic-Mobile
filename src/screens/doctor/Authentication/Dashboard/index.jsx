import {View, Text} from 'react-native';
import {styles} from './styles';

import React from 'react';
import StaticContainer from '../../../../containers/StaticContainer';
import PopupAlerts from '../../../../components/shared/PopupAlerts';

const Dashboard = () => {
  const [isModalVisible, setModalVisible] = React.useState(false);
  return (
    <StaticContainer>
      <View>
        <Text
          onPress={() => {
            setModalVisible(true);
          }}
          style={{fontSize: 30}}>
          DOCTOR Dashboard
        </Text>
      </View>
      <PopupAlerts
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        height={1.8}
        width={1.2}
        alertName={'RegisterFailure'}
        message={'Registration Failed'}
        redirect={'Home'}></PopupAlerts>
    </StaticContainer>
  );
};

export default Dashboard;

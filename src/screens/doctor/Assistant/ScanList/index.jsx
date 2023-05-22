import {View, Text, TouchableOpacity, FlatList, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import StaticContainer from '../../../../containers/StaticContainer';

import {styles} from './styles';
import dimensions from '../../../../utils/styles/themes/dimensions';

import {apiEndpoint} from '../../../../utils/constants/APIendpoint';
import {useSelector} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/native';

import ScanCard from '../../../../components/shared/Scans/ScanCard';

import {Xray, BrainMRI} from '../../../../services/doctorServices';
import deviceStorage from '../../../../utils/helpers/deviceStorage';
import PopupAlerts from '../../../../components/shared/PopupAlerts';
import {es} from 'react-native-paper-dates';

const ScansList = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {data, user, screenName} = route.params;
  const [isModalVisible, setModalVisible] = useState(false);
  const [alertName, setAlertName] = useState('LoginSuccess');
  const [message, setMessage] = useState('We Will Notify You Soon!');

  const renderItem = ({item}, navigation) => (
    <TouchableOpacity
      style={{
        marginVertical: dimensions.Height / 40,
        marginRight: dimensions.Width / 15,
      }}
      onPress={async () => {
        const fcm = await deviceStorage.loadItem('FCMToken');
        const data = {file: item?.image, token: fcm, user: user?._id};
        let res;
        if (screenName === 'X-Ray') {
          res = await Xray(data);
        } else if (screenName === 'Brain MRI') {
          res = await BrainMRI(data);
        }

        if (res?.data === 'Processing image...') {
          setModalVisible(true);
        }
      }}>
      <ScanCard scan={item} buttonHide={true} />
    </TouchableOpacity>
  );

  return (
    <StaticContainer customHeaderEnable={true} customHeaderName="Scan List">
      <FlatList
        data={data}
        renderItem={item => renderItem(item, navigation)}
        keyExtractor={(item, index) => index}
        style={styles.flatList}
        numColumns={2}
        contentContainerStyle={{paddingBottom: dimensions.Height / 30}}
      />
      <PopupAlerts
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        height={1.8}
        width={1.2}
        timer={2000}
        alertName={alertName}
        message={message}
        redirect={{screen: 'DoctorTabStack'}}></PopupAlerts>
    </StaticContainer>
  );
};

export default ScansList;

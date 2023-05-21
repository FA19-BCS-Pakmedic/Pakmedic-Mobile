import {View, Text, TouchableOpacity, FlatList, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import StaticContainer from '../../../../containers/StaticContainer';

import {styles} from './styles';
import dimensions from '../../../../utils/styles/themes/dimensions';

import {useRoute} from '@react-navigation/native';
import {apiEndpoint} from '../../../../utils/constants/APIendpoint';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {getDoctorById} from '../../../../services/doctorServices';

const PatientsList = () => {
  const route = useRoute();
  const {screenName} = route.params;
  const user = useSelector(state => state.auth.user);
  const [userList, setUserList] = useState([]);
  const [scanList, setScanList] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const res = async () => {
      const res = await getDoctorById(user._id);
      setUserList(res?.data?.data?.user?.accessList);
    };
    res();
  }, []);

  const makeScanList = item => {
    const filteredScans =
      screenName === 'X-Ray'
        ? item.filter(scan => !scan.image.endsWith('.nii.gz'))
        : screenName === 'Brain MRI'
        ? item.filter(scan => scan.image.endsWith('.nii.gz'))
        : scans;

    return filteredScans;
  };

  const renderItem = ({item}, navigation) => (
    <TouchableOpacity
      style={styles.flex}
      onPress={() => {
        const scans = makeScanList(item?.scans);
        navigation.navigate('App', {
          screen: 'ScanList',
          params: {data: scans, user: user, screenName: screenName},
        });
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '97%',
        }}>
        <View style={styles.flexVertical}>
          <Text style={styles.text}>{item?.name}</Text>
          <Text style={styles.text2}>{item?.location}</Text>
        </View>
        <Image
          source={
            item?.avatar ? {uri: `${apiEndpoint}files/${item?.avatar}`} : null
          }
          style={styles.image}
          width={dimensions.Width / 5}
          height={dimensions.Height / 13}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <StaticContainer customHeaderEnable={true} customHeaderName="Patient List">
      <View style={styles.container}>
        <FlatList
          data={userList}
          renderItem={item => renderItem(item, navigation)}
          keyExtractor={(item, index) => index}
          style={styles.flatList}
        />
      </View>
    </StaticContainer>
  );
};

export default PatientsList;

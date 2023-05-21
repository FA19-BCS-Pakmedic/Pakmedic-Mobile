import {View, Text, TouchableOpacity, FlatList, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './styles';

import StaticContainer from '../../../../src/containers/StaticContainer';

import {useSelector} from 'react-redux';

import {getNotifications} from '../../../services/doctorServices';

import {useNavigation} from '@react-navigation/native';
import {apiEndpoint} from '../../../utils/constants/APIendpoint';
import dimensions from '../../../utils/styles/themes/dimensions';
import { useCustomToast } from '../../../hooks/useCustomToast';
import Loader from '../../../components/shared/Loader';
import NotFound from '../../../components/shared/NotFound';

const Notification = () => {
  const navigation = useNavigation();
  const user = useSelector(state => state.auth.user);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const {showToast} = useCustomToast();

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      try {

        const res = await getNotifications(user._id);
        setNotifications(res?.data?.obj?.notifications);
      }catch(err){
        showToast('Error fetching notifications', 'danger')
      }finally{
        setLoading(false);
      }
    };
    fetchNotifications();
  }, [user]);

  const renderItem = ({item}, navigation) => (
    <TouchableOpacity
      style={styles.flex}
      onPress={() => {
        navigation.navigate('App', {
          screen: item?.data?.navigate,
          params: {image: item?.data?.image, data: item?.data?.data},
        });
      }}>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.flexVertical}>
          <Text style={styles.text}>{item?.title}</Text>
          <Text style={styles.text2}>{item?.body}</Text>
        </View>
        <Image
          source={
            item?.data?.image
              ? {uri: `${apiEndpoint}files/${item?.data?.image}`}
              : null
          }
          style={styles.image}
          width={dimensions.Width / 5}
          height={dimensions.Height / 13}
        />
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return <Loader title={"Loading notifications..."}/>;
  }

  if (!notifications.length) {

    return (<View style={styles.notFoundContainer}>
    <NotFound
              title="No notifications"
              text='You have no notifications yet'
              center={true}
      />
    </View>)
  }

  return (
    <StaticContainer
      customHeaderEnable={true}
      customHeaderName="Notifications"
      disableHeader={true}>
        
      <FlatList
        data={notifications.reverse()}

        renderItem={item => renderItem(item, navigation)}
        keyExtractor={(item, index) => index}
        style={styles.flatList}
      />
    </StaticContainer>
  );
};

export default Notification;

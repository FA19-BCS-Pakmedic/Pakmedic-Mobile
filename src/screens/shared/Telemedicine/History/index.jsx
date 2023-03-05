import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import {requestPermissions, voximplant} from '../../../../services/voxServices';
import {Voximplant} from 'react-native-voximplant';

const History = ({navigation, route}) => {
  const otherUser = 'jimmy';
  const loggedUser = route.params.loggedUser;

  const call = async () => {
    const permissionsGranted = await requestPermissions(false);

    if (permissionsGranted) {
      navigation.navigate('OnCall', {
        // loggedUser: loggedUser,
        callee: otherUser,
        isIncomingCall: false,
        isVideoCall: false,
      });
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={call}>
        <Text>Make a call</Text>
      </TouchableOpacity>
    </View>
  );
};

export default History;

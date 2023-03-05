import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';

import {Voximplant} from 'react-native-voximplant';

import {loginVox, voximplant} from '../../../../services/voxServices';
import calls from '../../../../utils/helpers/Store';

const CallHome = ({route, navigation}) => {
  const [name, setName] = useState('');
  const [, setReceiverName] = React.useState('');

  const password = 'test1234';

  useEffect(() => {
    voximplant.on(Voximplant.ClientEvents.IncomingCall, incomingCallEvent => {
      calls.set(incomingCallEvent.call.callId, incomingCallEvent.call);
      navigation.navigate('IncomingCall', {
        callId: incomingCallEvent.call.callId,
      });
    });

    return () => {
      voximplant.off(Voximplant.ClientEvents.IncomingCall);
    };
  });

  console.log('hellow');

  const login = async () => {
    await loginVox(name, password, navigation);
    navigation.navigate('History', {
      loggedUser: name,
    });
  };

  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          width: '80%',
          marginBottom: 10,
          borderRadius: 5,
          padding: 10,
          color: '#000',
        }}
        placeholder="Enter user"
        placeholderTextColor={'#000'}
        onChangeText={newText => setName(newText)}
      />
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          width: '80%',
          marginBottom: 10,
          borderRadius: 5,
          padding: 10,
          color: '#000',
        }}
        placeholder="Enter receiver name"
        placeholderTextColor={'#000'}
        onChange={setReceiverName}
      />

      <TouchableOpacity
        style={{
          backgroundColor: '#000',
          width: '80%',
          height: 40,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 5,
          marginBottom: 10,
        }}
        onPress={() => {
          login();
        }}>
        <Text
          style={{
            color: '#fff',
            fontSize: 16,
            fontWeight: 'bold',
          }}>
          Call
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CallHome;

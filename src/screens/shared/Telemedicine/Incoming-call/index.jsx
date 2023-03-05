import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect, useRef} from 'react';
import {
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './styles';
import calls from '../../../../utils/helpers/Store';
import {Voximplant} from 'react-native-voximplant';
import {
  declineCall,
  requestPermissions,
} from '../../../../services/voxServices';

const IncomingCall = ({route, navigation}) => {
  const {callId, isVideoCall} = route.params;
  const [caller, setCaller] = useState('Unknown');
  const call = useRef(null);

  useEffect(() => {
    call.current = calls.get(callId);
    setCaller(call.current.getEndpoints()[0].displayName);
    call.current.on(Voximplant.CallEvents.Disconnected, callEvent => {
      calls.delete(callEvent.call.callId);
      navigation.navigate('History');
    });
    return function cleanup() {
      call.off(Voximplant.CallEvents.Disconnected);
    };
  }, [callId]);

  async function answerCall() {
    const permissionsGranted = await requestPermissions(isVideoCall);

    if (permissionsGranted) {
      navigation.navigate('OngoingCall', {
        isVideoCall: isVideoCall,
        callId: callId,
        isIncomingCall: true,
      });
    }
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safearea}>
        <View style={styles.container}>
          <Text style={styles.incomingCallText}>Incoming call from:</Text>
          <Text style={styles.incomingCallText}>{caller}</Text>
          <View style={styles.incomingCallButtons}>
            <TouchableOpacity
              onPress={() => answerCall()}
              style={styles.button}>
              <Text style={styles.textButton}>ANSWER</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => declineCall(callId)}
              style={styles.button}>
              <Text style={styles.textButton}>DECLINE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default IncomingCall;

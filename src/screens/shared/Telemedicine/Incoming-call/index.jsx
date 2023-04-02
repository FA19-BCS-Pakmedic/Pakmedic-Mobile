import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect, useRef} from 'react';
import {
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import styles from './styles';
import calls from '../../../../utils/helpers/Store';
import {Voximplant} from 'react-native-voximplant';
import {
  declineCall,
  requestPermissions,
} from '../../../../services/voxServices';

import CallPickIcon from '../../../../assets/svgs/CallPick.svg';
import CallDropIcon from '../../../../assets/svgs/CallDrop.svg';
import colors from '../../../../utils/styles/themes/colors';

const IncomingCall = ({route, navigation}) => {
  const {callId, isVideoCall} = route.params;
  const [caller, setCaller] = useState('Unknown');
  const call = useRef(null);

  useEffect(() => {
    call.current = calls.get(callId);
    setCaller(call.current.getEndpoints()[0].displayName);
    call.current.on(Voximplant.CallEvents.Disconnected, callEvent => {
      calls.delete(callEvent.call.callId);
      navigation.pop();
    });
    return function cleanup() {
      call.current.off(Voximplant.CallEvents.Disconnected);
    };
  }, [callId]);

  async function answerCall() {
    const permissionsGranted = await requestPermissions(isVideoCall);

    if (permissionsGranted) {
      navigation.navigate('OngoingCall', {
        isVideoCall: false,
        callId: callId,
        isIncomingCall: true,
        otherUsername: caller,
      });
    }
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        {/* <Text style={styles.incomingCallText}>Incoming call from:</Text> */}

        <Animatable.Text style={styles.incomingCallText} animation="fadeInDown">
          {caller}
        </Animatable.Text>

        <Animatable.Text
          style={styles.incomingCallState}
          animation="fadeInDown">
          Incoming Call....
        </Animatable.Text>

        <View style={styles.incomingCallButtons}>
          <Animatable.View
            style={styles.callBtnContainer}
            animation="fadeInLeft">
            <TouchableOpacity
              onPress={() => declineCall(callId)}
              style={[styles.button, {backgroundColor: colors.invalid}]}>
              <CallDropIcon />
            </TouchableOpacity>
            <Text style={styles.btnLabel}>Cancel</Text>
          </Animatable.View>
          <Animatable.View
            style={styles.callBtnContainer}
            animation="fadeInRight">
            <TouchableOpacity
              onPress={() => answerCall()}
              style={[styles.button, {backgroundColor: colors.valid}]}>
              <CallPickIcon />
            </TouchableOpacity>
            <Text style={styles.btnLabel}>Accept</Text>
          </Animatable.View>
        </View>
      </View>
    </>
  );
};

export default IncomingCall;

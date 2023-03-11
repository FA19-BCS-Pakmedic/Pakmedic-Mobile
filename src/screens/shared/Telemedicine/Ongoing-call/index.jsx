

import {useNavigation} from '@react-navigation/native';
import React, {useState, useRef, useCallback, useEffect} from 'react';
import {
  Alert,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './styles';
import {Voximplant} from 'react-native-voximplant';
import calls from '../../../../utils/helpers/Store';

import {
  getCallSettings,
  onHangupPress,
  subscribeToCallEvents,
  subscribeToEndpointEvent,
  unsubscribeFromCallEvents,
  voximplant,
} from '../../../../services/voxServices';

const OngoingCall = ({route}) => {
  const navigation = useNavigation();

  /**
   * @param {boolean} isIncomingCall - true if the call is incoming, false if the call is outgoing
   * @param {boolean} isVideoCall - true if the call is video, false if the call is audio
   * @param {string} callee - callee is the person we are calling aka the receiver;
   */

  console.log(route.params);

  const {isIncomingCall, isVideoCall, callee} = route.params;
  const [callState, setCallState] = useState('Connecting');

  const callId = useRef(route.params?.callId); //callId is the id of the call received by the receiver

  const [localVideoStreamId, setLocalVideoStreamId] = useState('');
  const [remoteVideoStreamId, setRemoteVideoStreamId] = useState('');

  //call will store the value of the ongoing call object
  const call = useRef(null);
  const endpoint = useRef(null);

  useEffect(() => {
    async function makeCall() {
      call.current = await voximplant.call(
        callee,
        getCallSettings(isVideoCall),
      );

      //this will subscribe to call events
      onSubscribe();
      callId.current = call.current.callId;
      //calls object is a map that contains call id as a key and call object as a value
      calls.set(call.current.callId, call.current);
    }

    async function answerCall() {
      // get the call object that was set in the incoming call screen when the scenario of incoming call occurs
      call.current = calls.get(callId.current);

      onSubscribe();

      //set the endpoint of the other user i.e. the caller to be used for event subscriptions
      endpoint.current = call.current.getEndpoints()[0];
      subscribeToEndpointEvent(endpoint, setRemoteVideoStreamId); //subscribe to the endpoint events

      // answer the incoming call
      await call.current.answer(getCallSettings(true));

      console.log(remoteVideoStreamId);
    }

    if (isIncomingCall) {
      answerCall();
    } else {
      makeCall();
    }

    return function cleanup() {
      unsubscribeFromCallEvents(call);
    };
  }, [isVideoCall]);

  function onSubscribe() {
    subscribeToCallEvents(
      call,
      navigation,
      setCallState,
      setLocalVideoStreamId,
      endpoint,
      setRemoteVideoStreamId,
      showCallError,
    );
  }

  function showCallError(reason) {
    Alert.alert('Call failed', `Reason: ${reason}`, [
      {
        text: 'OK',
        onPress: () => {
          calls.delete(callId.current);
          navigation.navigate('History');
        },
      },
    ]);
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safearea}>
        <View style={styles.videoPanel}>
          <Voximplant.VideoView
            style={styles.remotevideo}
            videoStreamId={remoteVideoStreamId}
            scaleType={Voximplant.RenderScaleType.SCALE_FIT}
          />
          <Voximplant.VideoView
            style={styles.selfview}
            videoStreamId={localVideoStreamId}
            scaleType={Voximplant.RenderScaleType.SCALE_FIT}
            showOnTop={true}
          />
        </View>
        <View style={styles.callControlsVideo}>
          <Text style={styles.callConnectingLabel}>{callState}</Text>
          <TouchableOpacity
            onPress={() => onHangupPress(call)}
            style={styles.button}>
            <Text style={styles.textButton}>END CALL</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

export default OngoingCall;

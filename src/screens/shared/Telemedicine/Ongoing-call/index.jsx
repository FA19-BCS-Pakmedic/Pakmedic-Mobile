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

import CallDropIcon from '../../../../assets/svgs/CallDrop.svg';
import MicOffIcon from '../../../../assets/svgs/MicOff.svg';
import MicOnIcon from '../../../../assets/svgs/MicOn.svg';
import VideoOnIcon from '../../../../assets/svgs/VideoOn.svg';
import VideoOffIcon from '../../../../assets/svgs/VideoOff.svg';

const OngoingCall = ({route}) => {
  const navigation = useNavigation();

  /**
   * @param {boolean} isIncomingCall - true if the call is incoming, false if the call is outgoing
   * @param {string} callee - callee is the person we are calling aka the receiver;
   */

  console.log(route.params);

  const {isIncomingCall, callee, otherUsername} = route.params;
  const [callState, setCallState] = useState('Connecting');

  const callId = useRef(route.params?.callId); //callId is the id of the call received by the receiver

  const [localVideoStreamId, setLocalVideoStreamId] = useState('');
  const [remoteVideoStreamId, setRemoteVideoStreamId] = useState('');

  //call will store the value of the ongoing call object
  const call = useRef(null);
  const endpoint = useRef(null);

  const [isMuted, setIsMuted] = useState(false);
  const [isVideo, setIsVideo] = useState(false);
  const [isInitiated, setIsInitiated] = useState(false);

  useEffect(() => {
    async function makeCall() {
      call.current = await voximplant.call(callee, getCallSettings());

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
      await call.current.answer(getCallSettings(false));
    }

    if (isIncomingCall) {
      answerCall();
    } else {
      makeCall();
    }

    return function cleanup() {
      unsubscribeFromCallEvents(call);
    };
  }, [isIncomingCall, callee, otherUsername]);

  function onSubscribe() {
    subscribeToCallEvents(
      call,
      navigation,
      setCallState,
      setLocalVideoStreamId,
      endpoint,
      setRemoteVideoStreamId,
      showCallError,
      setIsInitiated,
    );
  }

  function showCallError(reason) {
    Alert.alert('Call failed', `Reason: ${reason}`, [
      {
        text: 'OK',
        onPress: () => {
          calls.delete(callId.current);
          navigation.pop();
        },
      },
    ]);
  }

  useEffect(() => {
    if (call.current && isInitiated) call.current.sendAudio(!isMuted);
  }, [isMuted]);

  useEffect(() => {
    console.log(isInitiated, isVideo);
    if (call.current && isInitiated) call.current.sendVideo(isVideo);
  }, [isVideo]);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safearea}>
        {callState === 'Connected' && (
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
        )}
        <View style={styles.outgoingPanel}>
          {!isVideo && (
            <>
              <Text style={styles.userName}>{otherUsername}</Text>
              <Text style={styles.state}>{callState}</Text>
            </>
          )}
        </View>

        <View style={styles.callControlsVideo}>
          {callState === 'Connected' && (
            <TouchableOpacity
              onPress={() => setIsMuted(prevState => !prevState)}
              style={styles.featureBtn}>
              {isMuted ? <MicOnIcon /> : <MicOffIcon />}
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={() => onHangupPress(call)}
            style={styles.button}>
            <CallDropIcon />
          </TouchableOpacity>
          {callState === 'Connected' && (
            <TouchableOpacity
              onPress={() => setIsVideo(prevState => !prevState)}
              style={styles.featureBtn}>
              {isVideo ? <VideoOffIcon /> : <VideoOnIcon />}
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    </>
  );
};

export default OngoingCall;

import {Voximplant} from 'react-native-voximplant';
import {Alert, Platform, PermissionsAndroid} from 'react-native';
import {
  VOXIMPLANT_APP,
  VOXIMPLANT_ACCOUNT,
} from '../utils/constants/Voximplant';
import calls from '../utils/helpers/Store';
import deviceStorage from '../utils/helpers/deviceStorage';

// getting the voximplant instance
export const voximplant = Voximplant.getInstance();

// permissions to be granted for the android application
export const permissions = [
  PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
  PermissionsAndroid.PERMISSIONS.CAMERA,
];

/**
 *
 * @param {boolean} isVideo boolean to check if the call is a video call or not
 * @returns object containing the call settings
 */
export const getCallSettings = isVideo => {
  const voiceCallSettings = {
    video: {
      sendVideo: false,
      receiveVideo: false,
    },
  };
  const videoCallSettings = {
    video: {
      sendVideo: true,
      receiveVideo: true,
    },
  };
  return isVideo ? videoCallSettings : voiceCallSettings;
};

/**
 *
 * @param {string} user logged in user's name
 * @param {*} password logged in user's password
 * function to login to voximplant
 */
export const loginVox = async (user, password) => {
  console.log(
    `${user}@${VOXIMPLANT_APP}.${VOXIMPLANT_ACCOUNT}.voximplant.com`,
    password,
  );
  try {
    let clientState = await voximplant.getClientState();
    if (clientState === Voximplant.ClientState.DISCONNECTED) {
      await voximplant.connect();
      await login(
        `${user}@${VOXIMPLANT_APP}.${VOXIMPLANT_ACCOUNT}.voximplant.com`,
      );
    }
    if (clientState === Voximplant.ClientState.CONNECTED) {
      await login(
        `${user}@${VOXIMPLANT_APP}.${VOXIMPLANT_ACCOUNT}.voximplant.com`,
      );
    }
  } catch (e) {
    console.log(e);
    let message;
    switch (e.name) {
      case Voximplant.ClientEvents.ConnectionFailed:
        message = 'Connection error, check your internet connection';
        break;
      case Voximplant.ClientEvents.AuthResult:
        message = convertCodeMessage(e.code);
        break;
      default:
        message = 'Unknown error. Try again';
    }
    showError(message);
  }
};

const login = async user => {
  const token = await deviceStorage.loadItem('voxToken');
  const password = 'test1234'; //TODO: this should be taken out of the local storage or env variable
  try {
    if (token) {
      // console.log('logged in with token', token, user);
      await voximplant.loginWithToken(user, token);
    } else {
      await voximplant.login(user, password);
    }
  } catch (e) {
    console.log(e);
    let message;
    switch (e.name) {
      case Voximplant.ClientEvents.ConnectionFailed:
        message = 'Connection error, check your internet connection';
        break;
      case Voximplant.ClientEvents.AuthResult:
        message = convertCodeMessage(e.code);
        break;
      default:
        message = 'Unknown error. Try again';
    }
    showError(message);
  }
}; 

/**
 *
 * @param {boolean} isVideoCall boolean to check if the call is a video call or not
 * @returns boolean value based on permissions granted
 * function to request permissions for the android application
 */
export const requestPermissions = async isVideoCall => {
  try {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.requestMultiple(permissions);
      const recordAudioGranted =
        granted[PermissionsAndroid.PERMISSIONS.RECORD_AUDIO] === 'granted';
      const cameraGranted =
        granted[PermissionsAndroid.PERMISSIONS.CAMERA] === 'granted';
      if (recordAudioGranted) {
        if (isVideoCall && !cameraGranted) {
          console.warn(
            'MainScreen: makeCall: camera permission is not granted',
          );
          return false;
        }
        return true;
      } else {
        console.warn(
          'MainScreen: makeCall: record audio permission is not granted',
        );
        return false;
      }
    }
  } catch (e) {
    console.warn(`MainScreen: makeCall failed: ${e}`);
  }
};

/**
 * @param {string} callId id of the call x
 * function to decline an incoming call
 */
export async function declineCall(callId) {
  let call = calls.get(callId);
  call.decline();
}

//function to convert the error code into a message
export function convertCodeMessage(code) {
  switch (code) {
    case 401:
      return 'Invalid password';
    case 404:
      return 'Invalid user';
    case 491:
      return 'Invalid state';
    default:
      return 'Try again later';
  }
}

// function to show the error on mobile
export function showError(message, navigation, user) {
  console.log(user);
  Alert.alert('Login error', message, [
    {
      text: 'OK',
      onPress: () => {
        if (navigation) {
          // navigation.navigate('History', {uID: user.id});
          navigation.navigate('History');
        }
      },
    },
  ]);
}

/**
 *
 * @param {ref} call reference to the call object
 * @param {object} navigation object to be navigated
 * @param {function} setCallStatus used to set the call status
 * @param {function} setLocalVideoStreamId used to set the local video stream id
 * @param {ref} endpoint reference to the endpoint object
 * @param {function} setRemoteVideoStreamId used to set the remote video stream id
 * @param {function} showCallError function to show the call error
 */
export const subscribeToCallEvents = (
  call,
  navigation,
  setCallStatus,
  setLocalVideoStreamId,
  endpoint,
  setRemoteVideoStreamId,
  showCallError,
) => {
  call.current.on(Voximplant.CallEvents.Failed, callEvent => {
    showCallError(callEvent.reason);
    onHangupPress(call);
  });
  call.current.on(Voximplant.CallEvents.ProgressToneStart, callEvent => {
    setCallStatus('Calling...');
  });
  call.current.on(Voximplant.CallEvents.Connected, callEvent => {
    setCallStatus('Connected');
  });
  call.current.on(Voximplant.CallEvents.Disconnected, callEvent => {
    calls.delete(callEvent.call.callId);
    navigation.navigate('History');
  });
  call.current.on(Voximplant.CallEvents.LocalVideoStreamAdded, callEvent => {
    setLocalVideoStreamId(callEvent.videoStream.id);
  });
  call.current.on(Voximplant.CallEvents.EndpointAdded, callEvent => {
    endpoint.current = callEvent.endpoint;
    subscribeToEndpointEvent(endpoint, setRemoteVideoStreamId);
  });
};

/**
 *
 * @param {ref} call reference to the call object
 * function to hangup the call
 */
export const onHangupPress = call => {
  call.current.hangup();
};

/**
 *
 * @param {ref} endpoint reference to the endpoint object
 * @param {function} setRemoteVideoStreamId  used to set the remote video stream id
 * function to subscribe to the endpoint events
 */
export const subscribeToEndpointEvent = async (
  endpoint,
  setRemoteVideoStreamId,
) => {
  endpoint.current.on(
    Voximplant.EndpointEvents.RemoteVideoStreamAdded,
    endpointEvent => {
      setRemoteVideoStreamId(endpointEvent.videoStream.id);
    },
  );
};

/**
 * @param {ref} call reference to the call object
 * function to unsubscribe from the call events
 */

export const unsubscribeFromCallEvents = call => {
  call.current.off(Voximplant.CallEvents.Failed);
  call.current.off(Voximplant.CallEvents.ProgressToneStart);
  call.current.off(Voximplant.CallEvents.Connected);
  call.current.off(Voximplant.CallEvents.Disconnected);
  call.current.off(Voximplant.CallEvents.LocalVideoStreamAdded);
  call.current.off(Voximplant.CallEvents.EndpointAdded);
};

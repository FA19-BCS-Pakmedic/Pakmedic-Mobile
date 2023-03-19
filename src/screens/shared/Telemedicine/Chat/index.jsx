import {View, Text, Alert} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';

import io from 'socket.io-client';

import {useSelector} from 'react-redux';

import {getDoctorById} from '../../../../services/doctorServices';

import styles from './styles';
import ChatHeader from '../../../../components/shared/ChatHeader';
import {GiftedChat} from 'react-native-gifted-chat';
import GiftedChatBubble from '../../../../components/shared/GiftedChatBubble';
import GiftedChatSend from '../../../../components/shared/GiftedChatSend';
import GiftedChatInput from '../../../../components/shared/GiftedChatInput';
import ROLES from '../../../../utils/constants/ROLES';
import {getPatientById} from '../../../../services/patientServices';
import getVoxUsername from '../../../../utils/helpers/getVoxUsername';
import {requestPermissions} from '../../../../services/voxServices';
import {baseUrl} from '../../../../utils/constants/APIendpoint';

const Chat = ({route, navigation}) => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const [socket, setSocket] = useState();

  // console.log(route.params);
  const receiverId = route.params.receiver._id;

  const [receiver] = useState(route.params.receiver);

  const role = useSelector(state => state.role.role);
  const user = useSelector(state => state.auth.user);

  const userId = user._id;

  //render bubble with custom styling
  const renderBubble = props => {
    return <GiftedChatBubble {...props} />;
  };
  //render send button with custom icon
  function renderSend(props) {
    return <GiftedChatSend {...props} />;
  }
  //render input toolbar with custom styling
  const renderInputToolbar = props => {
    return <GiftedChatInput {...props} />;
  };

  // function to create a get the room id based on the user and receiver id
  const getRoomId = useCallback(() => {
    const roomId =
      userId < receiverId ? userId + receiverId : receiverId + userId;

    return roomId.slice(10, 34);
  });

  useEffect(() => {
    const socket = io(baseUrl); //TODO: REPLACE THIS WITH THE CONSTANT
    setSocket(socket);

    return () => {
      socket.emit('leave room', {room: getRoomId()});

      socket.disconnect();

      setSocket(null);
    };
  }, []);

  useEffect(() => {
    if (receiver && socket) {
      socket.emit('join room', {
        roomID: getRoomId(),
        sender: user,
        receiver: receiver,
      });

      socket.on('room joined', data => {
        try {
          setMessages(data.messages);
        } catch (e) {
          console.log(e);
        }
      });

      socket.on('new message', data => {
        try {
          console.log('Socket on newMessage event fired');
          console.log(data);
          setMessages(previousMessages =>
            GiftedChat.append(previousMessages, data),
          );
          setIsTyping(false);
        } catch (e) {
          console.log(e);
        }
      });

      socket.on('user typing', data => {
        try {
          console.log('Socket on userTyping event fired');
          console.log(data);
          if (data.user._id === receiver._id) setIsTyping(true);
        } catch (e) {
          console.log(e);
        }
      });
    }
  }, [receiver, socket]);

  const sendMessage = message => {
    if (message && socket) {
      socket.emit('message', {
        sender: user,
        receiver: receiver,
        message: message,
        room: getRoomId(),
      });
    }
  };

  const userTyping = text => {
    text.length > 0
      ? socket.emit('typing', {
          room: getRoomId(),
          user: user,
        })
      : setIsTyping(false);
  };

  const onPressCall = async (callee, isVideoCall) => {
    const permissionsGranted = await requestPermissions(true);

    if (permissionsGranted) {
      navigation.navigate('App', {
        screen: 'OngoingCall',
        params: {
          callee,
          isVideoCall,
          isIncomingCall: false,
          otherUsername: receiver.name,
        },
      });
    }
  };

  return (
    <View style={styles.container}>
      <ChatHeader
        role={role}
        receiver={receiver}
        onPressCall={onPressCall}
        callee={getVoxUsername(receiver)}
      />
      <GiftedChat
        messages={messages}
        onInputTextChanged={text => userTyping(text)}
        onSend={message => sendMessage(message)}
        user={{
          _id: userId,
        }}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        renderSend={renderSend}
        alwaysShowSend={true}
        isTyping={isTyping}
      />
    </View>
  );
};

export default Chat;

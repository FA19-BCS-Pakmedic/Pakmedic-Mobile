import {View, Text} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import SplashScreen from 'react-native-splash-screen';

import BotSvg from '../../../assets/svgs/bot.svg';

//import container
import StaticContainer from '../../../containers/StaticContainer';

//import styles
import {styles} from './styles';
import ChatbotHeader from '../../../components/patient/ChatbotHeader';

//import service
import {chatWithBot} from '../../../services/chatbotServices';
import ChatBubble from '../../../components/shared/ChatBubble';

const Chatbot = ({route, navigation}) => {
  const [messages, setMessages] = useState([]);
  const [data, setData] = useState(null);

  // TODO: REPLACE THIS WITH A DYNAMIC SESSION ID
  const sessionId = '123456';

  // TODO: REPLACE THIS WITH DYNAMIC USER ID
  const userId = '6969';

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  // useEffect to run when ever there is data from the backend
  useEffect(() => {
    console.log(data);
    if (data) {
      const messages = [
        {
          _id: Date.now(),
          text: data.message,
          createdAt: new Date(),
          user: {
            _id: sessionId,
            name: 'Bot',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ];

      console.log(messages);

      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, messages),
      );
    }
  }, [data]);

  const onSend = useCallback(async (messages = []) => {
    console.log(messages[0]);

    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
    const data = await chatWithBot({
      message: messages[0].text,
      sessionId: sessionId,
    });

    console.log(data.data.data);
    setData(data.data.data);
  }, []);



  const renderBubble = props => {
    return (
      <ChatBubble {...props} />
    )
    
  }

  return (
    <View style={styles.container}>
      <ChatbotHeader />
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: userId,
        }}
        renderBubble={renderBubble}
      />
    </View>
  );
};

export default Chatbot;

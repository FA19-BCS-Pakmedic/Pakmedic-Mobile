import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import SplashScreen from 'react-native-splash-screen';

import BotSvg from '../../../assets/svgs/bot.svg';

import BotAvatar from '../../../assets/images/bot-container.png';

//import container
import StaticContainer from '../../../containers/StaticContainer';

//import styles
import {styles} from './styles';
import ChatbotHeader from '../../../components/patient/ChatbotHeader';

//import service
import {chatWithBot} from '../../../services/chatbotServices';
import GiftedChatBubble from '../../../components/shared/GiftedChatBubble';

//import icon
import SendIcon from '../../../assets/svgs/Send.svg';
import dimensions from '../../../utils/styles/themes/dimensions';
import GiftedChatSend from '../../../components/shared/GiftedChatSend';
import GiftedChatInput from '../../../components/shared/GiftedChatInput';

const Chatbot = ({route, navigation}) => {
  const [messages, setMessages] = useState([]);
  const [data, setData] = useState(null);

  const [isTyping, setIsTyping] = useState(false);


  // TODO: REPLACE THIS WITH A DYNAMIC SESSION ID
  const sessionId = '123456';

  // TODO: REPLACE THIS WITH DYNAMIC USER ID
  const userId = '6969';

  useEffect(() => {
    // navigation.getParent()?.setOptions({
    //   tabBarStyle: {
    //     display: 'none',
    //   },
    // });
    console.log(navigation.getParent());
    navigation.getParent().setOptions({
      tabBarStyle: {display: 'none'},
      tabBarVisible: false,
    });
    return () =>
      navigation.getParent()?.setOptions({
        tabBarStyle: undefined,
        tabBarVisible: undefined,
      });
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
            avatar: BotAvatar,
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
    messages[0] = {
      ...messages[0],
      user: {
        _id: userId,

        avatar: BotAvatar,
      },
    };

    console.log(messages[0]);

    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );


    setIsTyping(true);

    const data = await chatWithBot({
      message: messages[0].text,
      sessionId: sessionId,
    });


    setData(data.data.data);
    setIsTyping(false);

  }, []);

  //render bubble with custom styling
  const renderBubble = props => {
    return <GiftedChatBubble {...props} />;
  };
  //render send button with custom icon
  renderSend = props => {
    return <GiftedChatSend {...props} />;
  };
  //render input toolbar with custom styling
  renderInputToolbar = props => {
    return <GiftedChatInput {...props} />;
  };


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
        renderInputToolbar={renderInputToolbar}
        renderSend={renderSend}
        alwaysShowSend={true}

        isTyping={isTyping}

        // minimumInputToolbarHeight={dimensions.Height * 0.1}
      />
    </View>
  );
};

export default Chatbot;

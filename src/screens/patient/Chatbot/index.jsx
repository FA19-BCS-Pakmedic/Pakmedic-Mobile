import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
// import SplashScreen from 'react-native-splash-screen';

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
import {useSelector} from 'react-redux';
import {Specialists} from '../../../utils/constants/Specialists';

const Chatbot = ({route, navigation}) => {
  const [messages, setMessages] = useState([]);
  const [data, setData] = useState(null);

  const [isTyping, setIsTyping] = useState(false);
  const [specialist, setSpecialist] = useState('');

  const user = useSelector(state => state.auth.user);

  const sessionId = uuidv4();

  const userId = user?._id;

  useEffect(() => {
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

      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, messages),
      );
    }
  }, [data]);

  useEffect(() => console.log(specialist), [specialist]);

  const onSend = async (messages = []) => {
    messages[0] = {
      ...messages[0],
      user: {
        _id: userId,

        avatar: BotAvatar,
      },
    };

    // console.log(messages[0]);

    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );

    setIsTyping(true);

    const response = await chatWithBot({
      message: messages[0].text,
      sessionId: sessionId,
    });

    const findSpeciality = Specialists.find(
      item => item.label === response.data.data.intent,
    );

    if (findSpeciality) {
      console.log(findSpeciality);
      setSpecialist(findSpeciality.value);
    } else if (response.data.data.intent === 'searchSpecialist' && specialist) {
      navigateToSpecialists();
    }

    setData(response.data.data);
    setIsTyping(false);
  };

  const navigateToSpecialists = () => {
    // console.log('navigating', specialist, user.location);
    setTimeout(() => {
      navigation.navigate('App', {
        screen: 'DoctorsList',
        params: {speciality: specialist, location: user.location},
      });
    }, 2000);
  };

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

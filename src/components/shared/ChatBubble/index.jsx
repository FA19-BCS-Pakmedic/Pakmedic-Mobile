import {View, Text} from 'react-native';
import React from 'react';

import {Bubble} from 'react-native-gifted-chat';

// import theme
import colors from '../../../utils/styles/themes/colors';

const ChatBubble = props => {
  return (
    <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: colors.primaryMonoChrome500,
          borderBottomRightRadius: 0,
        },
        left: {
          backgroundColor: colors.secondaryMonoChrome500,

          borderBottomLeftRadius: 0,
        },
      }}
      textStyle={{
        right: {
          color: colors.secondary1,
          fontSize: 16,
        },
        left: {
          color: colors.secondary1,
          fontSize: 16,
        },
      }}
      timeTextStyle={{
        right: {
          color: colors.secondary1,
        },
        left: {
          color: colors.secondary1,
        },
      }}
    />
  );
};

export default ChatBubble;

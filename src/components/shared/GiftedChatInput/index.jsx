import {InputToolbar} from 'react-native-gifted-chat';
import colors from '../../../utils/styles/themes/colors';

const GiftedChatInput = props => {
  return (
    <InputToolbar
      {...props}
      containerStyle={{
        backgroundColor: colors.primaryMonoChrome100,
        // marginLeft: 15,
        // marginRight: 15,
        // marginBottom: 10,
        // borderRadius: 25,
        // borderWidth: 1,
        borderTopWidth: 0,
        // borderTopColor: colors.primaryMonoChrome1000,
        // borderColor: colors.primaryMonoChrome1000,
      }}
      textInputStyle={{
        color: colors.secondary1,
      }}
    />
  );
};

export default GiftedChatInput;

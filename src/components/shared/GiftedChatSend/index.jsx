import {TouchableOpacity, StyleSheet} from 'react-native';
import {Send} from 'react-native-gifted-chat';

import SendIcon from '../../../assets/svgs/Send.svg';

import dimensions from '../../../utils/styles/themes/dimensions';

export default GiftedChatSend = props => {
  return (
    <Send {...props} containerStyle={styles.sendIconContainer}>
      {/* <TouchableOpacity style={styles.sendIconContainer}> */}
      <SendIcon width={dimensions.Width * 0.1} />
      {/* </TouchableOpacity> */}
    </Send>
  );
};

const styles = StyleSheet.create({
  sendIconContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

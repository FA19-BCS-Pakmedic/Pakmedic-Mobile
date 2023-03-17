import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';

// import theme
// import colors from '../../../utils/styles/themes/colors';
import colors from '@/utils/styles/themes/colors';
import dimensions from '@/utils/styles/themes/dimensions';
import fonts from '@/utils/styles/themes/fonts';

//import bot svg
import RobotSVG from '@/assets/svgs/bot.svg';
import BackSVG from '@/assets/svgs/Backicon.svg';

import {useNavigation} from '@react-navigation/native';

const ChatbotHeader = () => {
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.root}>
      {/* backicon */}
      <TouchableOpacity style={styles.backIconContainer} onPress={goBack}>
        <BackSVG width={dimensions.Width * 0.05} />
      </TouchableOpacity>
      {/* screen header */}
      <View style={styles.headerContainer}>
        <RobotSVG width={dimensions.Width * 0.1} />
        <Text style={styles.headerText}>Pakbot</Text>
      </View>
    </View>
  );
};

export default ChatbotHeader;

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: dimensions.Height / 15,
    backgroundColor: colors.primaryMonoChrome100,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  backIconContainer: {
    position: 'absolute',
    left: dimensions.Width * 0.05,
    padding: dimensions.Height * 0.02,
    top: 0,
    bottom: 0,
  },

  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: fonts.size.font14,
    fontWeight: fonts.weight.semi,
  },
});

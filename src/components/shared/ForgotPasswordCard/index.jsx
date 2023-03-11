import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import FaIcon from 'react-native-vector-icons/FontAwesome';
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons';

// import theme
import colors from '../../../utils/styles/themes/colors';
import fonts from '../../../utils/styles/themes/fonts';
import dimensions from '../../../utils/styles/themes/dimensions';

const ForgotPasswordCard = ({title, handlePress}) => {
  return (
    <TouchableOpacity
      style={styles.root}
      onPress={() => {
        handlePress(title);
      }}>
      {title?.toLowerCase() === 'email' && (
        <FaIcon name="envelope-o" size={30} />
      )}
      {title?.toLowerCase() === 'phone' && (
        <MatIcon name="comment-text-outline" size={30} />
      )}

      <View style={styles.textContainer}>
        <Text style={styles.text}>Via {title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ForgotPasswordCard;

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: dimensions.Height / 8,
    borderWidth: 1,
    borderColor: colors.primary1,
    borderRadius: 20,
    marginVertical: dimensions.Height / 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  textContainer: {
    marginHorizontal: dimensions.Width / 20,
  },

  text: {
    fontSize: fonts.size.font16,
    fontWeight: fonts.weight.bold,
  },
});

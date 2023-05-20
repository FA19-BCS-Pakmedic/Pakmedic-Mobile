import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import fonts from '../../../utils/styles/themes/fonts';

const Message = ({image, message}) => {
  return (
    <View style={styles.container}>
      <Image source={image} style={{width: 150, height: 150}} />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    jusityContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: fonts.size.font18,
    fontWeight: fonts.weight.bold,
  },
});

import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import colors from '../../../utils/styles/themes/colors';
import fonts from '../../../utils/styles/themes/fonts';

import dimensions from '../../../utils/styles/themes/dimensions';
import Lottie from 'lottie-react-native';

const Loader = ({title}) => {
  return (
    <View style={styles.container}>
      {/* <ActivityIndicator color={colors.primary1} animating /> */}
      <View style={styles.lottie}>
        <Lottie
          style={[
            {
              transform: [{scale: 1.6}],
            },
          ]}
          source={
            // alertName?.includes('Failure') == false
            require('../../../assets/lottie/success.json')
            // : require('../../../assets/lottie/error.json')
          }
          autoPlay
          loop
          resizeMode="cover"
        />
      </View>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {
    width: dimensions.Width / 5,
    height: dimensions.Width / 5,
  },

  text: {
    fontSize: fonts.size.font18,
    fontWeight: fonts.weight.semi,
    
  },
});

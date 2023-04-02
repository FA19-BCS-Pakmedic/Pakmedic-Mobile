import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import Post from '../../../assets/svgs/notFound.svg';
import Appoint from '../../../assets/svgs/noAppointments.svg';

import dimensions from '../../../utils/styles/themes/dimensions';
import colors from '../../../utils/styles/themes/colors';
import fonts from '../../../utils/styles/themes/fonts';

const NotFound = ({
  title = 'No Data Found',
  text = 'No data found for this page',
  center = false,
  appoint = false,
}) => {
  return (
    <View style={styles(center).container}>
      {appoint ? (
        <Appoint width={dimensions.Width} height={dimensions.Height / 3.55} />
      ) : (
        <Post width={dimensions.Width} height={dimensions.Height / 3.55} />
      )}

      <Text style={styles().title}>{title}</Text>
      <Text style={styles().text}>{text}</Text>
    </View>
  );
};

const styles = center =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      marginTop: center ? dimensions.Height * 0.12 : dimensions.Height * 0.05,
    },

    title: {
      fontSize: fonts.size.font20,
      fontWeight: fonts.weight.bold,
      color: colors.secondary1,
      marginTop: dimensions.Height * 0.005,
    },
    text: {
      textAlign: 'center',
      fontSize: fonts.size.font16,
      color: colors.secondary1,
      marginTop: dimensions.Height * 0.005,
    },
  });

export default NotFound;

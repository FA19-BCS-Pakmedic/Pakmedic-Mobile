import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import ThumbsUpIcon from '../../../../assets/svgs/Thumbs-Up.svg';
import VideoCameraIcon from '../../../../assets/svgs/Video-on.svg';
import PhysicalCheckupIcon from '../../../../assets/svgs/Physical-checkup.svg';
import Button from '../../../shared/Button';
import dimensions from '../../../../utils/styles/themes/dimensions';
import colors from '../../../../utils/styles/themes/colors';
import fonts from '../../../../utils/styles/themes/fonts';

import {formatDate} from '../../../../utils/helpers/formatDate';

const ReviewCard = props => {
  const {review} = props;

  return (
    <View style={styles().container}>
      <View style={styles().headerContainer}>
        <View style={styles().headerLeftContainer}>
          <View style={styles().thumbsIconContainer}>
            <ThumbsUpIcon />
          </View>

          <View>
            <Text style={styles().verificationText}>Verified Patient</Text>
            <Text style={styles().text}>{review?.patient.name}</Text>
            <Text style={styles().postedDateText}>
              {formatDate(review?.createdAt)}
            </Text>
          </View>
        </View>

        {/* <View style={styles().headerRightContainer}>
          <View style={styles().typeIconContainer}>
            <VideoCameraIcon />
          </View>
          <Text style={styles().text}>Online Consultation</Text>
        </View> */}
      </View>

      <View style={styles().contentContainer}>
        <Text style={styles().text2}>{review?.review}</Text>
      </View>
    </View>
  );
};

export default ReviewCard;

const styles = () =>
  StyleSheet.create({
    container: {
      borderRadius: dimensions.Width / 50,
      padding: dimensions.Width / 20,
      marginBottom: dimensions.Height / 40,
      borderWidth: 2,
      borderColor: colors.primary1,
    },

    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: dimensions.Height / 50,
    },

    headerLeftContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    thumbsIconContainer: {
      marginRight: dimensions.Width / 50,
    },

    verificationText: {
      fontSize: fonts.size.font14,
      fontWeight: fonts.weight.semi,
    },

    text: {
      fontSize: fonts.size.font14,
      //maxWidth: dimensions.Width * 0.3,
    },
    text2: {
      fontSize: fonts.size.font14,
      textAlign: 'justify',
      //maxWidth: dimensions.Width * 0.9,
    },

    postedDateText: {
      fontSize: fonts.size.font12,
      color: colors.accent1,
    },

    headerRightContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    typeIconContainer: {
      marginRight: dimensions.Width / 50,
    },

    controls: {
      width: '100%',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
    },
  });

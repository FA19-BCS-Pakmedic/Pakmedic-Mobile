import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import ThumbsUpIcon from '../../../../assets/svgs/Thumbs-Up.svg';
import VideoCameraIcon from '../../../../assets/svgs/Video-on.svg';
import PhysicalCheckupIcon from '../../../../assets/svgs/Physical-checkup.svg';
import Button from '../../../shared/Button';
import dimensions from '../../../../utils/styles/themes/dimensions';
import colors from '../../../../utils/styles/themes/colors';
import fonts from '../../../../utils/styles/themes/fonts';

const ReviewCard = ({setOpen}) => {
  return (
    <View style={styles().container}>
      <View style={styles().headerContainer}>
        <View style={styles().headerLeftContainer}>
          <View style={styles().thumbsIconContainer}>
            <ThumbsUpIcon />
          </View>

          <View>
            <Text style={styles().verificationText}>Verified Patient</Text>
            <Text style={styles().text}>Haris</Text>
            <Text style={styles().postedDateText}>Posted 2 days ago</Text>
          </View>
        </View>

        <View style={styles().headerRightContainer}>
          <View style={styles().typeIconContainer}>
            <VideoCameraIcon />
          </View>
          <Text style={styles().text}>Online Consultation</Text>
        </View>
      </View>

      <View style={styles().contentContainer}>
        <Text style={styles().text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sapien
          suspendisse. Nunc ac ante turpis vestibulum neque sit. Risus, auctor
          neque venenatis, quis amet neque. Neque sit pellentesque augue sapien.
          Vestibulum in enim purus purus dictumst vitae scelerisque nisi. Eget
          eget in malesuada sit gravida eros gravidfermentum nulla viverra. T
        </Text>
      </View>

      <View style={styles().controls}>
        <Button
          type="filled"
          label="Report Review"
          onPress={() => {
            setOpen(prevState => {
              return !prevState;
            });
          }}
          width={dimensions.Width / 2.6}
        />
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

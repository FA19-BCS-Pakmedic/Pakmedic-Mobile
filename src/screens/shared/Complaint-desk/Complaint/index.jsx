import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';

//import {styles} from './styles';

import dimensions from '../../../../utils/styles/themes/dimensions';
import colors from '../../../../utils/styles/themes/colors';
import fonts from '../../../../utils/styles/themes/fonts';

import StatusG from '../../../../assets/svgs/statusG.svg';
import StatusR from '../../../../assets/svgs/statusR.svg';
import StatusY from '../../../../assets/svgs/statusY.svg';

import ScrollContainer from '../../../../containers/ScrollContainer';
import Button from '../../../../components/shared/Button';

const Complaint = props => {
  const {item} = props.route.params;
  return (
    <ScrollContainer
      customHeaderEnable
      customHeaderName={`Ticket # ${item.id}`}
      isBack
      isHorizontalPadding>
      <View style={styles.container}>
        <View style={styles.subjContainer}>
          <View style={styles.Left}>
            <Text style={styles.Heading}>Subject</Text>
            <Text style={styles.text}>{item.subject}</Text>
          </View>
          <View style={styles.Right}>
            {item.status === 'on Hold' ? (
              <StatusR />
            ) : item.status === 'In Progress' ? (
              <StatusY />
            ) : (
              <StatusG />
            )}
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.Heading}>Complaint</Text>
          <Text style={styles.complainText}>{item.complaint}</Text>
        </View>
        <View style={styles.complaineeContainer}>
          <Text style={styles.Heading}>Complainee</Text>
          <View style={styles.complaineeCard}>
            <View style={styles.cardLeft}>
              <View style={styles.detailLeft}>
                <Image
                  style={styles.img}
                  source={require('../../../../assets/images/default-avatar.png')}
                />
              </View>
              <View style={styles.detailRight}>
                <Text style={styles.text}>{item.complainee}</Text>
                <Text style={styles.text}>+92-332-xxxxx</Text>
              </View>
            </View>
            <View style={styles.cardRight}>
              <Button
                label={'View Profile'}
                type={'filled'}
                width={dimensions.Width * 0.3}
                height={dimensions.Height * 0.04}
                fontSize={fonts.size.font12}
                color={colors.primary1}
                onPress={() => {}}
              />
            </View>
          </View>
        </View>

        <View style={styles.reviewContainer}>
          <Text style={styles.Heading}>Review Comment</Text>
          {item.status === 'In Progress' ? (
            <Text style={styles.reviewText}>No review comment yet</Text>
          ) : (
            <Text style={styles.reviewText}>
              We have received your complaint and will get back to you soon and
              will resolve your issue as soon as possible. please be patient.
            </Text>
          )}
        </View>
      </View>
    </ScrollContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subjContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    //marginTop: dimensions.Height * 0.01,
  },
  Right: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  Heading: {
    fontSize: fonts.size.font16,
    fontWeight: 'bold',
    color: colors.secondary1,
    maxWidth: dimensions.Width * 0.5,
    marginBottom: dimensions.Height * 0.01,
  },
  statusText: {
    fontSize: fonts.size.font14,
    fontWeight: 'bold',
    color: colors.secondary1,
    marginLeft: dimensions.Width * 0.01,
    marginBottom: dimensions.Height * 0.0025,
  },
  text: {
    fontSize: fonts.size.font12,

    maxWidth: dimensions.Width * 0.7,
  },
  complainText: {
    fontSize: fonts.size.font12,
    backgroundColor: colors.secondaryMonoChrome100,
    padding: dimensions.Width * 0.02,
    marginTop: dimensions.Height * 0.01,
    alignSelf: 'center',
    borderRadius: 10,
  },
  detailContainer: {
    marginTop: dimensions.Height * 0.03,
  },
  complaineeContainer: {
    marginTop: dimensions.Height * 0.03,
  },
  complaineeCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: dimensions.Width * 0.85,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: colors.primary1,
    padding: dimensions.Width * 0.02,
    borderRadius: 10,
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailLeft: {
    marginRight: dimensions.Width * 0.02,
  },
  detailRight: {
    alignItems: 'flex-start',
  },
  img: {
    width: dimensions.Width * 0.1,
    height: dimensions.Width * 0.1,
    borderRadius: 100,
  },

  reviewContainer: {
    marginTop: dimensions.Height * 0.03,
  },
  reviewText: {
    fontSize: fonts.size.font12,
    backgroundColor: colors.primaryMonoChrome100,
    padding: dimensions.Width * 0.02,
    marginTop: dimensions.Height * 0.01,
    alignSelf: 'center',
    borderRadius: 10,
  },
});

export default Complaint;

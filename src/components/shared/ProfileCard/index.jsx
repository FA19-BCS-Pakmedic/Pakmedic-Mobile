import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import Button from '../Button';
import colors from '../../../utils/styles/themes/colors';
import dimensions from '../../../utils/styles/themes/dimensions';
import LocationSvg from '../../../assets/svgs/LocationIcon.svg';
import SpecialistSvg from '../../../assets/svgs/SpecialistIcon.svg';
import StarSvg from '../../../assets/svgs/FullStarIcon.svg';
import fonts from '../../../utils/styles/themes/fonts';
import {useSelector} from 'react-redux';
import ROLES from '../../../utils/constants/ROLES';
import {apiEndpoint} from '../../../utils/constants/APIendpoint';

import TicketAddModal from '../TicketAddModal';

const ProfileCard = ({user, isViewing}) => {
  const role = useSelector(state => state.role.role);

  const navigation = useNavigation();

  const navigateToEditProfile = () => {
    navigation.navigate('App', {
      screen: 'EditProfile',
      params: {userId: user._id},
    });
  };

  const [AddModalVisible, setAddVisible] = React.useState(false);

  const getRatings = doctor => {
    const ratings = doctor.reviews.map(review => review.ratings);
    const total = ratings.reduce((acc, curr) => acc + curr, 0);
    return (total / ratings.length || 0).toFixed(1);
  };

  useEffect(() => {
    if (user && user.role === ROLES.doctor) {
      user.ratings = getRatings(user);
    }
  }, [user]);

  return (
    <View style={styles(role).container}>
      <Image
        source={{
          uri: `${apiEndpoint}files/${user?.avatar}`,
        }}
        style={[
          styles().avatar,
          {width: dimensions.Width / 5, height: dimensions.Width / 5},
        ]}
      />
      <View style={styles().profileInfoContainer}>
        <Text style={styles().name}>Dr. {user?.name}</Text>
        <View style={styles().iconTextContainer}>
          <LocationSvg width={dimensions.Width / 20} />
          <Text style={styles().otherInfo}>{user?.location}</Text>
        </View>
        {user && user.role !== ROLES.patient && (
          <>
            <View style={styles().iconTextContainer}>
              <SpecialistSvg width={dimensions.Width / 20} />
              <Text style={styles().otherInfo}>{user?.speciality}</Text>
            </View>
            <View style={styles().iconTextContainer}>
              <StarSvg width={dimensions.Width / 20} fill="#FBBC04" />
              <Text
                style={[
                  styles().otherInfo,
                  {
                    fontWeight: fonts.weight.low,
                    color: colors.secondaryMonoChrome800,
                  },
                ]}>
                {getRatings(user)}/5.0 ({user.reviews.length} reviews)
              </Text>
            </View>
          </>
        )}
      </View>
      <View style={styles().buttonContainer}>
        {!isViewing ? (
          <Button
            label="Edit Profile"
            width={dimensions.Width / 3}
            type="filled"
            onPress={navigateToEditProfile}
            height={dimensions.Height / 20}
          />
        ) : (
          <Button
            label="Report User"
            width={dimensions.Width / 3}
            type="filled"
            onPress={() => {
              setAddVisible(true);
            }}
            height={dimensions.Height / 20}
          />
        )}
      </View>
      <TicketAddModal
        Visible={AddModalVisible}
        setModalVisible={setAddVisible}
        edit={false}
        report={'User'}
        userData={{
          complainee: user?._id,
          complaineeType: user?.role,
        }}
      />
    </View>
  );
};

export default ProfileCard;

const styles = role =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: dimensions.Height / 5,
      backgroundColor:
        role === ROLES.doctor
          ? colors.secondaryMonoChrome300
          : colors.primaryMonoChrome300,
      borderRadius: 10,
      position: 'relative',
      marginTop: dimensions.Height / 20,
    },

    avatar: {
      position: 'absolute',
      top: -(dimensions.Height / 20),
      left: dimensions.Width / 20,

      borderRadius: 100,
      borderWidth: 2,
      borderColor: colors.primaryMonoChrome700,
    },

    profileInfoContainer: {
      marginTop: dimensions.Height / 18,
      marginLeft: dimensions.Width / 10,
    },

    name: {
      fontSize: fonts.size.font20,
      fontWeight: fonts.weight.bold,
      maxWidth: dimensions.Width / 2,
    },
    iconTextContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      // justifyContent: 'center',
      marginVertical: dimensions.Height / 600,
    },
    otherInfo: {
      fontSize: fonts.size.font16,
      fontWeight: fonts.weight.semi,
    },
    buttonContainer: {
      position: 'absolute',
      right: dimensions.Width / 30,
      top: dimensions.Height / 40000,
    },
  });

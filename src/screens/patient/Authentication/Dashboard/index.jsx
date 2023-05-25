import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Touchable,
} from 'react-native';
//import {styles} from './styles';

import {useSelector} from 'react-redux';
import React from 'react';
import ScrollContainer from '../../../../containers/ScrollContainer';
import {useNavigation} from '@react-navigation/native';

import Button from '../../../../components/shared/Button';

import dimensions from '../../../../utils/styles/themes/dimensions';
import colors from '../../../../utils/styles/themes/colors';
import fonts from '../../../../utils/styles/themes/fonts';
import StarSvg from '../../../../assets/svgs/FullStarIcon.svg';

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import useCustomApi from '../../../../hooks/useCustomApi';
import {getDashboardData} from '../../../../services/patientServices';
import {apiEndpoint} from '../../../../utils/constants/APIendpoint';
import {Specialists} from '../../../../utils/constants/Specialists';
import Loader from '../../../../components/shared/Loader';
import {formatDate} from '../../../../utils/helpers/formatDate';
import TickIcon from '../../../../assets/svgs/tick2.svg';

const Dashboard = () => {
  const user = useSelector(state => state.auth.user);
  console.log(user);

  const navigation = useNavigation();

  const [appointments, setAppointments] = React.useState([]);
  const [topDoctors, setTopDoctors] = React.useState([]);
  const [topSpecialities, setTopSpecialities] = React.useState([]);
  const [latestPost, setLatestPost] = React.useState(null);
  const [data, setData] = React.useState(null);

  const {callApi, error, isLoading, setMessage} = useCustomApi();

  const statements = [
    'Get replies from verified doctors for free',
    'Join communities of your likeness',
    'Ask Questions anytime',
    'Ask Anonymously',
  ];

  React.useEffect(() => {
    if (data && data.data) {
      const responseData = data.data;

      setAppointments(responseData.appointments);

      const specialties = Specialists.filter(specialty => {
        return responseData.topSpecialities.includes(specialty.label);
      });

      setTopSpecialities(specialties);

      setTopDoctors(responseData.topDoctors);

      setLatestPost(responseData.latestPost[0]);
    }
  }, [data]);

  React.useEffect(() => {
    const getData = async () => {
      const data = await callApi(getDashboardData, user._id);
      setData(data);
    };
    if (user && user._id) {
      getData();
    }
  }, [user]);

  const navigate = screenName => {
    navigation.navigate('App', {
      screen: screenName,
    });
  };

  const getRatings = doctor => {
    const ratings = doctor.reviews.map(review => review.ratings);
    const total = ratings.reduce((acc, curr) => acc + curr, 0);
    return (total / ratings.length || 0).toFixed(1);
  };

  if (isLoading) {
    return <Loader title="Loading Dashboard Data....." />;
  }

  return (
    <ScrollContainer isTab>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Hi, {user?.name}</Text>
          <Text style={styles.subTitle}>How are we feeling today?</Text>
        </View>
        <View style={styles.appContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.appTitle}>Upcoming Appointments:</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('AppointmentScreen');
              }}>
              <Text style={styles.viewAll}>View All</Text>
            </TouchableOpacity>
          </View>
          {appointments?.length === 0 ? (
            <Text style={styles.empty}>No upcoming appointments</Text>
          ) : (
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              data={appointments}
              renderItem={({item}) => (
                <View
                  style={{width: dimensions.Width * 0.9, alignItems: 'center'}}>
                  <View style={styles.appointment}>
                    <View style={styles.imgContainer}>
                      <Image
                        style={styles.img}
                        source={{
                          uri: `${apiEndpoint}files/${
                            item.doctor.avatar
                              ? item.doctor.avatar
                              : 'default.png'
                          }`,
                        }}
                      />
                    </View>
                    <View style={styles.timeContainer}>
                      <Text style={styles.name}>Dr.{item.doctor.name}</Text>
                      <Text style={styles.speciality}>
                        {item.doctor.speciality}
                      </Text>
                      <Text style={styles.time}>
                        {new Date(item.date).toLocaleString().split(',')[0]}
                        {'  '}
                        {item.time}
                      </Text>
                      <Button
                        type={'filled'}
                        label={'View Details'}
                        onPress={() => {
                          navigation.navigate('AppointmentDetails', {
                            data: item._id,
                          });
                        }}
                        height={dimensions.Height * 0.05}
                        width={dimensions.Width * 0.3}
                        fontSize={fonts.size.font14}
                      />
                    </View>
                  </View>
                </View>
              )}
              keyExtractor={item => item._id.toString()}
              initialNumToRender={1}
              snapToInterval={dimensions.Width * 0.9}
              decelerationRate={0.5}
            />
          )}

          <View style={styles.textContainer}>
            <Text style={styles.appTitle}>Most Searched Specialists</Text>
            <TouchableOpacity
              onPress={() => {
                navigate('Specialists');
              }}>
              <Text style={styles.viewAll}>View All</Text>
            </TouchableOpacity>
          </View>
          {topSpecialities?.length === 0 ? (
            <Text style={styles.empty}>No specialities availibility</Text>
          ) : (
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              data={topSpecialities}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={{width: dimensions.Width * 0.3, alignItems: 'center'}}
                  onPress={() => {
                    navigation.navigate('DoctorsList', {
                      speciality: item.label,
                    });
                  }}>
                  <View style={styles.appointments}>
                    <View style={styles.imgContainer}>
                      <Image style={styles.imgs} source={item.icon} />
                      <Text style={styles.speciality}>{item.label}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={item => item.label}
              initialNumToRender={1}
              snapToInterval={dimensions.Width * 0.9}
              decelerationRate={0.5}
            />
          )}
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.appTitle}>Top Doctors</Text>
        </View>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          data={topDoctors}
          renderItem={({item}) => (
            <View
              style={{width: dimensions.Width * 0.9, alignItems: 'center'}}
              key={item._id}>
              <View style={styles.appointment}>
                <View style={styles.imgContainer}>
                  <Image
                    source={{
                      uri: `${apiEndpoint}files/${
                        item.avatar ? item.avatar : 'default.png'
                      }`,
                    }}
                    style={styles.img}
                    width={100}
                    height={100}
                  />
                </View>
                <View style={styles.timeContainer}>
                  <Text style={styles.name}>Dr.{item.name}</Text>
                  <Text style={styles.speciality}>{item.speciality}</Text>
                  <Text
                    style={[
                      styles.speciality,
                      {
                        fontWeight: fonts.weight.semi,
                        alignItems: 'center',
                        justifyContent: 'center',
                      },
                    ]}>
                    <StarSvg />
                    {getRatings(item)} / 5.0 ({item.reviews.length} review/s)
                  </Text>
                  <Button
                    type={'filled'}
                    label={'View Details'}
                    onPress={() => {
                      navigation.navigate('ViewProfile', {
                        userId: item._id,
                        isViewing: true,
                      });
                    }}
                    height={dimensions.Height * 0.05}
                    width={dimensions.Width * 0.3}
                    fontSize={fonts.size.font14}
                  />
                </View>
              </View>
            </View>
          )}
          keyExtractor={item => item._id}
          initialNumToRender={1}
          snapToInterval={dimensions.Width * 0.9}
          decelerationRate={0.5}
        />

        <View style={styles.textContainer}>
          <Text style={styles.appTitle}>Health Communities</Text>
        </View>

        {!latestPost ? (
          <Text style={styles.empty}>No community posts are available.</Text>
        ) : (
          <View style={styles.communityContainer}>
            <View style={styles.communityCard}>
              <View style={{padding: dimensions.Height / 100}}>
                <View style={styles.communityHeader}>
                  <Image
                    source={{
                      uri: `${apiEndpoint}files/${
                        latestPost?.author?.avatar
                          ? latestPost?.author?.avatar
                          : 'default.png'
                      }`,
                    }}
                    style={{
                      width: dimensions.Width / 7,
                      height: dimensions.Width / 7,
                      borderRadius: dimensions.Width,
                      marginRight: dimensions.Width / 50,
                    }}
                  />
                  <View style={styles.headerContent}>
                    <Text style={[styles.name, {fontSize: fonts.size.font20}]}>
                      C/{latestPost?.community?.name}
                    </Text>
                    <Text style={styles.userName}>
                      u/
                      {latestPost?.isAnonymous
                        ? 'Anonymous'
                        : latestPost?.author?.name}
                    </Text>
                  </View>
                </View>
                <View style={styles.post}>
                  <Text style={[styles.title]}>{latestPost?.title}</Text>
                  <Text style={styles.content}>{latestPost?.content}</Text>
                  <Text style={styles.posted}>
                    {formatDate(new Date(latestPost?.date))}
                  </Text>
                </View>
              </View>
              <View style={styles.footer}>
                {statements.map(statement => {
                  return (
                    <View style={styles.statementContainer} key={statement}>
                      <TickIcon />
                      <Text style={styles.statement}>{statement}</Text>
                    </View>
                  );
                })}
                <View style={{alignItems: 'center'}}>
                  <Button
                    type={'filled'}
                    label={'View Communities'}
                    onPress={() => {
                      navigation.navigate('Support Communities');
                    }}
                    width={'90%'}
                  />
                </View>
              </View>
            </View>
          </View>
        )}
      </View>
    </ScrollContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    marginTop: dimensions.Height * 0.02,
  },
  header: {
    width: dimensions.Width * 0.9,
  },
  subTitle: {
    marginTop: dimensions.Height * 0.01,
    fontSize: fonts.size.font14,
    color: colors.secondary1,
  },
  title: {
    alignSelf: 'flex-start',
    borderBottomWidth: 2,
    fontSize: fonts.size.font20,
    fontWeight: 'bold',
  },
  appContainer: {
    marginTop: dimensions.Height * 0.03,
  },
  appTitle: {
    fontSize: fonts.size.font16,
    fontWeight: 'bold',
  },
  appointment: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: dimensions.Width * 0.8,
    height: dimensions.Height * 0.2,
    marginVertical: dimensions.Height * 0.03,
    borderWidth: 2,
    borderColor: colors.primary1,
    borderRadius: dimensions.Width * 0.03,
  },
  appointments: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: dimensions.Width * 0.25,
    height: dimensions.Height * 0.15,
    marginVertical: dimensions.Height * 0.03,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: colors.primary1,
  },
  imgContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    height: dimensions.Height * 0.12,
    width: dimensions.Height * 0.12,
    elevation: 5,
    borderRadius: 50,
  },
  imgs: {
    height: dimensions.Height * 0.08,
    width: dimensions.Height * 0.08,
    elevation: 5,
    borderRadius: 50,
  },
  name: {
    fontSize: fonts.size.font14,
    fontWeight: 'bold',
  },
  timeContainer: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  time: {
    fontSize: fonts.size.font12,
    fontWeight: 'bold',
    color: colors.accent1,
  },
  analyticsContainer: {
    //flexDirection: 'row',
    alignItems: 'center',
    //marginVertical: dimensions.Height * 0.05,
  },
  ringContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  ring: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  chartContainer: {
    justifyContent: 'center',
    marginVertical: dimensions.Height * 0.02,
  },
  name: {
    fontSize: fonts.size.font16,
    fontWeight: 'bold',
  },
  speciality: {
    fontSize: fonts.size.font12,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  empty: {
    fontSize: fonts.size.font16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.accent1,
    width: '100%',
    marginVertical: dimensions.Height / 20,
  },

  doctorCardContainer: {
    marginRight: dimensions.Width * 0.05,
    width: dimensions.Width / 1.2,
    marginTop: dimensions.Height * 0.02,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: dimensions.Height / 5,
  },

  doctorCard: {
    width: dimensions.Width / 1.3,
    borderWidth: 2,
    borderColor: colors.primary1,
    height: dimensions.Height / 5,
    borderRadius: dimensions.Width / 100,
  },

  communityContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: dimensions.Height / 30,
    paddingBottom: dimensions.Height / 20,
  },

  communityCard: {
    width: dimensions.Width / 1.2,
    borderWidth: 1,
    borderColor: colors.primary1,
    borderRadius: dimensions.Width / 50,
  },

  communityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: dimensions.Width / 50,
    borderBottomWidth: 1,
    borderColor: colors.gray,
    marginBottom: dimensions.Height / 100,
  },
  headerContent: {
    marginLeft: dimensions.Width / 50,
  },
  userName: {
    marginTop: dimensions.Height / 500,
  },

  // title
  content: {
    fontSize: fonts.size.font14,
    color: colors.secondary2,
    marginVertical: dimensions.Height / 100,
  },
  posted: {
    color: colors.accent1,
  },
  footer: {
    backgroundColor: colors.primaryMonoChrome100,
    padding: dimensions.Width / 50,
  },
  statementContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: dimensions.Height / 100,
  },
  statement: {
    marginLeft: dimensions.Width / 50,
  },
});

export default Dashboard;

import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
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

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';

const Dashboard = () => {
  const user = useSelector(state => state.auth.user);
  console.log(user);

  const navigation = useNavigation();

  const [appointments, setAppointments] = React.useState([
    {
      id: 1,
      name: 'Kashaf',
      time: '10:00 AM',
      date: 'Feb, 24',
      speciality: 'Dentist',
    },
    {
      id: 2,
      name: 'Moeed',
      time: '12:00 PM',
      date: 'Jan, 24',
      speciality: 'Uroligist',
    },
    {
      id: 3,
      name: 'Haris',
      time: '7:00 PM',
      date: 'Aug, 31',
      speciality: 'Dentist',
    },
  ]);

  const Citydata = [
    {
      name: 'Karachi',
      appointments: 70,
      color: colors.primaryMonoChrome700,
      legendFontColor: colors.black,
      legendFontSize: 15,
    },
    {
      name: 'Lahore',
      appointments: 90,
      color: colors.primaryMonoChrome300,
      legendFontColor: colors.black,
      legendFontSize: 15,
    },
    {
      name: 'Islamabad',
      appointments: 60,
      color: colors.primary3,
      legendFontColor: colors.black,
      legendFontSize: 15,
    },
    {
      name: 'Rawalpindi',
      appointments: 28,
      color: colors.primary1,
      legendFontColor: colors.black,
      legendFontSize: 15,
    },
    {
      name: 'Peshawar',
      appointments: 20,
      color: colors.primaryMonoChrome500,
      legendFontColor: colors.black,
      legendFontSize: 15,
    },
  ];

  const chartConfig = {
    backgroundGradientFrom: colors.secondaryMonoChrome100,
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: colors.secondaryMonoChrome500,
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  const moreAppointments = [
    {
      id: 1,
      speciality: 'Dentist',
    },
    {
      id: 2,
      speciality: 'Uroligist',
    },
    {
      id: 3,
      speciality: 'Physician',
    },
    {
      id: 13,
      speciality: 'Theropist',
    },
    {
      id: 24,
      speciality: 'Gynecologist',
    },
    {
      id: 31,
      speciality: 'Neurologist',
    },
    {
      id: 19,
      speciality: 'Cardiologist',
    },
    {
      id: 22,
      speciality: 'ENT Specialist',
    },
    {
      id: 36,
      speciality: 'Dermatologist',
    },
  ];

  const navigate = screenName => {
    navigation.navigate('App', {
      screen: screenName,
    });
  };

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
            <TouchableOpacity onPress={() => {}}>
              <Text style={styles.viewAll}>View All</Text>
            </TouchableOpacity>
          </View>
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
                      source={require('../../../../assets/images/default-avatar.png')}
                    />
                  </View>
                  <View style={styles.timeContainer}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.speciality}>{item.speciality}</Text>
                    <Text style={styles.time}>
                      {item.date}
                      {'  '}
                      {item.time}
                    </Text>
                    <Button
                      type={'filled'}
                      label={'View Details'}
                      height={dimensions.Height * 0.05}
                      width={dimensions.Width * 0.3}
                      fontSize={fonts.size.font14}
                    />
                  </View>
                </View>
              </View>
            )}
            keyExtractor={item => item.id.toString()}
            initialNumToRender={1}
            snapToInterval={dimensions.Width * 0.9}
            decelerationRate={0.5}
          />
          <View style={styles.textContainer}>
            <Text style={styles.appTitle}>Most Searched Specialists</Text>
            <TouchableOpacity
              onPress={() => {
                navigate('Specialists');
              }}>
              <Text style={styles.viewAll}>View All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={moreAppointments}
            renderItem={({item}) => (
              <View
                style={{width: dimensions.Width * 0.3, alignItems: 'center'}}>
                <View style={styles.appointments}>
                  <View style={styles.imgContainer}>
                    <Image
                      style={styles.imgs}
                      source={require('../../../../assets/images/comms.png')}
                    />
                    <Text style={styles.speciality}>{item.speciality}</Text>
                  </View>
                </View>
              </View>
            )}
            keyExtractor={item => item.id.toString()}
            initialNumToRender={1}
            snapToInterval={dimensions.Width * 0.9}
            decelerationRate={0.5}
          />
        </View>

        <View style={styles.analyticsContainer}>
          <View style={styles.chartContainer}>
            <Text style={styles.appTitle}>Appointments by City:</Text>
            <PieChart
              data={Citydata}
              width={dimensions.Width * 0.9}
              height={dimensions.Height * 0.3}
              chartConfig={chartConfig}
              accessor={'appointments'}
              backgroundColor={'transparent'}
              paddingLeft={'15'}
              absolute
            />
          </View>
        </View>
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
    // marginHorizontal: dimensions.Width * 0.03,
    fontSize: fonts.size.font16,
    fontWeight: 'bold',
    // borderWidth: 1,
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
});

export default Dashboard;

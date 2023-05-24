import {View, Text, Image, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
//import {styles} from './styles';

import {useSelector} from 'react-redux';
import React from 'react';
import ScrollContainer from '../../../../containers/ScrollContainer';

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
import useCustomApi from '../../../../hooks/useCustomApi';
import { getDashboardData } from '../../../../services/doctorServices';
import { apiEndpoint } from '../../../../utils/constants/APIendpoint';
import { useNavigation } from '@react-navigation/native';
import Loader from '../../../../components/shared/Loader';

const Dashboard = () => {
  const user = useSelector(state => state.auth.user);

  const [appointments, setAppointments] = React.useState([]);
  const [Citydata, setCitydata] = React.useState([]);
  const [data, setData] = React.useState(null);

  const navigation = useNavigation();

  const chartColors = {
    secondary1: '#003762',
    secondary2: '#005BA1',
    secondary3: '#2087D6',
    secondaryMonoChrome100: '#E0F1FF',
    secondaryMonoChrome300: '#D2EAFF',
    secondaryMonoChrome500: '#B6DEFF',
    secondaryMonoChrome700: '#3D77A7',
    secondaryMonoChrome800: '#005496',
    secondaryMonoChrome900: '#004174',
    secondaryMonoChrome1000: '#003056',
  }
  
  const {
    callApi, error, isLoading, setMessage
  } = useCustomApi();

  React.useEffect(() => {

    if(data && data.success) {
      setAppointments(data.data.appointments);
      // console.log(data.data.appointments[1]);
      console.log(data.data);
      setCitydata(convertedData(data.data.locations));
    }

  }, [data]);

  
  React.useEffect(() => {
    const getData = async () => {
      const data = await callApi(getDashboardData, user._id);
      setData(data);
    }
    if(user && user._id) {
      getData();
    }
  }, [user]);

  const convertedData = (data,) => data.map((item, index) => ({
    name: item._id[0] || 'Unknown',
    appointments: item.count,
    color: Object.values(chartColors)[index % Object.values(chartColors).length],
    legendFontColor: colors.black,
    legendFontSize: 15
  }));


  // const Citydata = [
  //   {
  //     name: 'Karachi',
  //     appointments: 70,
  //     color: colors.secondaryMonoChrome700,
  //     legendFontColor: colors.black,
  //     legendFontSize: 15,
  //   },
  //   {
  //     name: 'Lahore',
  //     appointments: 90,
  //     color: colors.secondaryMonoChrome300,
  //     legendFontColor: colors.black,
  //     legendFontSize: 15,
  //   },
  //   {
  //     name: 'Islamabad',
  //     appointments: 60,
  //     color: colors.secondary3,
  //     legendFontColor: colors.black,
  //     legendFontSize: 15,
  //   },
  //   {
  //     name: 'Rawalpindi',
  //     appointments: 28,
  //     color: colors.secondary1,
  //     legendFontColor: colors.black,
  //     legendFontSize: 15,
  //   },
  //   {
  //     name: 'Peshawar',
  //     appointments: 20,
  //     color: colors.secondaryMonoChrome500,
  //     legendFontColor: colors.black,
  //     legendFontSize: 15,
  //   },
  // ];

  const earning = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [
          10, // January
          25, // February
          14, // March
          40, // April
          7, // May
          50, // June
        ],
      },
    ],
  };

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

  
  if(isLoading) {
    return (
      <Loader
        title="Loading Dashboard Data....."
      />
    )
  }

  return (
    <ScrollContainer isTab>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Doctor {user?.name}</Text>
        </View>
        <View style={styles.appContainer}>
        <View style={styles.textContainer}>
            <Text style={styles.appTitle}>Upcoming Appointments:</Text>
            <TouchableOpacity onPress={() => {
              navigation.navigate('AppointmentScreen');
            }}>
              <Text style={styles.viewAll}>View All</Text>
            </TouchableOpacity>
          </View>
          {appointments?.length === 0 ? <Text style={styles.empty}>No upcoming appointments</Text> :
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
                      source={{uri: `${apiEndpoint}files/${item?.patient?.avatar ? item.patient.avatar : 'default.png'}`}}
                    />
                  </View>
                  <View style={styles.timeContainer}>
                    <Text style={styles.name}>{item?.patient?.name ? item.patient.name : 'Test User'}</Text>
                    <Text style={styles.time}>
                      {new Date(item.date).toLocaleString().split(",")[0]}
                      {'  '}
                      {item.time}
                    </Text>
                    <Button
                      type={'filled'}
                      label={'View Details'}
                      onPress={() => {
                        navigation.navigate('AppointmentDetails', {
                          data: item._id
                        })
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
        }
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
          <View style={styles.chartContainer}>
            <Text style={styles.appTitle}>Earnings by months (Rs.):</Text>
            <LineChart
              data={earning}
              width={dimensions.Width * 0.9} // from react-native
              height={dimensions.Height * 0.25}
              yAxisSuffix="k"
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundGradientFrom: colors.secondary2,
                backgroundGradientTo: colors.secondary1,
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: '6',
                  strokeWidth: '2',
                  stroke: colors.primary1,
                },
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
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
  title: {
    alignSelf: 'flex-start',
    borderBottomWidth: 2,
    fontSize: fonts.size.font20,
    fontWeight: 'bold',
  },
  appContainer: {
    marginTop: dimensions.Height * 0.05,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
});

export default Dashboard;

import {View, Text, Image, FlatList, StyleSheet} from 'react-native';
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

const Dashboard = () => {
  const user = useSelector(state => state.auth.user);
  console.log('user', user);

  const [appointments, setAppointments] = React.useState([
    {
      id: 1,
      name: 'Kashaf',
      time: '10:00 AM',
      date: '12/12/2020',
      status: 'pending',
    },
    {
      id: 2,
      name: 'Moeed',
      time: '12:00 PM',
      date: '12/04/2023',
      status: 'completed',
    },
    {
      id: 3,
      name: 'Haris',
      time: '7:00 PM',
      date: '02/05/2020',
      status: 'pending',
    },
  ]);
  const Appointmentdata = {
    labels: ['pending', 'completed', 'cancelled'], // modified labels
    data: [0.4, 0.8, 0.6],
  };

  const Citydata = [
    {
      name: 'Karachi',
      appointments: 70,
      color: colors.secondaryMonoChrome700,
      legendFontColor: colors.black,
      legendFontSize: 15,
    },
    {
      name: 'Lahore',
      appointments: 90,
      color: colors.secondaryMonoChrome300,
      legendFontColor: colors.black,
      legendFontSize: 15,
    },
    {
      name: 'Islamabad',
      appointments: 60,
      color: colors.secondary3,
      legendFontColor: colors.black,
      legendFontSize: 15,
    },
    {
      name: 'Rawalpindi',
      appointments: 28,
      color: colors.secondary1,
      legendFontColor: colors.black,
      legendFontSize: 15,
    },
    {
      name: 'Peshawar',
      appointments: 20,
      color: colors.secondaryMonoChrome500,
      legendFontColor: colors.black,
      legendFontSize: 15,
    },
  ];

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

  return (
    <ScrollContainer isTab>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Doctor {user?.name}</Text>
        </View>
        <View style={styles.appContainer}>
          <Text style={styles.appTitle}>Upcoming Appointments:</Text>
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
                    <Text style={styles.name}>{item.name}</Text>
                  </View>
                  <View style={styles.timeContainer}>
                    <Text style={styles.time}>{item.time}</Text>
                    <Text style={styles.time}>{item.date}</Text>
                    <Text style={styles.time}>{item.status}</Text>
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
  appTitle: {
    marginHorizontal: dimensions.Width * 0.05,
    fontSize: fonts.size.font16,
    fontWeight: 'bold',
  },
  appointment: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: dimensions.Width * 0.7,
    height: dimensions.Height * 0.18,
    marginVertical: dimensions.Height * 0.03,
    borderWidth: 2,
    borderColor: colors.primary1,
  },
  imgContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    height: dimensions.Height * 0.1,
    width: dimensions.Height * 0.1,
    elevation: 5,
    borderRadius: 50,
  },
  name: {
    fontSize: fonts.size.font14,
    fontWeight: 'bold',
  },
  timeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  time: {
    fontSize: fonts.size.font12,
    fontWeight: 'bold',
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

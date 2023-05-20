import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';

import dimensions from '../../../../utils/styles/themes/dimensions';
import fonts from '../../../../utils/styles/themes/fonts';
import colors from '../../../../utils/styles/themes/colors';
//import {styles} from './styles';

import Tablet from '../../../../assets/svgs/tabletIcon.svg';
import Capsule from '../../../../assets/svgs/capsuleIcon.svg';
import Syringe from '../../../../assets/svgs/syringeIcon.svg';
import Syrup from '../../../../assets/svgs/syrupIcon.svg';
import Tick from '../../../../assets/svgs/tick.svg';
import Calendar from '../../../../assets/svgs/Calendar.svg';

import StaticContainer from '../../../../containers/StaticContainer';
import AddMore from '../../../../components/shared/AddMore';
import ReminderAddModal from '../../../../components/patient/MedicineReminder/ReminderAddModal';
import moment from 'moment';

import {useNavigation} from '@react-navigation/native';
import DateModal from '../../../../components/patient/MedicineReminder/DateModal';
import {useEffect} from 'react';

import NotFound from '../../../../components/shared/NotFound';
import Loader from '../../../../components/shared/Loader';

import {getReminders} from '../../../../services/patientServices';
const MedicineScheduler = () => {
  const navigation = useNavigation();
  const user = useSelector(state => state.auth.user);
  const [isModalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(moment().format('D/MM/YYYY'));

  const [day, setDay] = useState(
    moment.utc(new Date(), 'YYYY-MM-DD').format('dddd').substring(0, 3),
  );
  const [weekDates, setWeekDates] = useState([]);
  const [dateModal, setDateModal] = useState(false);
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(false);
  const role = useSelector(state => state.role.role);

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  useEffect(() => {
    const getDates = async () => {
      await getWeekDates();
    };
    getDates();
  }, [date]);

  const reminder = async () => {
    setLoading(true);
    const res = await getReminders(user._id, date);
    if (res?.data) console.log('res', res?.data?.data?.data);
    setReminders(res?.data?.data?.data);
    setLoading(false);
  };

  useEffect(() => {
    if (date) {
      reminder();
    }
  }, [date]);

  const getWeekDates = () => {
    const weekStart = moment.utc(date, 'D/MM/YYYY').startOf('week');
    const weekEnd = moment.utc(date, 'D/MM/YYYY').endOf('week');
    const dates = [];
    for (
      let date = moment(weekStart);
      date <= weekEnd;
      date = date.clone().add(1, 'day')
    ) {
      dates.push(date.format('D/MM/YYYY'));
    }
    setWeekDates(dates);
  };

  return (
    <StaticContainer
      customHeaderEnable
      customHeaderName="Medicine Reminder"
      isBack
      isHorizontalPadding={false}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View />
          <AddMore
            borderColor={colors.primary1}
            label={'Add More'}
            role={role}
            onPress={() => setModalVisible(true)}
          />
        </View>
        <View style={styles.calender}>
          <FlatList
            data={weekdays}
            horizontal
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  style={styles.week}
                  onPress={() => {
                    setDate(weekDates[weekdays.indexOf(item)]);
                    setDay(item);
                  }}>
                  <Text
                    style={[
                      styles.weekText,
                      {
                        color:
                          item === day ? colors.secondary1 : colors.primary1,
                      },
                    ]}>
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>

        <View style={styles.date}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setDateModal(true)}>
            <Text style={styles.buttonLabel}>Select Date</Text>
            <Calendar
              style={styles.icon}
              width={dimensions.Width / 17}
              height={dimensions.Height / 17}
            />
          </TouchableOpacity>
        </View>

        {loading ? (
          <Loader />
        ) : reminders.length !== 0 ? (
          <View style={styles.body}>
            <FlatList
              data={reminders}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => {
                return (
                  <View>
                    <TouchableOpacity
                      style={styles.itemContainer}
                      onPress={() => {
                        navigation.navigate('MedicineDetails', {item: item});
                      }}>
                      <View style={styles.icon}>
                        {item?.dosageForm === 'tablet' && <Tablet />}
                        {item?.dosageForm === 'capsule' && <Capsule />}
                        {item?.dosageForm === 'syringe' && <Syringe />}
                        {item?.dosageForm === 'syrup' && <Syrup />}
                      </View>
                      <View style={styles.data}>
                        <Text style={styles.name}>{item?.name}</Text>
                        <Text
                          style={
                            styles.dosage
                          }>{`${item?.dosageAmount} ${item?.dosageForm}`}</Text>
                        <Text
                          style={
                            styles.duration
                          }>{`${item.duration} Days`}</Text>
                      </View>
                      <View style={styles.tick}>
                        <Tick />
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          </View>
        ) : (
          <NotFound
            title="No Reminders Found"
            text="No reminders found for today"
          />
        )}
      </View>

      <ReminderAddModal
        Visible={isModalVisible}
        setModalVisible={setModalVisible}
        date={date}
      />

      <DateModal
        Visible={dateModal}
        setModalVisible={setDateModal}
        date={date}
        setDate={setDate}
        setDay={setDay}
      />
    </StaticContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  buttonLabel: {
    fontSize: fonts.size.font16,
    fontWeight: fonts.weight.bold,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: dimensions.Height * 0.01,
    paddingHorizontal: dimensions.Width * 0.03,
  },
  calender: {
    height: dimensions.Height / 12,
    alignItems: 'center',
    backgroundColor: colors.primaryMonoChrome100,
  },
  week: {
    alignItems: 'center',
    justifyContent: 'center',
    width: dimensions.Width * 0.13,
  },
  weekText: {
    fontSize: fonts.size.font16,
    fontWeight: fonts.weight.bold,
    color: colors.primary1,
    width: dimensions.Width * 0.1,
    textAlign: 'center',
  },
  button: {
    marginTop: dimensions.Height / 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    alignItems: 'center',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: colors.primary1,
    width: dimensions.Width * 0.4,
  },
  body: {
    marginHorizontal: dimensions.Width * 0.03,
    marginTop: dimensions.Height * 0.02,
    borderRadius: dimensions.Width * 0.02,
    borderWidth: 1,
    borderColor: colors.primary1,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: dimensions.Height * 0.12,

    paddingVertical: dimensions.Height * 0.01,
    backgroundColor: colors.primaryMonoChrome100,
    borderRadius: dimensions.Width * 0.02,
    margin: dimensions.Height * 0.01,
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: dimensions.Width * 0.05,
  },
  data: {
    flex: 1,
    marginHorizontal: dimensions.Width * 0.03,
  },
  name: {
    fontSize: fonts.size.font16,
    fontWeight: fonts.weight.bold,
  },
  dosage: {
    fontSize: fonts.size.font14,
  },
  duration: {
    fontSize: fonts.size.font14,
  },
  tick: {
    marginHorizontal: dimensions.Width * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
  },
  date: {
    alignItems: 'flex-end',
    marginHorizontal: dimensions.Width * 0.03,
  },
});

export default MedicineScheduler;

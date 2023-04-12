import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect} from 'react';

import styles from './styles';
import StaticContainer from '../../../../containers/StaticContainer';
import {useSelector} from 'react-redux';
import SearchFilterBar from '../../../../components/shared/SearchFilterBar';

import NotFound from '../../../../components/shared/NotFound';
import ServiceInformation from '../../../../components/patient/ServiceInformation';
import {generateDates} from '../../../../utils/helpers/generateDates';
import {useState} from 'react';
import {getTimeIntervals} from '../../../../utils/helpers/getTimeIntervals';

import SunIcon from '../../../../assets/svgs/Day.svg';
import EveningIcon from '../../../../assets/svgs/Night.svg';
import UncheckIcon from '../../../../assets/svgs/Checkbox-unchecked.svg';
import CheckIcon from '../../../../assets/svgs/Checkbox.svg';
import Button from '../../../../components/shared/Button';
import dimensions from '../../../../utils/styles/themes/dimensions';
import colors from '../../../../utils/styles/themes/colors';

import PaymentPerson from '../../../../assets/svgs/Payment-person.svg';
import PaymentOnline from '../../../../assets/svgs/Payment-online.svg';

import ModalContainer from '../../../../containers/ModalContainer';
import {createAppointment} from '../../../../services/appointmentServices';

const {useNavigation, useRoute} = require('@react-navigation/native');

const BookAppointment = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const [open, setOpen] = useState(false);

  const user = useSelector(state => state.auth.user);

  const [dates, setDates] = useState(generateDates(14));
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [dateError, setDateError] = useState(false);
  const [timeError, setTimeError] = useState(false);
  const [checked, setChecked] = useState(false);

  const {doctor, service} = route.params;
  const [times, setTimes] = useState(
    getTimeIntervals(service.availFrom, service.availTo),
  );

  const onSubmit = () => {
    setDateError(selectedDate ? false : true);
    setTimeError(selectedTime ? false : true);
    if (!dateError && !timeError && selectedDate && selectedTime) {
      console.log(selectedDate, selectedTime);
      //move on to the payment screen and pass along the required data in params
      if (!service.isOnline) setOpen(true);
      else navigateToPayment();
    }
  };

  const bookAppointment = async () => {
    const data = {
      doctor: doctor._id,
      service: service._id,
      patient: user._id,
      date: selectedDate,
      time: selectedTime,
      is_paid: false,
    };

    try {
      const response = await createAppointment(data);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const selectDate = index => {
    setSelectedDate(dates[index].date);
    setDateError(false);
    setDates(prevState => {
      return prevState.map((date, i) => {
        if (i === index) {
          return {...date, selected: true};
        } else {
          return {...date, selected: false};
        }
      });
    });
  };

  const selectTime = (index, times) => {
    setSelectedTime(times[index].time);
    setTimeError(false);
    setTimes(prevState => {
      return {
        ...prevState,
        times: prevState.times.map((time, i) => {
          if (i === index) {
            return {...time, isSelected: true};
          } else {
            return {...time, isSelected: false};
          }
        }),
      };
    });
  };

  const getDates = dates => {
    return dates.map((date, i) => {
      return (
        <TouchableOpacity
          key={i}
          style={[
            styles.date,
            {
              backgroundColor: date.selected
                ? colors.secondary1
                : colors.primaryMonoChrome300,
            },
          ]}
          onPress={() => selectDate(i)}>
          <Text
            style={[
              styles.text,
              {
                color: date.selected ? colors.white : colors.secondary1,
              },
            ]}>
            {date.day}
          </Text>
          <Text
            style={[
              styles.text,
              {
                color: date.selected ? colors.white : colors.secondary1,
              },
            ]}>
            {date.date.getDate()}, {date.month}
          </Text>
        </TouchableOpacity>
      );
    });
  };

  const getTimes = (times, interval) => {
    return times.map((time, i) => {
      return (
        time.interval === interval && (
          <TouchableOpacity
            key={i}
            style={[
              styles.time,
              {
                backgroundColor: time.isSelected
                  ? colors.secondary1
                  : colors.primaryMonoChrome300,
              },
            ]}
            onPress={() => selectTime(i, times)}>
            <Text
              style={[
                styles.text,
                {
                  color: time.isSelected ? colors.white : colors.secondary1,
                },
              ]}>
              {time.time}
            </Text>
          </TouchableOpacity>
        )
      );
    });
  };

  const navigateToPayment = () => {
    setOpen(false);
    navigation.navigate('App', {
      screen: 'OnlinePayment',
      params: {
        doctorId: doctor._id,
        service,
        date: selectedDate,
        time: selectedTime,
      },
    });
  };

  const openPaymentMethodModal = () => {
    return (
      <ModalContainer
        isModalVisible={open}
        setModalVisible={setOpen}
        type={'bottom'}
        height={dimensions.Height * 0.7}
        bgColor={colors.white}
        width={dimensions.Width}>
        <View style={styles.modalContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.heading}>Payment Method</Text>
            <Text style={styles.subHeading}>
              Please select a preferable payment method
            </Text>
          </View>

          <View style={styles.controls}>
            <View style={styles.modalControl}>
              <TouchableOpacity
                style={styles.option}
                onPress={navigateToPayment}>
                <PaymentOnline width={25} />
                <Text style={styles.optionText}>Online Payment</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.modalControl}>
              <TouchableOpacity style={styles.option} onPress={bookAppointment}>
                <PaymentPerson width={25} />
                <Text style={styles.optionText}>In-Person Payment</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ModalContainer>
    );
  };

  return (
    <StaticContainer
      isBack={true}
      customHeaderName={'Book Appointment'}
      customHeaderEnable={true}>
      {openPaymentMethodModal()}
      <View style={styles.container}>
        {/* doctors information section */}
        <ServiceInformation
          service={service}
          doctor={{name: doctor.name, avatar: doctor.avatar}}
        />
        <View style={styles.appointmentContainer}>
          {/* Dates section  */}
          <View style={styles.dateTimeContainer}>
            <Text style={styles.title}>Select date for consultation</Text>
            <ScrollView style={styles.dates} horizontal>
              {getDates(dates)}
            </ScrollView>
            {dateError && (
              <Text style={styles.errorText}>Please select a date</Text>
            )}
          </View>

          {/* times section */}
          <View style={styles.dateTimeContainer}>
            <Text style={styles.title}>Select time for consultation</Text>
            <View style={styles.times}>
              {times.morningCount ? (
                <>
                  <View style={styles.subTitleContainer}>
                    <SunIcon />
                    <Text style={styles.subTitle}>Morning</Text>
                  </View>
                  <ScrollView style={styles.timesContainer} horizontal>
                    {getTimes(times.times, 'morning')}
                  </ScrollView>
                </>
              ) : null}

              {times.eveningCount ? (
                <>
                  <View style={styles.subTitleContainer}>
                    <EveningIcon />
                    <Text style={styles.subTitle}>Evening</Text>
                  </View>
                  <ScrollView style={styles.times} horizontal>
                    {getTimes(times.times, 'evening')}
                  </ScrollView>
                </>
              ) : null}
            </View>
            {timeError && (
              <Text style={styles.errorText}>Please select a time</Text>
            )}
          </View>
        </View>

        {/* Button */}
        <View style={styles.control}>
          {/* terms and conditions section */}
          <View style={styles.termsContainer}>
            <TouchableOpacity
              style={styles.checkbox}
              onPress={() => {
                setChecked(prevState => !prevState);
              }}>
              {checked ? <CheckIcon /> : <UncheckIcon />}
            </TouchableOpacity>
            <Text style={styles.terms}>
              I agree to the pakmedic’s terms and conditions
            </Text>
          </View>
          <Button
            label={'Continue to payment'}
            onPress={onSubmit}
            isDisabled={!checked}
            width={'100%'}
            type={'filled'}
          />
        </View>
      </View>
    </StaticContainer>
  );
};

export default BookAppointment;

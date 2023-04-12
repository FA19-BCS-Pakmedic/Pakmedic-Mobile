import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';

import {styles} from './styles';
import {useRoute} from '@react-navigation/native';
import StaticContainer from '../../../../containers/StaticContainer';
import {ValidateDropdown} from '../../../../components/shared/Dropdown';
import Reasons from '../../../../utils/constants/RescheduleReasons';
import {useForm} from 'react-hook-form';
import {ValidateInputField} from '../../../../components/shared/Input';
import dimensions from '../../../../utils/styles/themes/dimensions';
import colors from '../../../../utils/styles/themes/colors';
import SunIcon from '../../../../assets/svgs/Day.svg';
import EveningIcon from '../../../../assets/svgs/Night.svg';

import {getTimeIntervals} from '../../../../utils/helpers/getTimeIntervals';
import {generateDates} from '../../../../utils/helpers/generateDates';
import Button from '../../../../components/shared/Button';
import {getDate} from '../../../../utils/helpers/getDate';
import ROLES from '../../../../utils/constants/ROLES';
import {useSelector} from 'react-redux';

const RescheduleAppointment = () => {
  const route = useRoute();
  const {appointment} = route.params;
  const role = useSelector(state => state.role.role);
  const {service, doctor, patient} = appointment;

  const [open, setOpen] = useState(false);

  const [times, setTimes] = useState(
    getTimeIntervals(service.availFrom, service.availTo),
  );
  const [dates, setDates] = useState(generateDates(14));

  const {control, watch, setValue, handleSubmit} = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      reason: '',
      reasonDetails: '',
      date: '',
      time: '',
      appointmentId: appointment._id,
    },
  });

  const setPreFillDate = () => {
    const index = dates.findIndex(date => {
      return getDate(date.date) === getDate(appointment.date);
    });

    index > -1 && selectDate(index);
  };

  useEffect(() => {
    setPreFillDate();
    setPreFillTime();
  }, [appointment]);

  const setPreFillTime = () => {
    console.log(times);

    times.times.forEach(time => {
      console.log(time.time, appointment.time);
    });

    const index = times.times.findIndex(time => {
      return time.time === appointment.time;
    });
    console.log(index);
    index > -1 && selectTime(index, times.times);
  };

  const selectDate = index => {
    setValue('date', dates[index]?.date);
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
    setValue('time', times[index]?.time);
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
                : role === ROLES.patient
                ? colors.primaryMonoChrome300
                : colors.secondaryMonoChrome100,
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
                  : role === ROLES.patient
                  ? colors.primaryMonoChrome300
                  : colors.secondaryMonoChrome100,
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

  const onSubmit = data => {
    console.log(data);
  };

  return (
    <StaticContainer
      isBack={true}
      customHeaderName={'Reschedule Appointment'}
      customHeaderEnable={true}>
      <View style={styles.root}>
        <View style={styles.container}>
          <View style={styles.reasonContainer}>
            <Text
              style={[styles.title, {marginBottom: dimensions.Height / 80}]}>
              Select a reason
            </Text>
            <View>
              <ValidateDropdown
                control={control}
                name="reason"
                placeholder="Select a reason"
                width={'100%'}
                rules={{
                  required: 'Reason is required',
                }}
                setValue={callback => setValue('reason', callback())}
                items={Reasons}
                open={open}
                setOpen={setOpen}
              />
            </View>
            <View>
              <ValidateInputField
                control={control}
                name="reasonDetails"
                multiline={true}
                placeholder="Enter reason details"
                width={'100%'}
                text={watch('reasonDetails')}
                inputHeight={dimensions.Height / 5}
                type={'outlined'}
                // rules={{
                //   validate: value => {
                //     value.length < 10 && 'Reason details must be 10 characters';
                //   },
                // }}
                isFlexStart={true}
              />
            </View>
          </View>

          <View style={styles.appointmentContainer}>
            {/* Dates section  */}
            <View style={styles.dateTimeContainer}>
              <Text style={styles.title}>Select date for consultation</Text>
              <ScrollView style={styles.dates} horizontal>
                {getDates(dates)}
              </ScrollView>
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
            </View>
          </View>
        </View>

        <Button
          label={'Reschedule'}
          onPress={handleSubmit(onSubmit)}
          width="100%"
          type="filled"
        />
      </View>
    </StaticContainer>
  );
};

export default RescheduleAppointment;

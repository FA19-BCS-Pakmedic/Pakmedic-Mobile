import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';

import StaticContainer from '../../../../containers/StaticContainer';

import MobileChipIcon from '../../../../assets/svgs/Mobile-Chip.svg';
import {
  formatCardNumber,
  formatExpiryDate,
  validateExpiryDate,
} from '../../../../utils/helpers/creditCard';

import {useForm} from 'react-hook-form';

import {ValidateInputField} from '../../../../components/shared/Input';
import Button from '../../../../components/shared/Button';
import Loader from '../../../../components/shared/Loader';

import {creditCardNumberRegex} from '../../../../utils/constants/Regex';
import dimensions from '../../../../utils/styles/themes/dimensions';
import {
  createCustomer,
  createPaymentMethod,
  payForService,
} from '../../../../services/stripeServices';

import {getCustomer} from '../../../../services/stripeServices';

import {useCustomToast} from '../../../../hooks/useCustomToast';
import {createAppointment} from '../../../../services/appointmentServices';
import useCustomApi from '../../../../hooks/useCustomApi';
import PopupAlerts from '../../../../components/shared/PopupAlerts';

const OnlinePayment = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [message, setAlertMessage] = useState('');
  const [alertName, setAlertName] = useState('LoginSuccess');

  const [edit, setEdit] = useState(false);

  // const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  const {showToast} = useCustomToast();
  const {callApi, error, isLoading, success, setMessage} = useCustomApi();

  const {handleSubmit, setValue, control, watch} = useForm({
    mode: 'onChange',
    defaultValues: {
      cardNumber: '',
      expiryDate: '',
      cvc: '',
    },
  });

  const expiryRef = useRef(null);
  const cvcRef = useRef(null);

  const user = useSelector(state => state.auth.user);

  const {doctorId, service, date, time} = route.params;

  const handleCardNumberInput = value => {
    setValue('cardNumber', formatCardNumber(value));
    if (value.length === 19) {
      expiryRef.current.focus();
    }
  };

  const handleExpiryInput = value => {
    setValue('expiryDate', formatExpiryDate(value));

    if (value.length === 5) {
      cvcRef.current.focus();
    }
  };

  const handleCvcInput = value => {
    setValue('cvc', value.replace(/[^0-9]/g, '').slice(0, 3));
  };

  const fetchCustomerData = async () => {
    // setLoading(true);
    // try {
    //   const response = await getCustomer(user.stripeCustomerId);
    //   setCustomer(response?.data?.data?.customer);
    //   setPaymentMethod(response?.data?.data?.paymentMethod);
    // } catch (err) {
    //   console.log(err);
    //   showToast('Error fetching customer details', 'danger');
    // } finally {
    //   setLoading(false);
    // }

    const responseData = await callApi(getCustomer, user.stripeCustomerId);
    if (responseData) {
      setMessage('Customer data fetched successfully');
      setCustomer(responseData?.data?.customer);
      setPaymentMethod(responseData?.data?.paymentMethod);
    } else {
      // setMessage('Error fetching customer details');
    }
  };

  useEffect(() => {
    console.log(user.stripeCustomerId);
    if (user.stripeCustomerId) {
      fetchCustomerData();
    }
  }, [user.stripeCustomerId]);

  useEffect(() => {
    if (paymentMethod) {
      setValue('cardNumber', `**** **** **** ${paymentMethod.card.last4}`);
      setValue(
        'expiryDate',
        `${
          paymentMethod.card.exp_month < 10
            ? `0${paymentMethod.card.exp_month}`
            : paymentMethod.card.exp_month
        }/${paymentMethod.card.exp_year?.toString().slice(2, 4)}`,
      );
      setValue('cvc', '***');
    }
  }, [paymentMethod]);

  const onSubmit = async values => {
    const data = {
      number: values.cardNumber.replaceAll(' ', ''),
      exp_month: values.expiryDate.split('/')[0],
      exp_year: values.expiryDate.split('/')[1],
      cvc: values.cvc,
    };

    let response;
    setBtnLoading(true);
    try {
      response = await createPaymentMethod(data, user.stripeCustomerId);

      console.log(response.data.data.paymentMethod)

      const paymentMethod = response?.data?.data?.paymentMethod;

      if (response?.data) {
        setPaymentMethod({id: paymentMethod.id, card: paymentMethod.card});
        setEdit(false);
        showToast('Payment method added successfully', 'success');
      }
    } catch (err) {
      console.log(err);
      showToast('Error adding payment method', 'danger');
    } finally {
      setBtnLoading(false);
    }
  };

  console.log(btnLoading);

  const pay = async () => {
    const data = {
      price: service.fee,
      metadata: {
        doctorId,
        serviceId: service._id,
        patientId: user._id,
      },
    };
    try {
      setBtnLoading(true);
      const response = await payForService(customer.id, data);

      const {paymentIntent} = response?.data?.data;

      if (paymentIntent.status === 'succeeded') {
        const data = {
          doctor: doctorId,
          patient: user._id,
          service: service._id,
          time: time,
          date: date,
          is_paid: true,
          stripe_payment_intent_id: paymentIntent.id,
        };

        const response = await createAppointment(data);

        if (response?.data) {
          setAlertMessage(
            'Appointment booked successfully, Redirecting you to appointments screen',
          );
          // navigation.navigate('AppointmentScreen');
          console.log(response?.data?.data);
          // showToast('Appointment booked successfully', 'success');

          console.log('navigating');
        }
      }
    } catch (err) {
      console.log(err);
      setAlertMessage('Appointment booking failed, please try again later');
      setAlertName('LoginFailure');
      // showToast('Error', 'danger');
    } finally {
      setBtnLoading(false);
      setModalVisible(true);
    }
  };

  const getCardNumber = index => {
    return watch('cardNumber').split(' ')[index] || '****';
  };

  return isLoading ? (
    <Loader title={'Loading customer details...'} />
  ) : (
    <StaticContainer
      customHeaderName={'Online Payment'}
      customHeaderEnable={true}
      isBack={true}
      isHorizontalPadding={false}>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <LinearGradient
            colors={['#B6DEFF', '#84E5D8']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.card}>
            <View style={styles.highlightTextContainer}>
              <Text style={styles.name}>{user.name}</Text>
              <Text style={styles.expDate}>
                {watch('expiryDate') ? watch('expiryDate') : 'MM/YY'}
              </Text>
            </View>
            <MobileChipIcon />
            <View style={styles.cardNumberContainer}>
              <Text style={styles.text}>{getCardNumber(0)}</Text>
              <Text style={styles.text}>{getCardNumber(1)}</Text>
              <Text style={styles.text}>{getCardNumber(2)}</Text>
              <Text style={styles.text}>{getCardNumber(3)}</Text>
            </View>
          </LinearGradient>
          {/* 
          <Text style={[styles.text, {marginBottom: 10, marginTop: 20}]}>
            Enter Your card Information
          </Text> */}

          <View style={styles.cardFormContainer}>
            <ValidateInputField
              isDisabled={!edit}
              type="outlined"
              placeholder="Enter Card Number"
              control={control}
              name="cardNumber"
              rules={{
                required: 'Card Number is required',
                minLength: {
                  value: 16,
                  message: 'Card Number must be atleast 16 digits',
                },
                maxLength: {
                  value: 19,
                  message: 'Card Number must be atmost 19 digits',
                },
                // pattern: {
                //   value: creditCardNumberRegex,
                //   message: 'Card Number is not valid',
                // },
              }}
              keyboardType="numeric"
              text={watch('cardNumber')}
              onChangeCallback={handleCardNumberInput}
              maxLength={19}
            />

            <View style={styles.inputsContainer}>
              <ValidateInputField
                isDisabled={!edit}
                type="outlined"
                placeholder="Expiry Date (MM/YY)"
                control={control}
                name="expiryDate"
                rules={{
                  required: 'Expiry date is required',
                  // validate by calling a function
                  validate: value => {
                    return validateExpiryDate(value);
                  },
                }}
                useRef={expiryRef}
                keyboardType="numeric"
                text={watch('expiryDate')}
                onChangeCallback={handleExpiryInput}
                maxLength={5}
              />

              <ValidateInputField
                isDisabled={!edit}
                type="outlined"
                placeholder="CVC"
                control={control}
                name="cvc"
                rules={{
                  required: 'CVC is required',
                  minLength: {
                    value: 3,
                    message: 'CVC must be atleast 3 digits',
                  },
                }}
                useRef={cvcRef}
                keyboardType="numeric"
                text={watch('cvc')}
                onChangeCallback={handleCvcInput}
                maxLength={3}
              />
            </View>
            {/* <View style={styles.controls}> */}
            <Button
              label={!edit ? 'Edit Card Information' : 'Cancel Editing'}
              onPress={() => {
                setEdit(prevState => !prevState);
              }}
              width={'100%'}
            />
            {edit ? (
              <Button
                label={'Save Card'}
                onPress={handleSubmit(onSubmit)}
                width={'100%'}
                type="filled"
                isLoading={btnLoading}
              />
            ) : (
              <Button
                label={`Pay (Rs.${service.fee}) now`}
                onPress={pay}
                width="100%"
                type="filled"
                isDisabled={!paymentMethod}
                isLoading={btnLoading}
              />
            )}
            {/* </View> */}
          </View>
        </View>

        <PopupAlerts
          isModalVisible={isModalVisible}
          setModalVisible={setModalVisible}
          height={1.8}
          width={1.2}
          timer={2000}
          alertName={alertName}
          message={message}
          redirect={{screen: 'AppointmentScreen'}}
          isReplace={true}
        />
      </View>
    </StaticContainer>
  );
};

export default OnlinePayment;

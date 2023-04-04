import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState, useRef} from 'react';
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

import {creditCardNumberRegex} from '../../../../utils/constants/Regex';
import dimensions from '../../../../utils/styles/themes/dimensions';

const OnlinePayment = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');

  const [edit, setEdit] = useState(false);

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

  const onSubmit = values => {
    console.log(values);
    
  };

  return (
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
              <Text style={styles.expDate}>{watch('expiryDate')}</Text>
            </View>
            <MobileChipIcon />
            <View style={styles.cardNumberContainer}>
              <Text style={styles.text}>
                {watch('cardNumber').split(' ')[0] || '****'}
              </Text>
              <Text style={styles.text}>
                {watch('cardNumber').split(' ')[1] || '****'}
              </Text>
              <Text style={styles.text}>
                {watch('cardNumber').split(' ')[2] || '****'}
              </Text>
              <Text style={styles.text}>
                {watch('cardNumber').split(' ')[3] || '****'}
              </Text>
            </View>
          </LinearGradient>

          <Text style={[styles.text, {marginBottom: 10}]}>
            Enter Your card Information
          </Text>

          <View style={styles.cardFormContainer}>
            <ValidateInputField
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
            <View style={styles.controls}>
              <Button
                label={!edit ? 'Edit Card' : 'Cancel Edit'}
                onPress={() => {
                  setEdit(prevState => !prevState);
                }}
                width={dimensions.Width / 2.5}
              />
              <Button
                label={'Save Card'}
                onPress={handleSubmit(onSubmit)}
                width={dimensions.Width / 2.5}
                type="filled"
              />
            </View>
          </View>
        </View>
      </View>
    </StaticContainer>
  );
};

export default OnlinePayment;

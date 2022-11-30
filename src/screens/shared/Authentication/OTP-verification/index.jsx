// importing libraries`
import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useForm} from 'react-hook-form';

// importing styles
import {styles} from './styles';
import colors from '../../../../utils/styles/themes/colors';

//import svg icon
import SVGImage from '../../../../assets/svgs/forgot-password-screen-icon.svg';

//import custom components0
import AutoNextInput from '../../../../components/shared/AutoNextInput';
import Button from '../../../../components/shared/Button';
import StaticContainer from '../../../../containers/StaticContainer';

//importing regex
import {numberRegex} from '../../../../utils/constants/Regex';

const OtpVerification = () => {
  const inputRef1 = useRef('');
  const inputRef2 = useRef('');
  const inputRef3 = useRef('');
  const inputRef4 = useRef('');

  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
    setValue,
    watch,
  } = useForm({
    mode: 'all',
    defaultValues: {
      pin1: '',
      pin2: '',
      pin3: '',
      pin4: '',
    },
  });

  //cnic error
  const [pinError, setPinError] = useState(false);

  //timer
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    inputRef1.current.focus();
    setTimer(5);
  }, []);

  // useEffect for timer
  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) {
        setTimer(timer => timer - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  // form submit handler
  const onSubmit = data => {
    console.log(data, 'data');
    console.log(isValid, 'isValid');
    console.log('error', errors);
    console.log(watch('pin1'));
  };

  return (
    <StaticContainer
      customHeaderName={'OTP Verification'}
      customHeaderEnable={true}>
      <View style={styles.container}>
        {/* TODO: ADD THE VALIDATION MESSAGE OF CODE BEING SENT TO THE RELATIVE EMAIL OR PHONE NUMBER WHICH WILL BE RETRIEVED FROM THE NAVIGATION PARAMS */}

        {/* input fields */}
        <View style={styles.inputContainer}>
          <AutoNextInput
            type="filled"
            width="20%"
            maxLength={1}
            ref={inputRef1}

            name="pin1"
            customError={pinError}
            setCustomError={setPinError}
            control={control}
            height={12}
            rules={{
              required: 'Invalid Pin',
              minLength: {
                value: 1,
                message: 'Invalid Pin',
              },
              pattern: {value: numberRegex},
            }}
            onChangeText={text => {
              inputRef2.current.focus();
              setValue('pin1', text);

            }}
          />
          <AutoNextInput
            type="filled"
            width="20%"
            maxLength={1}
            ref={inputRef2}

            name="pin2"
            customError={pinError}
            setCustomError={setPinError}
            control={control}
            height={12}
            rules={{
              required: 'Invalid Pin',
              minLength: {
                value: 1,
                message: 'Invalid Pin',
              },
              pattern: {value: numberRegex},
            }}
            onChangeText={text => {
              inputRef3.current.focus();
              setValue('pin2', text);
            }}
          />
          <AutoNextInput
            type="filled"
            width="20%"
            maxLength={1}
            ref={inputRef3}
            name="pin3"
            customError={pinError}
            setCustomError={setPinError}
            control={control}
            height={12}
            rules={{
              required: 'Invalid Pin',
              minLength: {
                value: 1,
                message: 'Invalid Pin',
              },
              pattern: {value: numberRegex},
            }}
            onChangeText={text => {
              inputRef4.current.focus();
              setValue('pin3', text);

            }}
          />
          <AutoNextInput
            type="filled"
            width="20%"
            maxLength={1}

            ref={inputRef4}
            name="pin4"
            customError={pinError}
            setCustomError={setPinError}
            control={control}
            height={12}
            rules={{
              required: 'Invalid Pin',
              minLength: {
                value: 1,
                message: 'Invalid Pin',
              },
              pattern: {value: numberRegex},
            }}
            onChangeText={text => {
              setValue('pin4', text);

            }}
          />
          <AutoNextInput
            type="filled"
            width="20%"
            maxLength={1}
            ref={inputRef4}
            onChangeText={text => {
              setPin4(text);
            }}
          />
        </View>
        {/* resend code part */}
        <View style={styles.resendCodeContainer}>
          {timer > 0 ? (
            <Text style={styles.text}>
              Resend Code in{' '}
              <Text style={{color: colors.accent1}}>{timer}s</Text>
            </Text>
          ) : (
            <TouchableOpacity
              onPress={() => {
                setTimer(5);
              }}>
              <Text style={styles.text}>Resend code</Text>
            </TouchableOpacity>
          )}
        </View>
        {/* resend code part */}
        <View style={styles.resendCodeContainer}>
          {timer > 0 ? (
            <Text style={styles.text}>
              Resend Code in{' '}
              <Text style={{color: colors.accent1}}>{timer}s</Text>
            </Text>
          ) : (
            <TouchableOpacity
              onPress={() => {
                setTimer(5);
              }}>
              <Text style={styles.text}>Resend code</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* submit button */}
      <View style={styles.buttonContainer}>
        <Button
          width="90%"
          type="filled"
          onPress={handleSubmit(onSubmit)}
          label="Verify Code"
          isDisabled={!isValid}
        />
      </View>

    </StaticContainer>
  );
};

export default OtpVerification;

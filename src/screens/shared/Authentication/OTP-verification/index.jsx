// importing libraries
import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useForm} from 'react-hook-form';

// importing styles
import {styles} from './styles';
import colors from '../../../../utils/styles/themes/colors';

//import custom components
import AutoNextInput from '../../../../components/shared/AutoNextInput';
import Button from '../../../../components/shared/Button';
import StaticContainer from '../../../../containers/StaticContainer';

//importing regex
import {numberRegex} from '../../../../utils/constants/Regex';

/**
 *
 * @returns
 *
 * TODO: FIX THE BUTTON DISABLE AND ENABLE
 */
//verify otp endpoint
import {
  forgotPasswordPatient,
  verifyOtpPatient,
} from '../../../../services/patientServices';
import {
  forgotPasswordDoctor,
  verifyOtpDoctor,
} from '../../../../services/doctorServices';

//import constants
import ROLES from '../../../../utils/constants/ROLES';
import deviceStorage from '../../../../utils/helpers/deviceStorage';

const OtpVerification = ({route, navigation}) => {
  //states
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');

  //input refs for focusing different fields
  const inputRef1 = useRef('');
  const inputRef2 = useRef('');
  const inputRef3 = useRef('');
  const inputRef4 = useRef('');

  // useForm hook from react-hook-form
  const {
    control,
    handleSubmit,
    watch,
    formState: {isValid},
  } = useForm({
    mode: 'all',
    defaultValues: {
      pin1: '',
      pin2: '',
      pin3: '',
      pin4: '',
    },
  });

  //timer
  const [timer, setTimer] = useState(0);

  // TODO: REMOVE THIS USEEFFECT
  useEffect(() => {
    console.log(role, email);
  }, [role, email]);

  useEffect(() => {
    //TODO: TEMPORARY USEEFFECT HOOK FOR FETCHING THE ROLE FROM THE ASYNC STORAGE
    const getData = async () => {
      const data = await deviceStorage.loadItem('role');
      setRole(data ? data : ROLES.patient);
      setEmail(route.params.email);
    };
    getData();

    //NOT TEMPORARY CODE
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

  //resend new token function
  const resendToken = async () => {
    try {
      let response;
      if (role === ROLES.patient) {
        //calling the forgotten password endpoint for patient
        response = await forgotPasswordPatient({email});
      } else {
        ///calling the forgotten password endpoint for doctor
        response = await forgotPasswordDoctor({email});
      }
      alert(response?.data.message);
      console.log(response?.data);
    } catch (err) {
      console.log(err.response?.data);
      alert(err.response.data.message);
    }
  };

  // form submit handler
  const onSubmit = async data => {
    //merge otp pins into one
    const otp = data.pin1 + data.pin2 + data.pin3 + data.pin4;

    console.log(role, otp, email);

    try {
      let response;
      if (role === ROLES.patient) {
        //call patient verify otp end point
        response = await verifyOtpPatient({email, otp});
      } else {
        //call doctor verify otp end point
        response = await verifyOtpDoctor({email, otp});
      }

      console.log(response.data);
      alert(response.data.message);

      //navigate to set password screen
      navigation.navigate('Auth', {
        screen: 'SetNewPassword',
        params: {
          email: email,
          otp: otp,
        },
      });
    } catch (err) {
      console.log(err.response.data);
      alert(err.response.data.message);
    }
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
            height={12}
            control={control}
            name="pin1"
            rules={{
              required: 'This field is required',
            }}
            onChangeText={() => {
              inputRef2.current.focus();
            }}
          />
          <AutoNextInput
            type="filled"
            width="20%"
            maxLength={1}
            ref={inputRef2}
            height={12}
            control={control}
            name="pin2"
            rules={{
              required: 'This field is required',
            }}
            onChangeText={() => {
              inputRef3.current.focus();
            }}
          />
          <AutoNextInput
            type="filled"
            width="20%"
            maxLength={1}
            ref={inputRef3}
            height={12}
            control={control}
            name="pin3"
            rules={{
              required: 'This field is required',
            }}
            onChangeText={() => {
              inputRef4.current.focus();
            }}
          />
          <AutoNextInput
            type="filled"
            width="20%"
            maxLength={1}
            ref={inputRef4}
            height={12}
            control={control}
            name="pin4"
            rules={{
              required: 'This field is required',
            }}
            onChangeText={() => {
              console.log(isValid);
              console.log(
                watch('pin1'),
                watch('pin2'),
                watch('pin3'),
                watch('pin4'),
              );
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
                resendToken();
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

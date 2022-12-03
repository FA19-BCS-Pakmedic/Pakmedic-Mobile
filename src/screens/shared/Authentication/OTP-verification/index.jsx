// importing libraries`
import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useForm} from 'react-hook-form';

// importing styles
import {styles} from './styles';
import colors from '../../../../utils/styles/themes/colors';

//import svg icon
import SVGImage from '../../../../assets/svgs/forgot-password-screen-icon.svg';

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

const OtpVerification = () => {
  const inputRef1 = useRef('');
  const inputRef2 = useRef('');
  const inputRef3 = useRef('');
  const inputRef4 = useRef('');

  // useStates to store the state of pins
  const [pin1, setPin1] = useState('');
  const [pin2, setPin2] = useState('');
  const [pin3, setPin3] = useState('');
  const [pin4, setPin4] = useState('');

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

  //resend new token function
  const resendToken = async () => {
    // TODO: FETCH THE ROLE FROM MOBILE STORAGE DYNAMICALLY
    const role = 'Doctor';

    // TODO: GET EMAIL FROM THE NAVIGATION PARAM
    const email = 'awanmoeed2121@gmail.com';

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
    //TODO: GET ROLE FROM LOCAL STORAGE
    const role = 'Doctor';

    // TODO: GET USER EMAIL FROM NAVIGATION PARAMS PASSED BY THE PREVIOUS SCREEN
    const email = 'awanmoeed2121@gmail.com';

    //merge otp pins into one
    const otp = data.pin1 + data.pin2 + data.pin3 + data.pin4;

    try {
      let response;
      if (role === ROLES.patient) {
        //call patient verify otp end point
        response = await verifyOtpPatient({email: email, otp: otp});
      } else {
        //call doctor verify otp end point
        response = await verifyOtpDoctor({email: email, otp: otp});
      }

      console.log(response.data);
      alert(response.data.message);
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
            onChangeText={text => {
              inputRef2.current.focus();
              setPin1(text);
            }}
          />
          <AutoNextInput
            type="filled"
            width="20%"
            maxLength={1}
            ref={inputRef2}
            height={12}
            onChangeText={text => {
              inputRef3.current.focus();
              setPin2(text);
            }}
          />
          <AutoNextInput
            type="filled"
            width="20%"
            maxLength={1}
            ref={inputRef3}
            height={12}
            onChangeText={text => {
              inputRef4.current.focus();
              setPin3(text);
            }}
          />
          <AutoNextInput
            type="filled"
            width="20%"
            maxLength={1}

            ref={inputRef4}
            height={12}
            onChangeText={text => {
              setPin4(text);
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
                resendToken();
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
          onPress={onSubmit}
          label="Verify Code"
          isDisabled={() => {
            return !isValid();
          }}
        />
      </View>

    </StaticContainer>
  );
};

export default OtpVerification;

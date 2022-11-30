import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import * as Animatable from 'react-native-animatable';

// import styles
import {styles} from './styles';
import colors from '../../../../utils/styles/themes/colors';

//import logo
import SvgImage from '../../../../assets/svgs/forgot-password-screen-icon.svg';

//importing themes
import dimensions from '../../../../utils/styles/themes/dimensions';

//import regex
import {emailRegex, phoneNumberRegex} from '../../../../utils/constants/Regex';

//import constants
import ROLES from '../../../../utils/constants/ROLES';

//import custom components
import {
  ContactInputField,
  ValidateInputField,
} from '../../../../components/shared/Input';
import Button from '../../../../components/shared/Button';
import ForgotPasswordCard from '../../../../components/shared/ForgotPasswordCard';
import StaticContainer from '../../../../containers/StaticContainer';
import {forgotPasswordPatient} from '../../../../services/patientServices';
import { forgotPasswordDoctor } from '../../../../services/doctorServices';

const ForgotPassword = () => {
  //hook for react hook forms
  const {
    control,
    handleSubmit,
    formState: {isValid},
  } = useForm({
    mode: 'all',
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async data => {
    // TODO: FETCH THE ROLE FROM MOBILE STORAGE DYNAMICALLY

    const role = 'Patient';
    try {
      let response;
      if (role === ROLES.patient) {
        //calling the forgotten password endpoint for patient
        response = await forgotPasswordPatient(data);
      }else{
        ///calling the forgotten password endpoint for doctor
        response = await forgotPasswordDoctor(data);
      }
      alert(response.data.message);
      console.log(response.data);
    } catch (err) {
      console.log(err.response.data);
      alert(err.response.data.message);
    }

    console.log(data);
    console.log(isValid);
  };

  return (
    <StaticContainer
      customHeaderEnable={true}
      customHeaderName="Forgot Password">
      {/* Screen logo */}
      <View style={styles.logoContainer}>
        <SvgImage width={dimensions.Width} height={dimensions.Height / 3} />
      </View>
      <View style={styles.container}>
        {/* email field container */}
        <View
          animation="pulse"
          easing="ease-out"
          iterationCount={1}
          style={styles.inputContainer}>
          <ValidateInputField
            placeholder="Email"
            type="outlined"
            width="93%"
            title={`Enter your email`}
            placeholderTextColor={colors.secondary1}
            keyboardType="email-address"
            control={control}
            name="email"
            rules={{
              required: "Email can't be empty",
              pattern: {
                value: emailRegex,
                message: 'Please enter a valid email',
              },
            }}
          />
        </View>
      </View>

      {/* Send Code button */}

      <View style={styles.buttonContainer}>
        <Button
          width="100%"
          type="filled"
          label="Send Verification Code"
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </StaticContainer>
  );
};

export default ForgotPassword;

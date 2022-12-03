import {View} from 'react-native';
import React from 'react';
import {useForm} from 'react-hook-form';

// import styles
import {styles} from './styles';
import colors from '../../../../utils/styles/themes/colors';

//import logo
import SvgImage from '../../../../assets/svgs/forgot-password-screen-icon.svg';

//importing themes
import dimensions from '../../../../utils/styles/themes/dimensions';

//import regex
import {emailRegex} from '../../../../utils/constants/Regex';

//import constants
import ROLES from '../../../../utils/constants/ROLES';

//import custom components
import {ValidateInputField} from '../../../../components/shared/Input';
import Button from '../../../../components/shared/Button';
import StaticContainer from '../../../../containers/StaticContainer';
import {forgotPasswordPatient} from '../../../../services/patientServices';
import {forgotPasswordDoctor} from '../../../../services/doctorServices';

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

    const role = 'Doctor';
    try {
      let response;
      if (role === ROLES.patient) {
        //calling the forgotten password endpoint for patient
        response = await forgotPasswordPatient(data);
      } else {
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
      <View style={styles.container}>
        {/* Screen logo */}
        <View style={styles.logoContainer}>
          <SvgImage width={dimensions.Width} height={dimensions.Height / 3} />
        </View>

        {/* email field container */}
        <View
          animation="pulse"
          easing="ease-out"
          iterationCount={1}
          style={styles.inputContainer}>
          <ValidateInputField
            placeholder="Enter your email"
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

        {/* Send Code button */}

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

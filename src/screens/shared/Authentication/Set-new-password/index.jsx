import {View, Text, TextInput} from 'react-native';
import React from 'react';
import {useForm} from 'react-hook-form';

// import styles
import {styles} from './styles';

//import theme
import colors from '../../../../utils/styles/themes/colors';
import fonts from '../../../../utils/styles/themes/fonts';
import dimensions from '../../../../utils/styles/themes/dimensions';

//import logo
import SvgImage from '../../../../assets/svgs/reset-password-screen-logo.svg';

// import container
import StaticContainer from '../../../../containers/StaticContainer';
// import ScrollContainer from '../../../../containers/ScrollContainer';

//import regex
import {passwordRegex} from '../../../../utils/constants/Regex';

//import custom components
import {ValidateInputField} from '../../../../components/shared/Input';
import Button from '../../../../components/shared/Button';

//import set new password apiEndpoint
import {resetForgotPasswordPatient} from '../../../../services/patientServices';
import {resetForgotPasswordDoctor} from '../../../../services/doctorServices';
import ROLES from '../../../../utils/constants/ROLES';

const SetNewPassword = () => {
  //hook for react hook forms
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    mode: 'all',
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const [isPasswordVisible, setisPasswordVisible] = React.useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    React.useState(false);

  onSubmit = async data => {
    // TODO: GET ROLE FROM LOCAL STORAGE TO CALL THE RESPECTIVE RESET PASSWORD FUNCTIONALITY
    const role = 'Patient';

    //TODO: GET USER EMAIL FROM NAVIGATION PARAMS PASSED BY THE PREVIOUS FORGOT PASSWORD SCREEN
    const email = 'awanmoeed2121@gmail.com';

    //TODO: GET USER OTP CODE FROM NAVIGATION PARAMS PASSED BY THE PREVIOUS FORGOT PASSWORD SCREEN
    const resetPasswordToken = '';

    try {
      let response;
      if (role === ROLES.patient) {
        //call patient reset password api
        response = await resetForgotPasswordPatient({
          email: email,
          password: data?.password,
          resetPasswordToken,
        });
      } else {
        //call patient reset password api
        response = await resetForgotPasswordDoctor({
          email: email,
          password: data?.password,
          resetPasswordToken,
        });
        console.log(response.data);
        alert(response.data.message);
      }
    } catch (err) {
      console.log(err.response.data);
      alert(err.response.data.message);
    }
    console.log(data);
  };

  return (
    <StaticContainer>
      {/* Screen logo */}
      <View style={styles.logoContainer}>
        <SvgImage width={dimensions.Width} height={dimensions.Height / 3} />
      </View>

      {/* reset password text */}
      <View style={styles.textContainer}>
        <Text style={styles.text}>Create a new password</Text>
      </View>
      {/* fields */}
      <View style={styles.fieldsContainer}>
        {/* Old password */}
        <ValidateInputField
          placeholder="Enter you new password"
          type="outlined"
          width="85.5%"
          placeholderTextColor={colors.secondary1}
          keyboardType="password"
          control={control}
          title="New Password"
          name="password"
          isPasswordField={true}
          isPasswordVisible={!isPasswordVisible}
          setIsPasswordVisible={setisPasswordVisible}
          rules={{
            required: "Password can't be empty",
            pattern: {
              value: passwordRegex,
              message: 'Please enter a valid password',
            },
          }}
        />

        {/* New password */}
        <ValidateInputField
          placeholder="Enter confirm password"
          type="outlined"
          width="85.5%"
          placeholderTextColor={colors.secondary1}
          keyboardType="password"
          control={control}
          title={'Confirm Password'}
          name="confirmPassword"
          isPasswordField={true}
          isPasswordVisible={!isConfirmPasswordVisible}
          setIsPasswordVisible={setIsConfirmPasswordVisible}
          rules={{
            required: "Password can't be empty",
            pattern: {
              value: passwordRegex,
              message: 'Please enter a valid password',
            },
          }}
        />
      </View>

      {/* Change password button */}
      <View style={styles.buttonContainer}>
        <Button
          width="90%"
          type="filled"
          onPress={handleSubmit(onSubmit)}
          label="Verify Code"
        />
      </View>
    </StaticContainer>
  );
};

export default SetNewPassword;

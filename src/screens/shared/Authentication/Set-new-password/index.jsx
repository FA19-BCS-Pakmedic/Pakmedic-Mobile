import {View, Text, TextInput} from 'react-native';
import React, {useState, useEffect} from 'react';
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

//import regex
import {passwordRegex} from '../../../../utils/constants/Regex';

//import custom components
import {ValidateInputField} from '../../../../components/shared/Input';
import Button from '../../../../components/shared/Button';

//import set new password apiEndpoint
import {resetForgotPasswordPatient} from '../../../../services/patientServices';
import {resetForgotPasswordDoctor} from '../../../../services/doctorServices';
import ROLES from '../../../../utils/constants/ROLES';
import deviceStorage from '../../../../utils/helpers/deviceStorage';

const SetNewPassword = ({route, navigation}) => {
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

  const [isPasswordVisible, setisPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');

  useEffect(() => {
    //method to fetch roles from device storage and email along with otp from navigation params
    const getData = async () => {
      let data = await deviceStorage.loadItem('role');
      setRole(data ? data : ROLES.patient);
      setEmail(route.params.email);
      setOtp(route.params.otp);
    };
    getData();
  }, []);

  onSubmit = async data => {
    try {
      let response;
      if (role === ROLES.patient) {
        //call patient reset password api
        response = await resetForgotPasswordPatient({
          email: email,
          password: data?.password,
          resetPasswordToken: otp,
        });
      } else {
        //call patient reset password api
        response = await resetForgotPasswordDoctor({
          email: email,
          password: data?.password,
          resetPasswordToken: otp,
        });
      }
      console.log(response.data);
      alert(response.data.message);

      //navigate to login screen
      navigation.navigate('Auth', {
        screen: 'Login',
      });
    } catch (err) {
      console.log(err.response.data);
      alert(err.response.data.message);
    }
  };

  return (
    <StaticContainer
      customHeaderEnable={true}
      customHeaderName={'Set New Password'}>
      <View style={styles.container}>
        {/* Screen logo */}
        <View style={styles.logoContainer}>
          <SvgImage width={dimensions.Width} height={dimensions.Height / 3} />
        </View>

        {/* fields */}
        <View style={styles.fieldsContainer}>
          {/* reset password text */}
          <View style={styles.textContainer}>
            <Text style={styles.text}>Create a new password</Text>
          </View>
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
      </View>
    </StaticContainer>
  );
};

export default SetNewPassword;

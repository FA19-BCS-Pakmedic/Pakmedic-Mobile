import {Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
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

//utility helper functions
import deviceStorage from '../../../../utils/helpers/deviceStorage';

const ForgotPassword = ({navigation}) => {
  //states
  const [role, setRole] = useState('');

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



  
  useEffect(() => {
    const getRole = async () => {
      const data = await deviceStorage.loadItem('role');
      setRole(data ? data : ROLES.patient);
    };
    getRole();

  }, []);

  const onSubmit = async data => {
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

      //navigate to otp verification screen
      navigation.navigate('Auth', {
        screen: 'OtpVerification',
        params: {
          email: data.email,
        },
      });
    } catch (err) {
      console.log(err.response.data);
      alert(err.response.data.message);
    }
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
          <Text style={styles.text}>Enter your account email</Text>
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

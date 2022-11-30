import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {useForm} from 'react-hook-form';

//importing images
import SVGImage from '../../../../assets/svgs/login-screen-icon.svg';
import GoogleLogo from '../../../../assets/svgs/google-logo.svg';
import FaceBookLogo from '../../../../assets/svgs/facebook-logo.svg';

// custom styles import
import styles from './styles';

//import themes
import colors from '../../../../utils/styles/themes/colors';
import dimensions from '../../../../utils/styles/themes/dimensions';

// custom components import
import {ValidateInputField} from '../../../../components/shared/Input';
import Button from '../../../../components/shared/Button';
import {TextDivider} from '../../../../components/shared/Divider';
import StaticContainer from '../../../../containers/StaticContainer';

//constants import
import {emailRegex, passwordRegex} from '../../../../utils/constants/Regex';

//import API call for login
import {loginPatient} from '../../../../services/patientServices';

//importing deviceStorage handler
import deviceStorage from '../../../../utils/helpers/deviceStorage';
import {loginDoctor} from '../../../../services/doctorServices';
import ROLES from '../../../../utils/constants/ROLES';

const Login = ({navigation}) => {
  // hook for hiding and showing password
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  //hook for react hook forms
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    mode: 'all',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  //on submit of sign up form
  const onSubmit = async data => {
    //TODO: GET ROLE FROM LOCAL STORAGE TO CALL THE RESPECTIVE LOGIN FUNCTION
    const role = 'Doctor';

    try {
      let response;
      if (role === ROLES.patient) {
        //call patient login api
        response = await loginPatient({
          email: data?.email,
          password: data?.password,
        });
      } else {
        //call doctor login api
        response = await loginDoctor({
          email: data?.email,
          password: data?.password,
        });
      }

      // console.log(response.data);
      await deviceStorage.saveItem('id_token', response?.data?.token);
      console.log(await deviceStorage.loadItem('id_token'));
      alert('Login Successful');
    } catch (err) {
      console.log(err.response.data);
      alert(err.response.data.message);
    }

    console.log(data, 'data');
    console.log(errors, 'error');
  };

  //navigate to signup screen
  const navigateToRegisterScreen = () => {
    console.log('This function is being called');
    navigation.navigate('Auth', {
      screen: 'RegisterNavigation',
      params: {
        screen: 'Register',
      },
    });
  };

  return (
    <StaticContainer>
      {/* icon */}

      <View style={styles.logoContainer}>
        <SVGImage width={dimensions.Width} height={dimensions.Height / 3} />
      </View>
      {/* email and password fields */}
      <View style={styles.formContainer}>
        {/* email field */}
        <ValidateInputField
          placeholder="Email"
          type="outlined"
          width="93%"
          placeholderTextColor={colors.secondary1}
          keyboardType="email-address"
          control={control}
          title={'Email'}
          name="email"
          rules={{
            required: "Email can't be empty",
            pattern: {
              value: emailRegex,
              message: 'Please enter a valid email',
            },
          }}
        />
        {/* password field */}
        <ValidateInputField
          placeholder="Password"
          type="outlined"
          width="85.5%"
          placeholderTextColor={colors.secondary1}
          keyboardType="password"
          control={control}
          name="password"
          title={'Password'}
          isPasswordField={true}
          isPasswordVisible={!isPasswordVisible}
          setIsPasswordVisible={setIsPasswordVisible}
          rules={{
            required: "Password can't be empty",
            pattern: {
              value: passwordRegex,
              message: 'Please enter a valid password',
            },
          }}
        />
      </View>

      {/* forgot password text */}
      <TouchableOpacity style={styles.textContainer}>
        <Text style={styles.text}>Forgot Password?</Text>
      </TouchableOpacity>

      {/* login button */}
      <Button
        onPress={handleSubmit(onSubmit)}
        label="Login"
        type="filled"
        width="100%"
      />

      {/* divider */}
      <TextDivider label="Or Login With" color={colors.secondary1} gap={40} />

      {/* TODO: ADD SOCIAL BUTTONS */}
      <View style={styles.socialButtonContainer}>
        {/* facebook login button */}
        <TouchableOpacity style={styles.socialButton}>
          <FaceBookLogo
            width={dimensions.Width / 10}
            height={dimensions.Height / 20}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <GoogleLogo
            width={dimensions.Width / 10}
            height={dimensions.Height / 20}
          />
        </TouchableOpacity>
      </View>

      {/* register with text */}
      <TouchableOpacity
        style={styles.registerTextContainer}
        onPress={navigateToRegisterScreen}>
        <Text style={styles.text}>Don't have an account? </Text>
        <Text>
          <Text style={styles.registerText}>Register Now</Text>
        </Text>
      </TouchableOpacity>
    </StaticContainer>
  );
};

export default Login;

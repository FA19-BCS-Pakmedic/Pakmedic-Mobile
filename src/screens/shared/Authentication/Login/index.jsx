import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {useSelector, useDispatch} from 'react-redux';

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

//constants import
import {emailRegex, passwordRegex} from '../../../../utils/constants/Regex';
import ROLES from '../../../../utils/constants/ROLES';

//import container
import StaticContainer from '../../../../containers/StaticContainer';

//import API call for login
import {getPatient, loginPatient} from '../../../../services/patientServices';
import {getDoctor, loginDoctor} from '../../../../services/doctorServices';

//importing deviceStorage handler
import deviceStorage from '../../../../utils/helpers/deviceStorage';
import {
  authSuccess,
  setButtonLoading,
  setLoading,
} from '../../../../setup/redux/actions';

const Login = ({navigation}) => {
  // states
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const role = useSelector(state => state.role.role);

  const dispatch = useDispatch();

  //hook for react hook forms
  const {control, handleSubmit, setValue, watch} = useForm({
    mode: 'all',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  

  //on submit of sign up form
  const onSubmit = async data => {
    setIsLoading(true);
    // console.log('after setting button loading', isLoading);
    try {
      const response =
        role === ROLES.doctor
          ? await loginDoctor({email: data?.email, password: data?.password})
          : await loginPatient({email: data?.email, password: data?.password});

      // preserving jwt token in async storage
      await deviceStorage.saveItem('jwtToken', response?.data?.token);

      // setting the global state with the jwt and user information received in the response
      dispatch(
        authSuccess({
          user: response?.data?.user,
          token: response?.data?.token,
        }),
      );

      alert('Login Successful');
      setIsLoading(false);

      //clear all inputs
      setValue('email', '');
      setValue('password', '');

      //navigate to the app stack
      navigation.navigate('App');
    } catch (err) {
      console.log(err.response.data);
      alert(err.response.data.message);
      setIsLoading(false);
    }
  };

  //navigate to signup screen
  const navigateToRegisterScreen = () => {
    navigation.navigate('Auth', {
      screen: 'Register',
    });
  };

  //navigate to forgot password screen
  const navigateToForgotPasswordScreen = () => {
    navigation.navigate('Auth', {
      screen: 'ForgotPassword',
    });
  };

  return (
    <StaticContainer>
      <View style={styles.container}>
        {/* icon */}

        <View style={styles.imageContainer}>
          <SVGImage
            width={dimensions.Width / 1.6}
            height={dimensions.Height / 3}
          />
        </View>

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
          text={watch('email')}
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
          text={watch('password')}
        />

        {/* forgot password text */}
        <TouchableOpacity
          style={styles.textContainer}
          onPress={navigateToForgotPasswordScreen}>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>

        {/* login button */}
        <Button
          onPress={handleSubmit(onSubmit)}
          label="Login"
          type="filled"
          width="100%"
          isLoading={isLoading}
        />

        {/* divider */}
        <TextDivider label="Or Login With" color={colors.secondary1} gap={40} />

        {/*SOCIAL BUTTONS */}
        <View style={styles.socialButtonContainer}>
          {/* facebook login button */}
          <TouchableOpacity style={styles.socialButton}>
            <FaceBookLogo
              width={dimensions.Width / 12}
              height={dimensions.Height / 22}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <GoogleLogo
              width={dimensions.Width / 12}
              height={dimensions.Height / 22}
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
      </View>
    </StaticContainer>
  );
};

export default Login;

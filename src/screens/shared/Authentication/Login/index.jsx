import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
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
import ScrollContainer from '../../../../containers/ScrollContainer';

//import API call for login
import {loginPatient} from '../../../../services/patientServices';

//importing deviceStorage handler
import deviceStorage from '../../../../utils/helpers/deviceStorage';
import {loginDoctor} from '../../../../services/doctorServices';
import ROLES from '../../../../utils/constants/ROLES';

const Login = ({navigation}) => {
  // states
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [role, setRole] = useState('');

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

  //TEMPORARY USEEFFECT HOOK FOR FETCHING THE ROLE FROM THE ASYNC STORAGE
  useEffect(() => {
    const getRole = async () => {
      const role = await deviceStorage.getItem('role');
      setRole(role);
    };
    getRole();

    console.log(role);
  }, []);

  //on submit of sign up form
  const onSubmit = async data => {
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

      //TODO: navigate to the respctive dashboard screen of the role
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

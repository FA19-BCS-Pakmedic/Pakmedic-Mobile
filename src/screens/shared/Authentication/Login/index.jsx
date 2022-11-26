import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import SVGImage from '../../../../assets/svgs/login-screen-icon.svg';
import {
  FacebookSocialButton,
  GoogleSocialButton,
} from 'react-native-social-buttons';
import {useForm} from 'react-hook-form';

// custom styles import
import styles from './styles';
import colors from '../../../../utils/styles/themes/colors';

// custom components import
import {ValidateInputField} from '../../../../components/shared/Input';
import Button from '../../../../components/shared/Button';
import {TextDivider} from '../../../../components/shared/Divider';

//constants import
import {emailRegex, passwordRegex} from '../../../../utils/constants/Regex';
import StaticContainer from '../../../../containers/StaticContainer';

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
  const onSubmit = data => {
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

      <SVGImage width={300} height={300} />

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

      {/* login button */}
      <Button
        onPress={handleSubmit(onSubmit)}
        label="Login"
        type="filled"
        width="100%"
      />

      {/* divider */}
      <TextDivider label="Or Login With" color={colors.secondary1} />

      {/* TODO: ADD SOCIAL BUTTONS */}
      <View style={styles.socialButtonContainer}></View>

      {/* register with text */}
      <View style={styles.registerTextContainer}>
        <Text style={styles.text}>Don't have an account? </Text>
        <TouchableOpacity onPress={navigateToRegisterScreen}>
          <Text style={styles.registerText}>Register Now</Text>
        </TouchableOpacity>
      </View>
    </StaticContainer>
  );
};

export default Login;

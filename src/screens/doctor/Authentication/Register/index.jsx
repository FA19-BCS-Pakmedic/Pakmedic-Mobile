import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {useState} from 'react';
import {
  FacebookSocialButton,
  GoogleSocialButton,
} from 'react-native-social-buttons';
import {useForm} from 'react-hook-form';

// custom styles import
import styles from './styles';
import colors from '../../../../utils/styles/themes/colors';

// custom components import
import {
  ValidateInputField,
  ContactInputField,
} from '../../../../components/shared/Input';
import Button from '../../../../components/shared/Button';
import {TextDivider} from '../../../../components/shared/Divider';
import RadioGroup from '../../../../components/shared/Radio';
import Dropdown from '../../../../components/shared/Dropdown';

// import constants
import CITIES from '../../../../utils/constants/Cities';
import GENDERS from '../../../../utils/constants/Genders';
import {
  pmcIdRegex,
  emailRegex,
  passwordRegex,
  phoneNumberRegex,
} from '../../../../utils/constants/Regex';

const Register = ({navigation}) => {
  // useForm hook from react-hook-form
  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
    setValue,
    clearErrors,
    watch,
  } = useForm({
    mode: 'all',
    revalidate: 'all',
    defaultValues: {
      pmcId: '',
      email: '',
      password: '',
      confirmPassword: '',
      phoneNumber: '',
      city: '',
      gender: '',
    },
  });

  // for setting the password visibility
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  // for opening and closing the Dropdown
  const [open, setOpen] = useState(false);

  // form submit handler
  const onSubmit = data => {
    console.log(data, 'data');
    console.log(isValid, 'isValid');
    console.log('error', errors);
  };

  //function for setting the value of city
  const setCity = callback => {
    setValue('city', callback());
    clearErrors('city');
  };

  //function for setting the value of gender
  const setGender = gender => {
    setValue('gender', gender);
    clearErrors('gender');
  };

  //navigate back to login screen
  //navigate to signup screen
  const navigateToLoginScreen = () => {
    console.log('This function is being called');
    navigation.navigate('Auth', {
      screen: 'LoginNavigation',
      params: {
        screen: 'Login',
      },
    });
  };

  return (
    <View style={styles.root}>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.child}>
        {/* form */}
        <View style={styles.formContainer}>
          {/* pmc id field */}
          <ValidateInputField
            placeholder="PMC ID"
            type="outlined"
            width="93%"
            placeholderTextColor={colors.secondary1}
            control={control}
            name="pmcId"
            rules={{
              required: "PMC ID can't be empty",
              minLength: {
                value: 3,
                message: 'PMC ID must be at least 3 characters',
              },
              pattern: {value: pmcIdRegex, message: 'Invalid PMC ID'},
            }}
          />

          {/* email field */}
          <ValidateInputField
            placeholder="Email"
            type="outlined"
            width="93%"
            placeholderTextColor={colors.secondary1}
            keyboardType="email-address"
            control={control}
            name="email"
            rules={{
              required: "Email can't be empty",
              pattern: {value: emailRegex, message: 'Invalid Email'},
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
            isPasswordField={true}
            isPasswordVisible={!isPasswordVisible}
            setIsPasswordVisible={setIsPasswordVisible}
            rules={{
              required: "Password can't be empty",
              pattern: {
                value: passwordRegex,
                message:
                  'Password must contain atleast 1 uppercase, 1 lowercase, and 1 number',
              },
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters',
              },
            }}
          />
          {/* confirm password field */}
          <ValidateInputField
            placeholder="Confirm Password"
            type="outlined"
            width="85.5%"
            placeholderTextColor={colors.secondary1}
            keyboardType="password"
            control={control}
            name="confirm-password"
            isPasswordField={true}
            isPasswordVisible={!isConfirmPasswordVisible}
            setIsPasswordVisible={setIsConfirmPasswordVisible}
            rules={{
              required: "Confirm password can't be empty",
              validate: value => {
                return value === watch('password') || 'Passwords do not match';
              },
            }}
          />
          {/* contact field */}
          <ContactInputField
            type="outlined"
            width="86%"
            control={control}
            name="contact"
            rules={{
              required: "Phone number can't be empty",
              pattern: {
                value: phoneNumberRegex,
                message: 'Invalid phone number',
              },
            }}
          />

          {/* cities dropdown */}
          <Dropdown
            open={open}
            setOpen={setOpen}
            items={CITIES}
            control={control}
            // value={watch('city')}
            setValue={setCity}
            name="city"
            placeholder="Please select your city"
            rules={{
              required: 'Please select a city',
              validate: value => value !== null || 'Please select a city',
            }}
          />

          {/* genders radio buttons */}
          <RadioGroup
            values={GENDERS}
            selected={watch('gender')}
            setSelected={setGender}
            title="Gender"
            name="gender"
            control={control}
            rules={{required: 'Please select a gender'}}
          />
        </View>

        {/* Register button */}
        <Button
          onPress={handleSubmit(onSubmit)}
          label="Register"
          type="filled"
          width="100%"
        />

        {/* divider */}
        <TextDivider label="Or Register With" color={colors.secondary1} />

        {/* social buttons */}
        <View style={styles.socialButtonsContainer}>
          <FacebookSocialButton
            buttonViewStyle={{
              width: '100%',
              padding: 2,
            }}
            logoStyle={{
              width: 30,
              height: 30,
            }}
            buttonText="Register With Facebook"
          />
          <GoogleSocialButton
            buttonViewStyle={{
              alignItems: 'center',
              width: '100%',
              padding: 2,
              borderWidth: 1,
              borderColor: '#484848',
            }}
            logoStyle={{
              width: 30,
              height: 30,
            }}
            buttonText="Register With Google"
          />
        </View>

        {/* register with text */}
        <View style={styles.registerTextContainer}>
          <Text style={styles.text}>Already have an account? </Text>
          <TouchableOpacity onPress={navigateToLoginScreen}>
            <Text style={styles.registerText}>Login Now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Register;

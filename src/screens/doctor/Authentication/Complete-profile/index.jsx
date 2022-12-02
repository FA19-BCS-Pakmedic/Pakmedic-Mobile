import {View, Text, ScrollView} from 'react-native';
import React, {useState, Fragment} from 'react';
import {useForm} from 'react-hook-form';

// import icon
import SVGImage from '../../../../assets/svgs/login-screen-icon.svg';

// import styles
import {styles} from './styles';
import colors from '../../../../utils/styles/themes/colors';

//import container
import ScrollContainer from '../../../../containers/ScrollContainer';

// import custom components
import Button from '../../../../components/shared/Button';
import RadioGroup from '../../../../components/shared/Radio';
import Dropdown from '../../../../components/shared/Dropdown';
import {
  ContactInputField,
  ValidateInputField,
} from '../../../../components/shared/Input';

// import constants
import CITIES from '../../../../utils/constants/Cities';
import GENDERS from '../../../../utils/constants/Genders';
import {
  pmcIdRegex,
  passwordRegex,
  phoneNumberRegex,
} from '../../../../utils/constants/Regex';

const CompleteProfile = () => {
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

  return (
    <ScrollContainer
      customHeaderEnable={true}
      customHeaderName="Complete Profile">
      <View style={styles.container}>
        {/* page icon */}
        <SVGImage width={150} height={150} />
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
            title={'PMC ID'}
            rules={{
              required: "PMC ID can't be empty",
              minLength: {
                value: 3,
                message: 'PMC ID must be at least 3 characters',
              },
              pattern: {value: pmcIdRegex, message: 'Invalid PMC ID'},
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
            title={'Password'}
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
            title={'Confirm Password'}
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
            title={'Phone number'}
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
            title={'Cities'}
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
        {/* <View style={styles.buttonContainer}> */}
        <Button
          onPress={handleSubmit(onSubmit)}
          label="Register"
          type="filled"
          width="100%"
        />
      </View>
    </ScrollContainer>
  );
};

export default CompleteProfile;

import {TouchableOpacity, Text, View} from 'react-native';
import {useState, useEffect, useRef} from 'react';
import {useForm} from 'react-hook-form';

// import container
import ScrollContainer from '../../../../containers/ScrollContainer';

// import icon
import SVGImage from '../../../../assets/svgs/login-screen-icon.svg';

//import styles
import styles from './styles';

//importing svgs
import GoogleLogo from '../../../../assets/svgs/google-logo.svg';
import FaceBookLogo from '../../../../assets/svgs/facebook-logo.svg';

//import theme
import colors from '../../../../utils/styles/themes/colors';
import dimensions from '../../../../utils/styles/themes/dimensions';
import fonts from '../../../../utils/styles/themes/fonts';

//import custom components
import {
  ValidateInputField,
  ContactInputField,
} from '../../../../components/shared/Input';
import Button from '../../../../components/shared/Button';
import {TextDivider} from '../../../../components/shared/Divider';
import RadioGroup from '../../../../components/shared/Radio';
import AutoNextInput from '../../../../components/shared/AutoNextInput';
import CustomDatePicker from '../../../../components/shared/CustomDatePicker';
import ErrorMessage from '../../../../components/shared/ErrorMessage';

// import constants
import CITIES from '../../../../utils/constants/Cities';
import GENDERS from '../../../../utils/constants/Genders';
import {
  pmcIdRegex,
  stringRegex,
  emailRegex,
  passwordRegex,
  phoneNumberRegex,
  numberRegex,
} from '../../../../utils/constants/Regex';
import StaticContainer from '../../../../containers/StaticContainer';

const CompleteProfile = () => {
  //input refs
  const inputRef1 = useRef('');
  const inputRef2 = useRef('');
  const inputRef3 = useRef('');

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
      name: '',
      password: '',
      confirmPassword: '',
      phoneNumber: '',
      dob: new Date(),
      gender: '',
      cnic1: '',
      cnic2: '',
      cnic3: '',
    },
  });

  // for setting the password visibility
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  //cnic error
  const [cnicError, setCnicError] = useState(false);

  // for date picker
  const [date, setDate] = useState(new Date());

  // for opening and closing date modal
  const [openDate, setOpenDate] = useState(false);

  // form submit handler
  const onSubmit = data => {
    console.log(data, 'data');
    console.log(isValid, 'isValid');
    console.log('error', errors);
  };

  //function for setting the value of gender
  const setGender = gender => {
    setValue('gender', gender);
    clearErrors('gender');
  };

  const onChangeDate = date => {
    console.log(date);

    if (date < new Date()) {
      setDate(date);
      setOpenDate(false);
      setValue('dob', date);
      clearErrors('dob');
    }
  };

  // useEffect(() => {
  //   console.log(date);
  // }, [date]);

  //navigate back to login screen
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
    <StaticContainer
      customHeaderEnable={true}
      customHeaderName="Complete Profile"
      isBack={false}>
      <View style={styles.container}>
        {/* page image */}
        <SVGImage
          width={dimensions.Width / 2}
          height={dimensions.Height / 6.5}
        />
        {/* name field */}
        <ValidateInputField
          placeholder="Name"
          type="outlined"
          width="93%"
          placeholderTextColor={colors.secondary1}
          keyboardType="text"
          control={control}
          title={'Name'}
          name="name"
          rules={{
            required: "Name can't be empty",
            minLength: {value: 3, message: 'Name must be atleast 3 characters'},
            pattern: {value: stringRegex, message: 'Invalid Name'},
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
        {/* dob date picker */}
        <CustomDatePicker
          type="outlined"
          open={openDate}
          setOpen={setOpenDate}
          onChangeDate={onChangeDate}
          name="DOB"
          date={date}
          maximumDate={new Date()}
          rules={{
            required: "Date of birth can't be empty",
            validate: value => {
              return value < new Date() || "Date can't be in future";
            },
          }}
          control={control}
          title={'Date of birth'}
        />
        {/* genders radio buttons */}
        {/* <View></View> */}
        <Text style={styles.genderText}>Gender</Text>
        <RadioGroup
          values={GENDERS}
          selected={watch('gender')}
          setSelected={setGender}
          title="Gender"
          name="gender"
          control={control}
          rules={{required: 'Please select a gender'}}
        />

        {/* CNIC container */}
        {/* <View style={styles.container}>
          <Text style={styles.cnicText}>CNIC</Text>
          <View style={styles.cnicContainer}>
            <AutoNextInput
              type="outlined"
              width="28%"
              maxLength={5}
              ref={inputRef1}
              name="cnic1"
              customError={cnicError}
              setCustomError={setCnicError}
              control={control}
              height={17}
              rules={{minLength: {value: 5}, pattern: {value: numberRegex}}}
              onChangeText={text => {
                inputRef2.current.focus();
                setValue('cnic1', text);
              }}
            />
            <AutoNextInput
              type="outlined"
              width="48%"
              maxLength={7}
              ref={inputRef2}
              name="cnic2"
              customError={cnicError}
              setCustomError={setCnicError}
              control={control}
              height={17}
              rules={{minLength: {value: 7}, pattern: {value: numberRegex}}}
              onChangeText={text => {
                inputRef3.current.focus();
                setValue('cnic2', text);
              }}
            />
            <AutoNextInput
              type="outlined"
              width="18%"
              maxLength={1}
              ref={inputRef3}
              name="cnic3"
              customError={cnicError}
              setCustomError={setCnicError}
              control={control}
              height={17}
              rules={{minLength: {value: 1}, pattern: {value: numberRegex}}}
              onChangeText={text => {
                setValue('cnic3', text);
              }}
            />
          </View>
          {cnicError && <ErrorMessage message={'Invalid CNIC'} />}
        </View> */}

        {/* Register button */}
        <Button
          onPress={handleSubmit(onSubmit)}
          label="Register"
          type="filled"
          width="100%"
        />

        {/* register with text */}
        <View style={styles.registerTextContainer}>
          <Text style={styles.text}>Already have an account? </Text>
          <TouchableOpacity onPress={navigateToLoginScreen}>
            <Text style={styles.registerText}>Login Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </StaticContainer>
  );
};

export default CompleteProfile;

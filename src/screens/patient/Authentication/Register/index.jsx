import {TouchableOpacity, Text, View} from 'react-native';
import {useState, useEffect, useRef} from 'react';
import {useForm} from 'react-hook-form';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

// import container
import StaticContainer from '../../../../containers/StaticContainer';

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

import {useCustomToast} from '../../../../hooks/useCustomHook';

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

import ROLES from '../../../../utils/constants/ROLES';

//import patient service
import {
  loginPatient,
  registerPatient,
} from '../../../../services/patientServices';
import deviceStorage from '../../../../utils/helpers/deviceStorage';
import {useDispatch} from 'react-redux';
import {authLogout, authSuccess} from '../../../../setup/redux/actions';
import {loginVox} from '../../../../services/voxServices';
import {ValidateDropdown} from '../../../../components/shared/Dropdown';
import Cities from '../../../../utils/constants/Cities';
import {register} from '../../../../services/notificationService';

const PatientRegister = ({navigation}) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  // useForm hook from react-hook-form
  const {control, handleSubmit, setValue, clearErrors, setError, watch} =
    useForm({
      mode: 'all',
      revalidate: 'all',
      defaultValues: {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        dob: new Date(),
        gender: '',
        location: '',
      },
    });

  // for setting the password visibility
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  //cnic error
  const {showToast} = useCustomToast();

  // for date picker
  const [date, setDate] = useState(new Date());

  // for opening and closing date modal
  const [openDate, setOpenDate] = useState(false);

  // form submit handler
  const onSubmit = async data => {
    console.log(data);

    //creating a patient object to send to the backend.
    const patient = {
      name: data?.name,
      email: data?.email,
      password: data?.password,
      phone: data?.phone,
      dob: `${
        data?.dob.getMonth() > 9
          ? `${data?.dob.getMonth() + 1}`
          : `0${data?.dob?.getMonth() + 1}`
      }/${
        data?.dob.getDate() > 9
          ? `${data?.dob.getDate() + 1}`
          : `0${data?.dob?.getDate() + 1}`
      }/${data?.dob.getFullYear()}`,
      gender: data?.gender,
      // cnic: `${data?.cnic1}-${data?.cnic2}-${data?.cnic3}`,
      role: ROLES.patient,
      location: data?.location,
    };

    console.log(patient);

    try {
      const response = await registerPatient(patient);
      console.log('response', response.data);
      showToast('Patient was successfully registered', 'success');

      onSuccess(response);
    } catch (err) {
      dispatch(authLogout());

      showToast(err.response.data.message, 'danger');
      if (err.response.data.error.statusCode === 409) {
        setError('email', {
          type: 'conflict',
          message: 'This email is already registered',
        });
      }
    }
  };

  //google login functionality
  const onPressGoogleLogin = async () => {
    const email = 'awanmoeed2121@gmail.com';

    try {
      const response = await GoogleSignin.signIn();
      console.log(response);
      // TODO: Send the request to the backend api endpoint to check if the user exists and if they do log them in and if they don't redirect them to the complete profile page
      // try {
      //   const response = await loginDoctor({email, isThirdParty: true});
      //   onSuccess(response);
      // } catch (err) {
      //   dispatch(authLogout());
      //   console.log(err.response.data);
      //   // TODO: NAVIGATE THE USER TO COMPLETE PROFILE SCREEN ALONG WITH PASSING THE EMAIL THROUGH NAVIGATION PARAMS.
      //   navigation.navigate('Auth', {
      //     screen: 'CompleteProfile',
      // params: {
      //   email,
      //   // avatar
      // }
      //   });
      // }
    } catch (err) {
      console.log(err);
      await GoogleSignin.signOut();
    }

    // REMOVE THE ENTIRE CODE BELOW THIS COMMENT AFTER GOOGLE API WORKS
    try {
      const response = await loginPatient({email, isThirdParty: true});
      console.log(response);

      onSuccess(response);
    } catch (err) {
      dispatch(authLogout());
      console.log(err.response.data);
      // alert(err.response.data.message);
      // setIsLoading(false);
      // TODO: NAVIGATE THE USER TO COMPLETE PROFILE SCREEN ALONG WITH PASSING THE EMAIL THROUGH NAVIGATION PARAMS.
      navigation.navigate('Auth', {
        screen: 'CompleteProfile',
        params: {
          email,
        },
      });
    }

    // onLogin({email, isThirdParty: true});
  };

  //function if the registration was successful
  const onSuccess = async response => {
    const fcm = await deviceStorage.loadItem('FCMToken');

    console.log(response?.data?.user._id);

    await register({tokenID: fcm, user: response?.data?.user._id});

    //store jwt in local storage
    await deviceStorage.saveItem('jwtToken', response?.data?.token);
    const user = response.data.user;

    if (user) {
      try {
        await loginVox(user);
      } catch (err) {
        console.log(err);
        showToast('Error logging in to vox', 'danger');
      }
    }
    //initializing global state with jwt token and user object
    dispatch(
      authSuccess({user: response.data.user, token: response.data.token}),
    );

    // navigate to the app stack
    navigation.replace('App');
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
      screen: 'Login',
    });
  };

  // //google login functionality
  // onPressGoogleLogin = async () => {
  //   try {
  //     const response = await GoogleSignin.signIn();
  //     console.log(response);
  //     await GoogleSignin.signOut(); //remove this line of code
  //     // TODO: Send the request to the backend api endpoint to check if the user exists and redirect them to dashboard if they have completed their profile
  //   } catch (err) {
  //     console.log(err);
  //     await GoogleSignin.signOut();
  //   }
  // };

  return (
    <StaticContainer>
      <View style={styles.container}>
        {/* name field */}
        <ValidateInputField
          placeholder="Name"
          type="outlined"
          width="93%"
          placeholderTextColor={colors.secondary1}
          keyboardType="text"
          control={control}
          name="name"
          rules={{
            required: "Name can't be empty",
            minLength: {value: 3, message: 'Name must be atleast 3 characters'},
            pattern: {value: stringRegex, message: 'Invalid Name'},
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

        {/* cities dropdown */}
        <ValidateDropdown
          open={open}
          setOpen={setOpen}
          items={Cities}
          control={control}
          //title="City"
          setValue={callback => setValue('location', callback())}
          name="location"
          placeholder="Select your location"
          rules={{
            required: 'Please select a location',
            validate: value => value !== null || 'Please select a location',
          }}
        />

        {/* contact field */}
        <ContactInputField
          type="outlined"
          width="86%"
          control={control}
          name="phone"
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
          name="dob"
          date={date}
          rules={{
            required: "Date of birth can't be empty",
          }}
          maximumDate={new Date()}
          control={control}
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

        {/* CNIC container */}
        {/* <View>
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
        {/* <View style={styles.buttonContainer}> */}
        <Button
          onPress={handleSubmit(onSubmit)}
          label="Register"
          type="filled"
          width="100%"
        />
        {/* </View> */}

        {/* divider */}

        <TextDivider
          label="Or Register With"
          color={colors.secondary1}
          gap={50}
        />

        {/*SOCIAL BUTTONS */}
        <View style={styles.socialButtonContainer}>
          {/* facebook login button */}
          <TouchableOpacity style={styles.socialButton}>
            <FaceBookLogo
              width={dimensions.Width / 12}
              height={dimensions.Height / 22}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.socialButton}
            onPress={onPressGoogleLogin}>
            <GoogleLogo
              width={dimensions.Width / 12}
              height={dimensions.Height / 22}
            />
          </TouchableOpacity>
        </View>

        {/* register with text */}
        <TouchableOpacity
          style={styles.registerTextContainer}
          onPress={navigateToLoginScreen}>
          <Text style={styles.text}>Already have an account? </Text>
          <Text style={styles.registerText}>Login Now</Text>
        </TouchableOpacity>
      </View>
    </StaticContainer>
  );
};

export default PatientRegister;

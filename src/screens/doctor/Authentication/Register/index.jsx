import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

// custom styles import
import styles from './styles';

//import theme
import colors from '../../../../utils/styles/themes/colors';
import dimensions from '../../../../utils/styles/themes/dimensions';

//importing svgs
import GoogleLogo from '../../../../assets/svgs/google-logo.svg';
import FaceBookLogo from '../../../../assets/svgs/facebook-logo.svg';

// custom components import
import {
  ValidateInputField,
  ContactInputField,
} from '../../../../components/shared/Input';
import Button from '../../../../components/shared/Button';
import {TextDivider} from '../../../../components/shared/Divider';
import RadioGroup from '../../../../components/shared/Radio';
import {ValidateDropdown} from '../../../../components/shared/Dropdown';

// import constants
import CITIES from '../../../../utils/constants/Cities';
import GENDERS from '../../../../utils/constants/Genders';
import {
  pmcIdRegex,
  emailRegex,
  passwordRegex,
  phoneNumberRegex,
} from '../../../../utils/constants/Regex';
import ROLES from '../../../../utils/constants/ROLES';

//importing container
import StaticContainer from '../../../../containers/StaticContainer';

//importing doctors service to call end points
import {
  loginDoctor,
  pmcIdVerifyDoctor,
  registerDoctor,
} from '../../../../services/doctorServices';
import deviceStorage from '../../../../utils/helpers/deviceStorage';
import {useDispatch} from 'react-redux';
import {authLogout, authSuccess} from '../../../../setup/redux/actions';
import {loginVox} from '../../../../services/voxServices';

import {register} from '../../../../services/notificationService';
import {useCustomToast} from '../../../../hooks/useCustomToast';

import PopupAlerts from '../../../../components/shared/PopupAlerts';

const DoctorRegister = ({navigation}) => {
  //to store the information fetched from the pmc endpoint
  const [pmcData, setPmcData] = useState(null);

  const dispatch = useDispatch();

  //error hook to prevent form submission if pmc id is not verified
  const [isPmcIdVerified, setIsPmcIdVerified] = useState(false);
  const [pmcIdErrorMessage, setPmcIdErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [alertName, setAlertName] = useState('LoginSuccess');
  const [message, setMessage] = useState('');

  const Specialists = [
    {label: 'Cardiologist', value: 'Cardiologist'},
    {label: 'Dermatologist', value: 'Dermatologist'},
    {label: 'Endocrinologist', value: 'Endocrinologist'},
    {
      label: 'Gastroenterologist',
      value: 'Gastroenterologist',
    },
    {label: 'Hematologist', value: 'Hematologist'},
    {label: 'Neurologist', value: 'Neurologist'},
    {label: 'Gynecologist', value: 'Gynecologist'},
    {label: 'Oncologist', value: 'Oncologist'},
    {label: 'Ophthalmologist', value: 'Ophthalmologist'},

    {
      label: 'Otolaryngologist',
      value: 'Otolaryngologist',
    },
    {label: 'Pediatrician', value: 'Pediatrician'},
    {label: 'Psychiatrist', value: 'Psychiatrist'},
    {label: 'Pulmonologist', value: 'Pulmonologist'},
    {label: 'Radiologist', value: 'Radiologist'},
    {label: 'Rheumatologist', value: 'Rheumatologist'},
    {label: 'Urologist', value: 'Urologist'},
    {label: 'Allergist', value: 'Allergist'},
    {label: 'Dentist', value: 'Dentist'},
    {label: 'Dietitian', value: 'Dietitian'},
    {label: 'Nephrologist', value: 'Nephrologist'},
    {label: 'Obstetrician', value: 'Obstetrician'},
    {label: 'Orthopedist', value: 'Orthopedist'},
  ];

  // useForm hook from react-hook-form
  const {control, handleSubmit, setValue, clearErrors, watch, setError} =
    useForm({
      mode: 'all',
      revalidate: 'all',
      defaultValues: {
        pmcId: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        location: '',
        gender: '',
        speciality: '',
      },
    });

  // for setting the password visibility
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  // for opening and closing the Dropdown
  const [open, setOpen] = useState(false);
  const [openSpec, setOpenSpec] = useState(false);

  const {showToast} = useCustomToast();

  // form submit handler
  const onSubmit = async formData => {
    setLoading(true);
    if (isPmcIdVerified) {
      const issueDate = pmcData.RegistrationDate.split('/');
      const expiryDate = pmcData.ValidUpto.split('/');

      console.log(issueDate, expiryDate);

      const data = {
        ...formData,
        phone: formData?.phone,
        role: ROLES.doctor,
        name: pmcData?.Name?.toLowerCase(),
        qualifications: pmcData?.Qualifications,
        issueDate: `${issueDate[2]}-${issueDate[1]}-${issueDate[0]}`,
        expiryDate: `${expiryDate[2]}-${expiryDate[1]}-${expiryDate[0]}`,
        status: pmcData?.Status?.toLowerCase(),
        speciality: 'Dentist',
      };

      // console.log(data);
      try {
        const response = await registerDoctor(data);
        // alert('User registered successfully');
        // showToast('User registered successfully', 'success');

        // //storing jwt token to mobile storage
        // await deviceStorage.saveItem('jwtToken', response?.data?.token);

        // //initializing global state with jwt token and user object
        // dispatch(
        //   authSuccess({user: response.data.user, token: response.data.token}),
        // );

        // // navigate to the app stack
        // navigation.replace('App');
        await onSuccess(response);
      } catch (err) {
        dispatch(authLogout());
        console.log(err.response.data);
        // showToast(err.response.data.message, 'danger');
        setMessage(err.response.data.message);
        setAlertName('LoginFailure');

        if (err.response.data.error.statusCode === 409) {
          setError('email', {
            type: 'conflict',
            message: 'This email is already registered',
          });
        }
      } finally {
        setLoading(false);
        setModalVisible(true);
      }
    } else {
      dispatch(authLogout());
      setError('pmcId', {
        type: 'duplicate ID',
        message: pmcIdErrorMessage,
      });
    }
  };

  //on successfull registration
  const onSuccess = async response => {
    // Register the token
    // await register(token);

    const fcm = await deviceStorage.loadItem('FCMToken');

    console.log(response?.data?.user._id);

    await register({tokenID: fcm, user: response?.data?.user._id});

    //storing jwt token to mobile storage

    await deviceStorage.saveItem('jwtToken', response?.data?.token);

    const user = response?.data?.user;

    if (user) {
      try {
        await loginVox(user);
      } catch (err) {
        console.log(err);
        setMessage('Error logging in to vox');
        setAlertName('LoginFailure');
      }
    }

    //initializing global state with jwt token and user object
    dispatch(
      authSuccess({user: response.data.user, token: response.data.token}),
    );

    setMessage('User Registered Successfully, Logging you in...');
    setAlertName('LoginSuccess');

    // showToast('User registered successfully', 'success');

    // navigate to the app stack
    // navigation.replace('App');
  };

  //function for setting the value of city
  const setCity = callback => {
    setValue('location', callback());
    clearErrors('location');
  };

  //function for setting the value of gender
  const setGender = gender => {
    setValue('gender', gender);
    clearErrors('gender');
  };

  //function to send the pmc id to the backend to retrieve data from the pmc endpoint
  const getPmcData = async () => {
    try {
      const response = await pmcIdVerifyDoctor({pmcId: watch('pmcId')});
      const data = response?.data?.data;
      setPmcData(data);
      setIsPmcIdVerified(true);
      if (data) {
        clearErrors('pmcId');
      }
      console.log(data);
      showToast('Pmc Id verified', 'success');
    } catch (err) {
      showToast(err.response.data.message, 'danger');
      console.log(err.response.data);
      setIsPmcIdVerified(false);
      setPmcIdErrorMessage(err.response.data.message);
      setError('pmcId', {
        type: 'duplicate ID',
        message:
          err.response.data.error.statusCode === 500
            ? 'An error has occured fetching details'
            : err.response.data.message,
      });
    }
  };

  //navigate back to login screen
  const navigateToLoginScreen = () => {
    console.log('This function is being called');
    navigation.navigate('Auth', {
      screen: 'Login',
    });
  };

  //google login functionality
  const onPressGoogleLogin = async () => {
    const email = 'test4@gmail.com';

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
      const response = await loginDoctor({email, isThirdParty: true});
      await onSuccess(response);
    } catch (err) {
      dispatch(authLogout());
      console.log(err.response.data);
      showToast('Error authenticating users', 'danger');

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

  // //function to check if the user with the following email already exists and log them in if they do
  // const onLogin = async data => {
  //   try {
  //     const response = await loginDoctor({...data});

  //     console.log(response?.data);

  //     // preserving jwt token in async storage
  //     await deviceStorage.saveItem('jwtToken', response?.data?.token);

  //     // setting the global state with the jwt and user information received in the response
  //     dispatch(
  //       authSuccess({
  //         user: response?.data?.user,
  //         token: response?.data?.token,
  //       }),
  //     );

  //     alert('Login Successful');

  //     //navigate to the app stack
  //     navigation.replace('App');
  //   } catch (err) {
  //     dispatch(authLogout());
  //     console.log(err.response.data);
  //     // alert(err.response.data.message);
  //     // setIsLoading(false);
  //     // TODO: NAVIGATE THE USER TO COMPLETE PROFILE SCREEN ALONG WITH PASSING THE EMAIL THROUGH NAVIGATION PARAMS.
  //     navigation.navigate('Auth', {
  //       screen: 'CompleteProfile',
  //     });
  //   }
  // };

  return (
    <StaticContainer>
      <View style={styles.container}>
        {/* form */}
        <ScrollView
          style={{width: '100%'}}
          showsVerticalScrollIndicator={false}>
          <View style={styles.formContainer}>
            {/* pmc id field */}
            <ValidateInputField
              placeholder="PMC ID"
              type="outlined"
              width="93%"
              placeholderTextColor={colors.secondary1}
              onBlurEvent={getPmcData}
              control={control}
              name="pmcId"
              //title={'PMC ID'}
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
              //title={'Email'}
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
              //title={'Password'}
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
              name="confirmPassword"
              //title={'Confirm Password'}
              isPasswordField={true}
              isPasswordVisible={!isConfirmPasswordVisible}
              setIsPasswordVisible={setIsConfirmPasswordVisible}
              rules={{
                required: "Confirm password can't be empty",
                validate: value => {
                  return (
                    value === watch('password') || 'Passwords do not match'
                  );
                },
              }}
            />
            {/* contact field */}
            <ContactInputField
              type="outlined"
              width="86%"
              control={control}
              name="phone"
              //title={'Phone number'}
              rules={{
                required: "Phone number can't be empty",
                pattern: {
                  value: phoneNumberRegex,
                  message: 'Invalid phone number',
                },
              }}
            />

            {/* cities dropdown */}
            <ValidateDropdown
              open={open}
              setOpen={setOpen}
              items={CITIES}
              control={control}
              //title="City"
              setValue={setCity}
              name="location"
              placeholder="Please select your city"
              rules={{
                required: 'Please select a city',
                validate: value => value !== null || 'Please select a city',
              }}
            />

            <ValidateDropdown
              open={openSpec}
              setOpen={setOpenSpec}
              items={Specialists}
              control={control}
              //title="City"
              setValue={callback => {
                setValue('speciality', callback());
              }}
              name="speciality"
              placeholder="Please select your speciality"
              rules={{
                required: 'Please select a speciality',
                validate: value =>
                  value !== null || 'Please select a speciality',
              }}
            />

            {/* genders radio buttons */}
            <Text style={styles.radioText}>Gender</Text>
            <RadioGroup
              values={GENDERS}
              selected={watch('gender')}
              setSelected={setGender}
              //title="Gender"
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
            isLoading={loading}
          />

          {/* divider */}

          <TextDivider
            label="Or Register With"
            color={colors.secondary1}
            gap={50}
          />

          {/*SOCIAL BUTTONS */}
          <View style={styles.socialButtonContainer}>
            {/* facebook login button */}
            <TouchableOpacity style={styles.socialButton} disabled>
              <FaceBookLogo
                width={dimensions.Width / 10}
                height={dimensions.Height / 20}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.socialButton}
              onPress={onPressGoogleLogin}>
              <GoogleLogo
                width={dimensions.Width / 10}
                height={dimensions.Height / 20}
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
        </ScrollView>
        <PopupAlerts
          isModalVisible={isModalVisible}
          setModalVisible={setModalVisible}
          height={1.8}
          width={1.2}
          timer={2000}
          alertName={alertName}
          message={message}
          redirect={null}
          isReplace={true}
        />
      </View>
    </StaticContainer>
  );
};

export default DoctorRegister;

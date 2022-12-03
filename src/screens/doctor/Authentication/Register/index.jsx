import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {useState} from 'react';
import {useForm} from 'react-hook-form';

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
import ROLES from '../../../../utils/constants/ROLES';

//importing container
import ScrollContainer from '../../../../containers/ScrollContainer';

//importing doctors service to call end points
import {
  pmcIdVerifyDoctor,
  registerDoctor,
} from '../../../../services/doctorServices';

const Register = ({navigation}) => {
  //to store the information fetched from the pmc endpoint
  const [pmcData, setPmcData] = useState(null);

  //error hook to prevent form submission if pmc id is not verified
  const [isPmcIdVerified, setIsPmcIdVerified] = useState(false);
  const [pmcIdErrorMessage, setPmcIdErrorMessage] = useState('');

  // useForm hook from react-hook-form
  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
    setValue,
    clearErrors,
    watch,
    setError,
  } = useForm({
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
    },
  });

  // for setting the password visibility
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  // for opening and closing the Dropdown
  const [open, setOpen] = useState(false);

  // form submit handler
  const onSubmit = async formData => {
    if (isPmcIdVerified) {
      const issueDate = pmcData.RegistrationDate.split('/');
      const expiryDate = pmcData.ValidUpto.split('/');

      console.log(issueDate, expiryDate);

      const data = {
        ...formData,
        phone: `0${formData?.phone?.split('-')[1]}`,
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
        console.log(response.data);
        alert(response.data.message);
      } catch (err) {
        console.log(err.response.data);
        alert(err.response.data.message);
        if (err.response.data.error.statusCode === 409) {
          setError('email', {
            type: 'conflict',
            message: 'This email is already registered',
          });
        }
      }
    } else {
      setError('pmcId', {
        type: 'duplicate ID',
        message: pmcIdErrorMessage,
      });
    }
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
      const response = await pmcIdVerifyDoctor({pmcID: watch('pmcId')});
      const data = response?.data?.data;
      setPmcData(data);
      setIsPmcIdVerified(true);
      if (data) {
        clearErrors('pmcId');
      }
      console.log(data);
    } catch (err) {
      alert(err.response.data.message);
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
      screen: 'LoginNavigation',
      params: {
        screen: 'Login',
      },
    });
  };

  return (
    <ScrollContainer>
      <View style={styles.container}>
        {/* form */}
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
            name="confirmPassword"
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
            name="phone"
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
            title="City"
            setValue={setCity}
            name="location"
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
        <View style={styles.registerTextContainer}>
          <Text style={styles.text}>Already have an account? </Text>
          <TouchableOpacity onPress={navigateToLoginScreen}>
            <Text style={styles.registerText}>Login Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollContainer>
  );
};

export default Register;

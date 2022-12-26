import {View, Text, ScrollView} from 'react-native';
import React, {useState, Fragment} from 'react';
import {useForm} from 'react-hook-form';
import {useDispatch} from 'react-redux';

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
import dimensions from '../../../../utils/styles/themes/dimensions';
import {
  pmcIdVerifyDoctor,
  registerDoctor,
} from '../../../../services/doctorServices';
import {authLogout, authSuccess} from '../../../../setup/redux/actions';
import deviceStorage from '../../../../utils/helpers/deviceStorage';
import StaticContainer from '../../../../containers/StaticContainer';

const CompleteProfile = ({route, navigation}) => {
  const {email} = route.params;

  //to store the information fetched from the pmc endpoint
  const [pmcData, setPmcData] = useState(null);

  const dispatch = useDispatch();

  //error hook to prevent form submission if pmc id is not verified
  const [isPmcIdVerified, setIsPmcIdVerified] = useState(false);
  const [pmcIdErrorMessage, setPmcIdErrorMessage] = useState('');

  // for opening and closing the Dropdown
  const [open, setOpen] = useState(false);

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
      phone: '',
      location: '',
      gender: '',
    },
  });

  //function for setting the value of location
  const setLocation = callback => {
    setValue('location', callback());
    clearErrors('location');
  };

  //function for setting the value of gender
  const setGender = gender => {
    setValue('gender', gender);
    clearErrors('gender');
  };

  // form submit handler
  const onSubmit = async formData => {
    if (isPmcIdVerified) {
      const issueDate = pmcData.RegistrationDate.split('/');
      const expiryDate = pmcData.ValidUpto.split('/');

      console.log(issueDate, expiryDate);

      const data = {
        ...formData,
        email: email,
        phone: formData?.phone,
        role: ROLES.doctor,
        name: pmcData?.Name?.toLowerCase(),
        qualifications: pmcData?.Qualifications,
        issueDate: `${issueDate[2]}-${issueDate[1]}-${issueDate[0]}`,
        expiryDate: `${expiryDate[2]}-${expiryDate[1]}-${expiryDate[0]}`,
        status: pmcData?.Status?.toLowerCase(),
        speciality: 'Dentist', //TODO: REPLACE WITH A FIELD DATA
        isThirdParty: true,
      };

      console.log(data);
      try {
        const response = await registerDoctor(data);
        alert('User registered successfully');
        onSuccess(response);
      } catch (err) {
        dispatch(authLogout());
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
      dispatch(authLogout());
      setError('pmcId', {
        type: 'duplicate ID',
        message: pmcIdErrorMessage,
      });
    }
  };

  //on successfull registration
  const onSuccess = async response => {
    //storing jwt token to mobile storage
    await deviceStorage.saveItem('jwtToken', response?.data?.token);

    //initializing global state with jwt token and user object
    dispatch(
      authSuccess({user: response.data.user, token: response.data.token}),
    );

    // navigate to the app stack
    navigation.replace('App');
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

  return (
    <StaticContainer
      customHeaderEnable={true}
      customHeaderName="Complete Profile">
      <View style={styles.container}>
        {/* page icon */}
        <SVGImage width={dimensions.Width / 2} height={dimensions.Width / 2} />
        {/* form */}
        <View style={styles.formContainer}>
          {/* pmc id field */}
          <ValidateInputField
            placeholder="PMC ID"
            type="outlined"
            width="93%"
            placeholderTextColor={colors.secondary1}
            control={control}
            onBlurEvent={getPmcData}
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
            title={'Cities'}
            // value={watch('location')}
            setValue={setLocation}
            name="location"
            placeholder="Please select your location"
            rules={{
              required: 'Please select a location',
              validate: value => value !== null || 'Please select a location',
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
    </StaticContainer>
  );
};

export default CompleteProfile;

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
import {registerPatient} from '../../../../services/patientServices';
import {useDispatch} from 'react-redux';
import deviceStorage from '../../../../utils/helpers/deviceStorage';
import {authSuccess} from '../../../../setup/redux/actions';

const CompleteProfile = ({route, navigation}) => {
  const {email} = route.params;

  const dispatch = useDispatch();

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
      phoneNumber: '',
      dob: new Date(),
      gender: '',
    },
  });

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
      email: email,
      password: data?.password,
      phone: data?.phone,
      dob: `${
        data?.dob.getMonth().toString().length > 1
          ? `${data?.dob.getMonth() + 1}`
          : `0${data?.dob?.getMonth() + 1}`
      }/${
        data?.dob.getDate().toString().length > 1
          ? `${data?.dob.getDate() + 1}`
          : `0${data?.dob?.getDate() + 1}`
      }/${data?.dob.getFullYear()}`,
      gender: data?.gender,
      // cnic: `${data?.cnic1}-${data?.cnic2}-${data?.cnic3}`,
      role: ROLES.patient,
      isThirdParty: true,
    };

    console.log(patient);

    try {
      const response = await registerPatient(patient);
      console.log('response', response.data);
      alert('Patient was successfully registered');
      onSuccess(response);
    } catch (err) {
      dispatch(authLogout());
      alert(err.response.data.message);
      if (err.response.data.error.statusCode === 409) {
        setError('email', {
          type: 'conflict',
          message: 'This email is already registered',
        });
      }
    }
  };

  //on successfull registration
  const onSuccess = async response => {
    //storing jwt token to mobile storage
    await deviceStorage.saveItem('jwtToken', response?.data?.token);

    const user = response.data.user;

    if (user) {
      try {
        await loginVox(user);
      } catch (err) {
        console.log(err);
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

  return (
    <StaticContainer
      customHeaderEnable={true}
      customHeaderName="Complete Profile"
      isBack={false}>
      <View style={styles.container}>
        {/* page image */}
        <SVGImage width={dimensions.Width / 2} height={dimensions.Width / 2} />
        <View style={styles.formContainer}>
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
              minLength: {
                value: 3,
                message: 'Name must be atleast 3 characters',
              },
              pattern: {value: stringRegex, message: 'Invalid Name'},
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
          {/* dob date picker */}
          <CustomDatePicker
            type="outlined"
            open={openDate}
            setOpen={setOpenDate}
            onChangeDate={onChangeDate}
            name="dob"
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
      </View>
    </StaticContainer>
  );
};

export default CompleteProfile;

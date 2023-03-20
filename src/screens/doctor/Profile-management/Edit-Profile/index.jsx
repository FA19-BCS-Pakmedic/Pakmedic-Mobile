import {
  Image,
  Text,
  TouchableOpacity,
  View,
  TouchableHighlight,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useForm} from 'react-hook-form';

import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
  isInProgress,
  types,
} from 'react-native-document-picker';

import styles from './styles';
import StaticContainer from '../../../../containers/StaticContainer';
import {ValidateInputField} from '../../../../components/shared/Input';
import {ValidateDropdown} from '../../../../components/shared/Dropdown';
import Cities from '../../../../utils/constants/Cities';
import {
  emailRegex,
  phoneNumberRegex,
  stringRegex,
} from '../../../../utils/constants/Regex';
import colors from '../../../../utils/styles/themes/colors';
import dimensions from '../../../../utils/styles/themes/dimensions';
import ProfileImage from '../../../../assets/images/default-avatar.png';
import EditIcon from '../../../../assets/svgs/Edit.svg';
import Button from '../../../../components/shared/Button';
import ModalContainer from '../../../../containers/ModalContainer';
import {addAvatar, getDoctor} from '../../../../services/doctorServices';
import {useDispatch, useSelector} from 'react-redux';
import {apiEndpoint} from '../../../../utils/constants/APIendpoint';
import {setUseProxies} from 'immer';
import {authUpdate} from '../../../../setup/redux/slices/auth.slice';

const EditProfile = () => {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  const user = useSelector(state => state.auth.user);

  const dispatch = useDispatch();

  const [storedUser, setStoredUser] = useState(user);

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
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      location: user?.location || '',
    },
  });

  const [profileImage, setProfileImage] = useState(null);

  const uploadImage = async formData => {
    try {
      const response = await addAvatar(formData);
      updateUser();
    } catch (err) {
      console.log(err);
    }
  };

  const updateUser = async () => {
    try {
      const response = await getDoctor();
      console.log(response.data.data);

      setStoredUser(response.data.data.user);
      dispatch(authUpdate({user: response.data.data.user}));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (profileImage) {
      const formData = new FormData();

      formData.append('file', {
        uri: profileImage[0].uri,
        type: profileImage[0].type,
        name: profileImage[0].name,
      });

      uploadImage(formData);
    }
  }, [profileImage]);

  const handleError = err => {
    if (DocumentPicker.isCancel(err)) {
      console.warn('cancelled');
      // User cancelled the picker, exit any dialogs or menus and move on
    } else if (isInProgress(err)) {
      console.warn(
        'multiple pickers were opened, only the last will be considered',
      );
    } else {
      throw err;
    }
  };

  //function for setting the value of city
  const setCity = callback => {
    setValue('location', callback());
    clearErrors('location');
  };

  const onSubmit = async formData => {
    console.log(formData);
  };

  const openModal = () => {
    return (
      <>
        <ModalContainer
          isModalVisible={visible}
          setModalVisible={setVisible}
          width={dimensions.Width}
          type="bottom"
          backDropOpacity={0.3}
          padding={dimensions.Height / 50}
          height={dimensions.Height / 3.2}
          bgColor={'white'}
          borderColor={colors.primary1}>
          <View style={styles.modalContainer}>
            <View style={styles.headingContainer}>
              <Text style={styles.heading}>Change Profile Photo</Text>
            </View>
            <View style={styles.optionContainer}>
              <TouchableHighlight
                underlayColor="#f4f4f4"
                activeOpacity={1}
                style={styles.option}
                onPress={async () => {
                  try {
                    const pickerResult = await DocumentPicker.pickSingle({
                      presentationStyle: 'fullScreen',
                      copyTo: 'cachesDirectory',
                      type: [types.images],
                    });
                    setProfileImage([pickerResult]);
                  } catch (e) {
                    handleError(e);
                  }
                  setVisible(false);
                }}>
                <Text style={styles.optionText}>New Profile Photo</Text>
              </TouchableHighlight>
            </View>

            <View style={styles.optionContainer}>
              <TouchableHighlight
                underlayColor="#f4f4f4"
                activeOpacity={1}
                style={styles.option}
                onPress={() => {
                  setProfileImage(null);
                  setVisible(false);
                }}>
                <Text style={styles.optionText}>Remove Profile Photo</Text>
              </TouchableHighlight>
            </View>
          </View>
        </ModalContainer>
      </>
    );
  };

  // add image picker
  return (
    <StaticContainer
      customHeaderName={'Edit Profile'}
      customHeaderEnable={true}>
      <View style={styles.root}>
        {openModal()}
        <View style={styles.avatarContainer}>
          <Image
            source={{
              uri: `${apiEndpoint}files/${user.avatar}`,
            }}
            style={[
              styles.avatar,
              {width: dimensions.Width / 3, height: dimensions.Width / 3},
            ]}
          />

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.iconContainer}
            onPress={() => {
              setVisible(true);
            }}>
            <EditIcon />
          </TouchableOpacity>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.label}>Name</Text>
          <ValidateInputField
            placeholder="Enter Name"
            type="outlined"
            width="93%"
            placeholderTextColor={colors.secondary1}
            control={control}
            text={watch('name')}
            name="name"
            rules={{
              required: 'Name is required',
              pattern: {
                value: stringRegex,
                message: 'Name can only contain alphabets',
              },
            }}
          />

          <Text style={styles.label}>Email</Text>
          <ValidateInputField
            placeholder="Enter Email"
            type="outlined"
            width="93%"
            placeholderTextColor={colors.secondary1}
            keyboardType="email-address"
            control={control}
            isDisabled={true}
            text={watch('email')}
            name="email"
            rules={{
              required: "Email can't be empty",
              pattern: {value: emailRegex, message: 'Invalid Email'},
            }}
          />

          <Text style={styles.label}>Phone</Text>
          <ValidateInputField
            placeholder="Enter Phone"
            type="outlined"
            width="93%"
            placeholderTextColor={colors.secondary1}
            keyboardType="phone-pad"
            control={control}
            text={watch('phone')}
            name="phone"
            rules={{
              required: "phone can't be empty",
              pattern: {
                value: phoneNumberRegex,
                message: 'Invalid Phone number',
              },
            }}
          />

          <Text style={styles.label}>Cities</Text>
          <ValidateDropdown
            open={open}
            width={dimensions.Width / 1.09}
            setOpen={setOpen}
            items={Cities}
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
        </View>

        {/* Register button */}
        <Button
          onPress={handleSubmit(onSubmit)}
          label="Save Changes"
          type="filled"
          width="100%"
        />
      </View>
    </StaticContainer>
  );
};

export default EditProfile;

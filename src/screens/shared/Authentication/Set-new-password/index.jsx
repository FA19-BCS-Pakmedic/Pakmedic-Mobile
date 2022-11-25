import {View, Text, TextInput} from 'react-native';
import React from 'react';
import {useForm} from 'react-hook-form';

// import styles
import {styles} from './styles';
import colors from '../../../../utils/styles/themes/colors';

//import logo
import SvgImage from '../../../../assets/svgs/reset-password-screen-logo.svg';
import CustomNavHeader from '../../../../components/shared/CustomNavHeader';

//import regex
import {passwordRegex} from '../../../../utils/constants/Regex';

//import custom components
import {ValidateInputField} from '../../../../components/shared/Input';
import Button from '../../../../components/shared/Button';

const SetNewPassword = () => {
  //hook for react hook forms
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    mode: 'all',
    defaultValues: {
      oldPassword: '',
      newPassword: '',
    },
  });

  const [isOldPasswordVisible, setIsOldPasswordVisible] = React.useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = React.useState(false);

  onSubmit = data => {
    console.log(data);
  };

  return (
    <React.Fragment>
      {/* custom navigation header with screen name and back navigation button */}
      <CustomNavHeader screenName={'New Password'} />
      <View style={styles.root}>
        {/* Screen logo */}
        <SvgImage width={250} height={250} />
        {/* reset password text */}
        <View style={styles.textContainer}>
          <Text style={styles.text}>Create a new password</Text>
        </View>
        {/* fields */}
        <View style={styles.fieldsContainer}>
          {/* Old password */}
          <ValidateInputField
            placeholder="Enter you old password"
            type="outlined"
            width="85.5%"
            placeholderTextColor={colors.secondary1}
            keyboardType="password"
            control={control}
            name="oldPassword"
            isPasswordField={true}
            isPasswordVisible={!isOldPasswordVisible}
            setIsPasswordVisible={setIsOldPasswordVisible}
            rules={{
              required: "Password can't be empty",
              pattern: {
                value: passwordRegex,
                message: 'Please enter a valid password',
              },
            }}
          />

          {/* New password */}
          <ValidateInputField
            placeholder="Enter you new password"
            type="outlined"
            width="85.5%"
            placeholderTextColor={colors.secondary1}
            keyboardType="password"
            control={control}
            name="newPassword"
            isPasswordField={true}
            isPasswordVisible={!isNewPasswordVisible}
            setIsPasswordVisible={setIsNewPasswordVisible}
            rules={{
              required: "Password can't be empty",
              pattern: {
                value: passwordRegex,
                message: 'Please enter a valid password',
              },
            }}
          />
        </View>

        {/* Change password button */}
        <View style={styles.buttonContainer}>
          <Button
            width="90%"
            type="filled"
            onPress={handleSubmit(onSubmit)}
            label="Verify Code"
          />
        </View>
      </View>
    </React.Fragment>
  );
};

export default SetNewPassword;

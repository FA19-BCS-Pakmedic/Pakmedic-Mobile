import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import * as Animatable from 'react-native-animatable';

// import styles
import {styles} from './styles';
import colors from '../../../../utils/styles/themes/colors';

//import logo
import SvgImage from '../../../../assets/svgs/forgot-password-screen-icon.svg';


//importing themes
import dimensions from '../../../../utils/styles/themes/dimensions';

//import regex
import {emailRegex, phoneNumberRegex} from '../../../../utils/constants/Regex';

//import custom components
import {
  ContactInputField,
  ValidateInputField,
} from '../../../../components/shared/Input';
import Button from '../../../../components/shared/Button';
import ForgotPasswordCard from '../../../../components/shared/ForgotPasswordCard';
import StaticContainer from '../../../../containers/StaticContainer';

const ForgotPassword = () => {
  const [optionSelected, setOptionSelected] = React.useState('');

  //hook for react hook forms
  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({
    mode: 'all',
    defaultValues: {
      email: '',
      contact: '',
    },
  });

  const onOptionSelect = option => {
    setOptionSelected(option);
  };

  const onSubmit = data => {
    console.log(data);
    console.log(isValid);
  };

  return (
    <StaticContainer
      customHeaderEnable={true}
      customHeaderName="Forgot Password">
      {/* Screen logo */}
      <View style={styles.logoContainer}>
        <SvgImage width={dimensions.Width} height={dimensions.Height / 3} />
      </View>
      {/* select option view */}
      {!optionSelected && (
        <View style={styles.container}>
          {/* Select option text */}
          <View style={styles.textContainer}>
            <Text style={styles.text}>
              Select which contact details should we use to reset your password
            </Text>
          </View>

          {/* options */}

          <Animatable.View
            animation="pulse"
            easing="ease-out"
            iterationCount={1}
            style={styles.optionsContainer}>
            <ForgotPasswordCard title="Phone" handlePress={onOptionSelect} />
            <ForgotPasswordCard title="Email" handlePress={onOptionSelect} />
          </Animatable.View>
        </View>
      )}

      {/* selected option input */}
      {optionSelected && (
        <View style={styles.container}>
          {/* input field container */}
          <Animatable.View
            animation="pulse"
            easing="ease-out"
            iterationCount={1}
            style={styles.inputContainer}>
            {optionSelected.toLowerCase() === 'email' ? (
              <ValidateInputField
                placeholder="Email"
                type="outlined"
                width="93%"
                title={`Enter your ${optionSelected?.toLowerCase()}`}
                placeholderTextColor={colors.secondary1}
                keyboardType="email-address"
                control={control}
                name="email"
                rules={{
                  required: "Email can't be empty",
                  pattern: {
                    value: emailRegex,
                    message: 'Please enter a valid email',
                  },
                }}
              />
            ) : (
              <ContactInputField
                type="outlined"
                width="86%"
                control={control}
                title={`Enter your ${optionSelected?.toLowerCase()} number`}
                name="contact"
                rules={{
                  required: "Phone number can't be empty",
                  pattern: {
                    value: phoneNumberRegex,
                    message: 'Invalid phone number',
                  },
                }}
              />
            )}
          </Animatable.View>

          <Button
            width="50%"
            type="outlined"
            label="Reselect option"
            onPress={() => {
              setOptionSelected('');
            }}
          />
        </View>
      )}

      {/* Send Code button */}
      {optionSelected && (
        <View style={styles.buttonContainer}>
          <Button
            width="100%"
            type="filled"
            label="Send Verification Code"
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      )}
    </StaticContainer>
  );
};

export default ForgotPassword;

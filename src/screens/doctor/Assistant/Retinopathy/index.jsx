import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import {React, useState} from 'react';
import StaticContainer from '../../../../containers/StaticContainer';
import {useNavigation} from '@react-navigation/native';

import {styles} from './styles';
import dimensions from '../../../../utils/styles/themes/dimensions';
import colors from '../../../../utils/styles/themes/colors';
import fonts from '../../../../utils/styles/themes/fonts';

import Button from '../../../../components/shared/Button';
import {retinopathy} from '../../../../services/doctorServices';

import {ValidateInputField} from '../../../../components/shared/Input';
import PopupAlerts from '../../../../components/shared/PopupAlerts';

import {useForm} from 'react-hook-form';

const RetinopathyScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [alertName, setAlertName] = useState('LoginSuccess');
  const [message, setMessage] = useState('No Retinopathy');

  const navigation = useNavigation();

  const {control, handleSubmit, errors} = useForm({
    mode: 'onChange',
    initialValues: {
      age: '',
      systolicBP: '',
      diastolicBP: '',
      cholestrol: '',
    },
  });

  const numberRegex = /^\d+(\.\d+)?$/;

  //on submit of sign up form
  const onSubmit = async data => {
    setIsLoading(true);
    const response = await retinopathy(data);

    setIsLoading(false);

    console.log(response?.data?.data?.result);

    if (
      response?.data?.data?.result ===
      'The Patient has not been diagonsed with Diabetic Retinopathy'
    ) {
      setAlertName('LoginSuccess');
      setMessage('Retinopathy Traces Not Found');
      setModalVisible(true);
    } else {
      setAlertName('LoginFailure');
      setMessage('Retinopathy Traces Found');
      setModalVisible(true);
    }

    try {
    } catch (error) {}

    // onLogin({email: data?.email, password: data?.password});
  };
  return (
    <StaticContainer customHeaderEnable={true} customHeaderName="Retinopathy">
      <View style={styles.container}>
        <ValidateInputField
          placeholder="Enter Patient's Age"
          placeholderTextColor={colors.secondary1}
          control={control}
          name="age"
          rules={{
            required: {
              value: true,
              message: 'Age is required',
            },
            pattern: {value: numberRegex, message: 'Invalid Number'},
          }}
          containerWidth={dimensions.Width * 0.9}
          fontSize={fonts.size.font14}
          title="Age"
          type="outlined"
          keyboardType="numeric"
        />
        <ValidateInputField
          placeholder="Enter Patient's Systolic BP"
          placeholderTextColor={colors.secondary1}
          control={control}
          name="systolicBP"
          rules={{
            required: {
              value: true,
              message: 'Systolic BP is required',
            },
            pattern: {value: numberRegex, message: 'Invalid Number'},
          }}
          containerWidth={dimensions.Width * 0.9}
          fontSize={fonts.size.font14}
          title="Systolic BP"
          type="outlined"
          keyboardType="numeric"
        />

        <ValidateInputField
          placeholder="Enter Patient's Diastolic BP"
          placeholderTextColor={colors.secondary1}
          control={control}
          name="diastolicBP"
          rules={{
            required: {
              value: true,
              message: 'Diastolic BP is required',
            },
            pattern: {value: numberRegex, message: 'Invalid Number'},
          }}
          containerWidth={dimensions.Width * 0.9}
          fontSize={fonts.size.font14}
          title="Diastolic BP"
          type="outlined"
          keyboardType="numeric"
        />
        <ValidateInputField
          placeholder="Enter Patient's Cholestrol"
          placeholderTextColor={colors.secondary1}
          control={control}
          name="cholestrol"
          rules={{
            required: {
              value: true,
              message: 'Cholestrol is required',
            },
            pattern: {value: numberRegex, message: 'Invalid Number'},
          }}
          containerWidth={dimensions.Width * 0.9}
          fontSize={fonts.size.font14}
          title="Cholestrol"
          type="outlined"
          keyboardType="numeric"
        />
        <Button
          onPress={handleSubmit(onSubmit)}
          label="Fetch Results"
          type="filled"
          width="100%"
          isLoading={isLoading}
        />
      </View>
      <PopupAlerts
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        height={1.8}
        width={1.2}
        timer={2500}
        alertName={alertName}
        message={message}
        redirect={{screen: 'DoctorTabStack'}}></PopupAlerts>
    </StaticContainer>
  );
};

export default RetinopathyScreen;

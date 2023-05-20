import {View, Text} from 'react-native';
import React, {useState} from 'react';

import StaticContainer from '../../../../containers/StaticContainer';
import WarningVector from '../../../../assets/svgs/Warning-vector.svg';
import styles from './styles';
import Reasons from '../../../../utils/constants/RescheduleReasons';
import {useForm} from 'react-hook-form';
import dimensions from '../../../../utils/styles/themes/dimensions';
import {ValidateDropdown} from '../../../../components/shared/Dropdown';
import {ValidateInputField} from '../../../../components/shared/Input';
import Button from '../../../../components/shared/Button';
import {useCustomToast} from '../../../../hooks/useCustomToast';
import {useSelector} from 'react-redux';
import {createAppointmentRequest} from '../../../../services/appointmentServices';
import PopupAlerts from '../../../../components/shared/PopupAlerts';

const CancelAppointment = ({route, navigation}) => {
  const [open, setOpen] = useState();

  const {appointment} = route.params;

  const [loading, setLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [alertName, setAlertName] = useState('LoginSuccess');
  const [message, setMessage] = useState('');
  const {showToast} = useCustomToast();
  const user = useSelector(state => state.auth.user);

  const {control, watch, setValue, handleSubmit} = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      reason: '',
      reasonDetails: '',
      appointment: appointment._id,
      requestType: 'cancel',
      requestedBy: user._id,
    },
  });

  const onSubmit = async data => {
    setLoading(true);
    try {
      const res = await createAppointmentRequest(data);
      console.log(res.data);
      // showToast('Appointment request sent', 'success');
      // navigation.goBack();
      setAlertName('LoginSuccess');
      setMessage('Appointment request sent');
    } catch (err) {
      console.log(err);
      // showToast('Something went wrong', 'danger');
      // navigation.goBack();
      setAlertName('LoginFailed');
      setMessage('Something went wrong');
    } finally {
      setLoading(false);
      setModalVisible(true);
    }
  };

  return (
    <StaticContainer
      customHeaderName={'Cancel Appointment'}
      customHeaderEnable={true}
      isBack={true}>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.vectorContainer}>
            <WarningVector />
            <Text style={styles.warning}>
              Warning: This will affect your average ratings
            </Text>
          </View>
          <View style={styles.reasonContainer}>
            <Text
              style={[styles.title, {marginBottom: dimensions.Height / 80}]}>
              Select a reason
            </Text>
            <View>
              <ValidateDropdown
                control={control}
                name="reason"
                placeholder="Select a reason"
                width={'100%'}
                rules={{
                  required: 'Reason is required',
                }}
                setValue={callback => setValue('reason', callback())}
                items={Reasons}
                open={open}
                setOpen={setOpen}
              />
            </View>
            <View>
              <ValidateInputField
                control={control}
                name="reasonDetails"
                multiline={true}
                placeholder="Enter reason details"
                width={'100%'}
                text={watch('reasonDetails')}
                inputHeight={dimensions.Height / 5}
                type={'outlined'}
                // rules={{
                //   validate: value => {
                //     value.length < 10 && 'Reason details must be 10 characters';
                //   },
                // }}
                isFlexStart={true}
              />
            </View>
          </View>
        </View>
        <Button
          label={'Cancel Appointment'}
          onPress={handleSubmit(onSubmit)}
          style={styles.button}
          type={'filled'}
          isLoading={loading}
        />
        <PopupAlerts
          isModalVisible={isModalVisible}
          setModalVisible={setModalVisible}
          height={1.8}
          width={1.2}
          timer={2000}
          alertName={alertName}
          message={message}
          // redirect={{screen: 'AppointmentScreen'}}
          isReplace={false}
          isBack={true}
        />
      </View>
    </StaticContainer>
  );
};

export default CancelAppointment;

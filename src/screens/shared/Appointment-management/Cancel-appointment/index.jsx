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

const CancelAppointment = ({route, navigation}) => {
  const [open, setOpen] = useState();

  const {appointment} = route.params;

  const [loading, setLoading] = useState(false);
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
      showToast('Appointment request sent', 'success');
      navigation.goBack();
    } catch (err) {
      console.log(err);
      showToast('Something went wrong', 'danger');
    } finally {
      setLoading(false);
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
      </View>
    </StaticContainer>
  );
};

export default CancelAppointment;

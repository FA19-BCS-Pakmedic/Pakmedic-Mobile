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

const CancelAppointment = () => {
  const [open, setOpen] = useState();

  const {control, watch, setValue, handleSubmit} = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      reason: '',
      reasonDetails: '',
    },
  });

  const onSubmit = data => {
    console.log(data);
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
        />
      </View>
    </StaticContainer>
  );
};

export default CancelAppointment;

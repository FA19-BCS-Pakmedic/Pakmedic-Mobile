import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  VirtualizedList,
} from 'react-native';

import ModalContainer from '../../../containers/ModalContainer';

import dimensions from '../../../utils/styles/themes/dimensions';
import colors from '../../../utils/styles/themes/colors';
import fonts from '../../../utils/styles/themes/fonts';

import CheckBoxIcon from '../../../assets/svgs/Checkbox.svg';
import UncheckBoxIcon from '../../../assets/svgs/Checkbox-unchecked.svg';

import {set, useForm} from 'react-hook-form';
import Button from '../../shared/Button';
import {ValidateInputField} from '../../shared/Input';

import RadioGroup from '../../shared/Radio';

import {useEffect} from 'react';

export default MedicineAddModal = props => {
  const {Visible, setModalVisible, navigation, onAdd, medicine, edit} = props;
  const {control, handleSubmit, watch, reset, setValue, clearErrors} = useForm({
    mode: 'onChange',
    defaultValues: {
      name: '',
      dosageForm: '',
      dosageSize: '',
      duration: '',
      addDays: '',
      frequency: 1,
      details: '',
    },
  });

  useEffect(() => {
    if (edit) {
      reset({
        name: medicine?.name,
        dosageForm: medicine?.dosageForm,
        dosageSize: medicine?.dosageSize,
        duration: medicine?.duration,
        addDays: medicine?.addDays,
        details: medicine?.details,
      });
      setFrequency(medicine?.frequency);
    } else {
      reset({
        name: '',
        dosageForm: '',
        dosageSize: '',
        duration: '',
        addDays: '',
        details: '',
      });
      setFrequency(1);
    }
  }, [medicine]);

  const setDosage = dosage => {
    setValue('dosageForm', dosage);
    clearErrors('dosageForm');
  };

  const [isCheck, setIsCheck] = React.useState(false);
  const [frequency, setFrequency] = React.useState(1);
  const [loading, setLoading] = React.useState(false);

  const onSubmit = data => {
    setLoading(true);
    data.frequency = frequency.toString();

    onAdd({
      name: data.name,
      dosage_form: data.dosageForm,
      dosage_frequency: data.frequency,
      dosage_size: data.dosageSize,
      days: data.duration,
      additional_days: data.addDays,
      precautionary_details: data.details,
    });
    setFrequency(1);
    reset();
    setLoading(false);
    setModalVisible(false);
  };

  return (
    <ModalContainer
      isModalVisible={Visible}
      setModalVisible={setModalVisible}
      height={dimensions.Height / 1.44}
      width={dimensions.Width * 0.95}
      backDropOpacity={0.5}
      padding={dimensions.Height / 50}
      bgColor={colors.white}
      back={false}
      borderColor={colors.primary1}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Add Medicine</Text>
        </View>
        <View style={styles.body}>
          <ValidateInputField
            placeholder="Enter Medicine Name"
            placeholderTextColor={colors.secondary1}
            control={control}
            name="name"
            rules={{
              required: {
                value: true,
                message: 'Name is required',
              },
            }}
            text={watch('name')}
            containerWidth={dimensions.Width * 0.85}
            inputHeight={dimensions.Height / 20}
            fontSize={fonts.size.font14}
            title="Name"
            type="outlined"
            watch={watch('name')}
          />
          <View style={styles.radioContainer}>
            <RadioGroup
              control={control}
              name="dosageForm"
              title={'Dosage Form'}
              titleSize={fonts.size.font14}
              iconSize={15}
              textSize={fonts.size.font12}
              borderWidth={0}
              values={[
                {label: 'Tablet', value: 'tablet'},
                {label: 'Capsule', value: 'capsule'},
                {label: 'Syrup', value: 'syrup'},
                {label: 'Syringe', value: 'syringe'},
              ]}
              rules={{
                required: {
                  value: true,
                  message: 'Dosage is required',
                },
              }}
              selected={watch('dosageForm')}
              setSelected={setDosage}
            />
          </View>
          <View style={styles.row}>
            <ValidateInputField
              placeholder="Enter dosage"
              placeholderTextColor={colors.secondary1}
              control={control}
              name="dosageSize"
              rules={{
                required: {
                  value: true,
                  message: 'dosage size is required',
                },
              }}
              text={watch('dosageSize')}
              keyboardType="numeric"
              containerWidth={dimensions.Width * 0.35}
              width="80%"
              inputHeight={dimensions.Height / 20}
              fontSize={fonts.size.font14}
              title="Dosage Size"
              type="outlined"
              watch={watch('dosageSize')}
            />
            <View style={styles.freqContainer}>
              <Text style={styles.freqText}>Dosage Frequency</Text>
              <View style={styles.freqRow}>
                <Button
                  radius={10}
                  label="-"
                  type="filled"
                  color={colors.secondaryMonoChrome100}
                  borderColor={colors.secondaryMonoChrome500}
                  onPress={() => {
                    if (frequency > 1) {
                      setFrequency(frequency - 1);
                    }
                  }}
                  width={dimensions.Width * 0.08}
                  height={dimensions.Height * 0.05}
                  fontSize={fonts.size.font20}
                  i //sDisabled={frequency === 1}
                />
                <Text style={styles.freqInput}>{frequency}</Text>
                <Button
                  radius={10}
                  label="+"
                  type="filled"
                  color={colors.secondaryMonoChrome100}
                  borderColor={colors.secondaryMonoChrome500}
                  onPress={() => {
                    setFrequency(frequency + 1);
                  }}
                  width={dimensions.Width * 0.08}
                  height={dimensions.Height * 0.05}
                  fontSize={fonts.size.font18}
                />
                <Text style={styles.checkText}>Daily</Text>
              </View>
            </View>
          </View>
          <View style={styles.row}>
            <ValidateInputField
              placeholder="Enter no. days"
              placeholderTextColor={colors.secondary1}
              control={control}
              name="duration"
              keyboardType="numeric"
              rules={{
                required: {
                  value: true,
                  message: 'duration is required',
                },
              }}
              text={watch('duration')}
              containerWidth={dimensions.Width * 0.35}
              width="80%"
              inputHeight={dimensions.Height / 20}
              fontSize={fonts.size.font14}
              title="Days"
              type="outlined"
              watch={watch('duration')}
            />
            <ValidateInputField
              placeholder="Enter days"
              placeholderTextColor={colors.secondary1}
              control={control}
              keyboardType="numeric"
              name="addDays"
              containerWidth={dimensions.Width * 0.45}
              width="80%"
              text={watch('addDays')}
              inputHeight={dimensions.Height / 20}
              fontSize={fonts.size.font14}
              title="Additional Days"
              type="outlined"
              watch={watch('addDays')}
            />
          </View>
          <View style={styles.detailContainer}>
            <ValidateInputField
              placeholder="Enter Details"
              placeholderTextColor={colors.secondary1}
              control={control}
              name="details"
              rules={{
                required: {
                  value: true,
                  message: 'detail is required',
                },
              }}
              text={watch('details')}
              containerWidth={dimensions.Width * 0.85}
              //width="80%"
              inputHeight={dimensions.Height / 10}
              multiline
              isFlexStart
              fontSize={fonts.size.font14}
              title="Enter Precautionary Details"
              type="outlined"
              watch={watch('details')}
            />
          </View>
          <View style={styles.ButtonContainer}>
            <Button
              label="Cancel"
              type="outlined"
              width={dimensions.Width / 3.5}
              height={dimensions.Height / 25}
              fontSize={fonts.size.font14}
              onPress={() => {
                reset();
                setFrequency(1);
                setLoading(false);
                setModalVisible(false);
              }}
            />
            <Button
              label={edit ? 'Update' : 'Add'}
              type="filled"
              width={dimensions.Width / 3.5}
              height={dimensions.Height / 25}
              fontSize={fonts.size.font14}
              isLoading={loading}
              isDisabled={loading}
              onPress={handleSubmit(onSubmit)}
            />
          </View>
        </View>
      </View>
    </ModalContainer>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: fonts.size.font18,
    fontWeight: fonts.weight.bold,
  },
  radioContainer: {
    marginTop: -dimensions.Height * 0.01,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -dimensions.Height * 0.01,
  },
  freqContainer: {
    marginTop: dimensions.Height * 0.005,
    width: dimensions.Width * 0.45,
    height: dimensions.Height * 0.1,
    justifyContent: 'space-between',
  },
  freqText: {
    fontSize: fonts.size.font14,
    fontWeight: fonts.weight.bold,
  },
  freqRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: -dimensions.Height * 0.005,
  },
  freqInput: {
    width: dimensions.Width * 0.2,
    height: dimensions.Height * 0.05,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.primary1,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: fonts.size.font14,
  },
  ButtonContainer: {
    marginTop: dimensions.Height * 0.01,
    height: dimensions.Height / 20,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  detailContainer: {
    marginVertical: -dimensions.Height * 0.015,
  },
});

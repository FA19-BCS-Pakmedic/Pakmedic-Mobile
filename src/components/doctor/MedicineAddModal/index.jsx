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

import {useForm} from 'react-hook-form';
import Button from '../../shared/Button';
import {ValidateInputField} from '../../shared/Input';

import RadioGroup from '../../shared/Radio';

export default MedicineAddModal = props => {
  const {Visible, setModalVisible, navigation} = props;
  const {control, handleSubmit, watch, reset, setValue, clearErrors} = useForm({
    mode: 'onChange',
    defaultValues: {
      name: '',
      dosageForm: '',
      dosageSize: '',
      frequency: '',
      duration: '',
      addDays: '',
      details: '',
    },
  });

  const setDosage = dosage => {
    setValue('dosageForm', dosage);
    clearErrors('dosageForm');
  };

  const [isCheck, setIsCheck] = React.useState(false);
  const [frequency, setFrequency] = React.useState(1);

  return (
    <ModalContainer
      isModalVisible={Visible}
      setModalVisible={setModalVisible}
      height={dimensions.Height / 1.35}
      width={dimensions.Width * 0.95}
      backDropOpacity={0.5}
      padding={dimensions.Height / 50}
      bgColor={colors.white}
      //back={false}
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
            containerWidth={dimensions.Width * 0.85}
            inputHeight={dimensions.Height / 20}
            fontSize={fonts.size.font14}
            title="Name"
            type="outlined"
            watch={watch('name')}
          />
          <View style={styles.checkContainer}>
            <TouchableOpacity
              style={styles.check}
              onPress={() => setIsCheck(!isCheck)}>
              {isCheck ? (
                <CheckBoxIcon
                  width={dimensions.Width / 20}
                  height={dimensions.Height / 20}
                />
              ) : (
                <UncheckBoxIcon
                  width={dimensions.Width / 20}
                  height={dimensions.Height / 20}
                />
              )}
            </TouchableOpacity>

            <Text style={styles.checkText}>
              Check to enter medicine manually
            </Text>
          </View>

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
                <TextInput
                  style={styles.freqInput}
                  placeholder="Frequency"
                  placeholderTextColor={colors.secondary1}
                  keyboardType="numeric"
                  value={frequency.toString()}
                  onChangeText={text => setFrequency(text)}
                />
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
              rules={{
                required: {
                  value: true,
                  message: 'duration is required',
                },
              }}
              containerWidth={dimensions.Width * 0.35}
              width="80%"
              inputHeight={dimensions.Height / 20}
              fontSize={fonts.size.font14}
              title="Days"
              type="outlined"
              watch={watch('duration')}
            />
            <ValidateInputField
              placeholder="Enter additional days"
              placeholderTextColor={colors.secondary1}
              control={control}
              name="addDays"
              containerWidth={dimensions.Width * 0.45}
              width="80%"
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
            />
            <Button
              label="Add"
              type="filled"
              width={dimensions.Width / 3.5}
              height={dimensions.Height / 25}
              fontSize={fonts.size.font14}
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
  checkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: dimensions.Height * 0.03,
    marginTop: -dimensions.Height * 0.009,
    marginBottom: dimensions.Height * 0.01,
  },
  check: {
    width: dimensions.Width / 15,
    height: dimensions.Height / 15,
    justifyContent: 'center',
    //alignItems: 'center',
  },
  checkText: {
    fontSize: fonts.size.font12,
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
    fontSize: fonts.size.font12,
  },
  ButtonContainer: {
    height: dimensions.Height / 20,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  detailContainer: {
    marginVertical: -dimensions.Height * 0.015,
  },
});

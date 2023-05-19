import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  VirtualizedList,
} from 'react-native';

import ModalContainer from '../../../../containers/ModalContainer';

import dimensions from '../../../../utils/styles/themes/dimensions';
import colors from '../../../../utils/styles/themes/colors';
import fonts from '../../../../utils/styles/themes/fonts';

import Tablet from '../../../../assets/svgs/tabletIcon.svg';
import Capsule from '../../../../assets/svgs/capsuleIcon.svg';
import Syrup from '../../../../assets/svgs/syrupIcon.svg';
import Syringe from '../../../../assets/svgs/syringeIcon.svg';

import Button from '../../../shared/Button';
import {ValidateInputField} from '../../../shared/Input';
import {useForm} from 'react-hook-form';

export default ReminderAddModal = props => {
  const {Visible, setModalVisible, navigation} = props;
  const {control, handleSubmit, watch, setValue, reset} = useForm({
    mode: 'onChange',
    defaultValues: {
      name: '',
      dosage: '',
      duration: '',
    },
  });
  const [dosage, setDosage] = React.useState('tablet');
  return (
    <ModalContainer
      isModalVisible={Visible}
      setModalVisible={setModalVisible}
      height={dimensions.Height / 1.6}
      width={dimensions.Width * 0.9}
      backDropOpacity={0.5}
      padding={dimensions.Height / 50}
      bgColor={colors.white}
      //back={false}
      borderColor={colors.primary1}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Add Medicine</Text>
          <View style={styles.line} />
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
                message: 'Title is required',
              },
            }}
            containerWidth={dimensions.Width * 0.8}
            inputHeight={dimensions.Height / 20}
            fontSize={fonts.size.font14}
            title="Name"
            type="outlined"
            watch={watch('name')}
          />
          <View style={styles.dosageContainer}>
            <Text style={styles.dosageTitle}>Dosage Form</Text>
            <View style={styles.dosageButtonContainer}>
              <TouchableOpacity
                style={[
                  styles.dosageButton,
                  dosage == 'tablet' && styles.activeButton,
                ]}
                onPress={() => {
                  setDosage('tablet');
                }}>
                <Tablet
                  width={dimensions.Width / 9}
                  height={dimensions.Width / 9}
                />
                <Text style={styles.dosageText}>Tablet</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.dosageButton,
                  dosage === 'syrup' && styles.activeButton,
                ]}
                onPress={() => {
                  setDosage('syrup');
                }}>
                <Syrup
                  width={dimensions.Width / 9}
                  height={dimensions.Width / 9}
                />
                <Text style={styles.dosageText}>Syrup</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.dosageButton,
                  dosage === 'capsule' && styles.activeButton,
                ]}
                onPress={() => {
                  setDosage('capsule');
                }}>
                <Capsule
                  width={dimensions.Width / 9}
                  height={dimensions.Width / 9}
                />
                <Text style={styles.dosageText}>Capsule</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.dosageButton,
                  dosage === 'syringe' && styles.activeButton,
                ]}
                onPress={() => {
                  setDosage('syringe');
                }}>
                <Syringe
                  width={dimensions.Width / 9}
                  height={dimensions.Width / 9}
                />
                <Text style={styles.dosageText}>Syringe</Text>
              </TouchableOpacity>
            </View>
          </View>
          <ValidateInputField
            placeholder="Enter Dosage Amount"
            placeholderTextColor={colors.secondary1}
            control={control}
            name="dosage"
            rules={{
              required: {
                value: true,
                message: 'dosage amount is required',
              },
            }}
            containerWidth={dimensions.Width * 0.8}
            inputHeight={dimensions.Height / 20}
            fontSize={fonts.size.font14}
            title="Dosage Amount"
            type="outlined"
            watch={watch('dosage')}
          />
          <ValidateInputField
            placeholder="Enter Dosage duration"
            placeholderTextColor={colors.secondary1}
            control={control}
            name="duration"
            rules={{
              required: {
                value: true,
                message: 'duration is required',
              },
            }}
            containerWidth={dimensions.Width * 0.8}
            inputHeight={dimensions.Height / 20}
            fontSize={fonts.size.font14}
            title="Duration"
            type="outlined"
            watch={watch('duration')}
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
              setModalVisible(false);
            }}
          />
          <Button
            label="Add"
            type="filled"
            width={dimensions.Width / 3.5}
            height={dimensions.Height / 25}
            fontSize={fonts.size.font14}
            //isLoading={loading}
            //onPress={handleSubmit(onSubmit)}
            //isDisabled={loading || isUploading}
          />
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
    color: colors.secondary1,
    fontWeight: fonts.weight.bold,
  },
  line: {
    height: dimensions.Height * 0.003,
    width: dimensions.Width * 0.9,
    backgroundColor: colors.primary1,
    marginTop: dimensions.Height / 100,
  },
  body: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  dosageContainer: {
    width: dimensions.Width * 0.8,
  },
  dosageButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: dimensions.Height * 0.01,
  },
  dosageButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: colors.primary1,
    borderRadius: 5,
    width: dimensions.Width * 0.17,
    height: dimensions.Width * 0.17,
  },
  activeButton: {
    backgroundColor: colors.primaryMonoChrome300,
  },
  dosageText: {
    fontSize: fonts.size.font10,
    color: colors.accent1,
    fontWeight: fonts.weight.bold,
  },
  dosageTitle: {
    fontSize: fonts.size.font14,
    color: colors.secondary1,
    fontWeight: fonts.weight.bold,
    marginBottom: dimensions.Height / 100,
  },
  ButtonContainer: {
    height: dimensions.Height / 20,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});

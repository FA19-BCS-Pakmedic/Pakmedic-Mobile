import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';

import colors from '../../../utils/styles/themes/colors';
import fonts from '../../../utils/styles/themes/fonts';
import dimensions from '../../../utils/styles/themes/dimensions';

import CheckBoxIcon from '../../../assets/svgs/Checkbox.svg';
import UncheckBoxIcon from '../../../assets/svgs/Checkbox-unchecked.svg';

import ExperienceCard from './Card';
import AddMore from '../../shared/AddMore';
import Button from '../../shared/Button';

import ModalContainer from '../../../containers/ModalContainer';
import {ModalInputField, ValidateInputField} from '../../shared/Input';
import {useForm} from 'react-hook-form';
import Chip from '../../shared/Chip';

import CustomDatePicker from '../../shared/CustomDatePicker';
import {hours, minutes} from '../../../utils/constants/TIME';
import {Dropdown, ValidateDropdown} from '../../shared/Dropdown';
import Cities from '../../../utils/constants/Cities';

const Experiences = () => {
  const [visible, setVisible] = useState(false);

  const [cityOpen, setCityOpen] = useState(false);

  // for date picker
  const [date, setDate] = useState(new Date());

  // for opening and closing date modal
  const [openFromDate, setOpenFromDate] = useState(false);
  const [openToDate, setOpenToDate] = useState(false);

  // useForm hook from react-hook-form
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
      name: '',
      title: '',
      address: '',
      city: '',
      dateFrom: new Date(),
      dateTo: new Date() + 1,
    },
  });

  const onChangeDate = (date, name) => {
    // console.log(date);

    if (date < new Date()) {
      setDate(date);
      if (name === 'dateFrom') setOpenFromDate(true);
      else setOpenToDate(true);
      setValue(name, date);
      clearErrors(name);
      console.log(watch('dateFrom'), watch('dateTo'));
    }
  };

  const openModal = () => {
    return (
      <ModalContainer
        isModalVisible={visible}
        setModalVisible={setVisible}
        width={dimensions.Width / 1.1}
        type="center"
        backDropOpacity={0.5}
        padding={dimensions.Height / 50}
        height={dimensions.Height / 1.45}
        bgColor={'white'}
        borderColor={colors.primary1}>
        <View style={styles.modalContainer}>
          {/* Heading */}
          <View style={styles.headingContainer}>
            <Text style={styles.heading}>Add Experience</Text>
          </View>

          {/* Job title */}
          <View style={styles.infoContainer}>
            <View style={styles.inputContainer}>
              <ModalInputField
                placeholder="Job Title"
                type="outlined"
                width={dimensions.Width / 1.2}
                placeholderTextColor={colors.secondary1}
                control={control}
                name="title"
                rules={{
                  required: 'Please enter a job title',
                }}
                title="Job Title"
              />
            </View>
          </View>

          {/* Hospital/Clinic Information */}
          <View style={styles.infoContainer}>
            <View style={styles.inputContainer}>
              <ModalInputField
                placeholder="Hospital Name"
                type="outlined"
                width={dimensions.Width / 1.2}
                placeholderTextColor={colors.secondary1}
                control={control}
                name="name"
                rules={{
                  required: 'Please enter a name',
                }}
                title="Hospital Name"
              />
            </View>
          </View>

          <View style={[styles.infoContainer]}>
            <View style={styles.inputContainer}>
              <ModalInputField
                placeholder="Street Address"
                type="outlined"
                width={dimensions.Width / 1.2}
                placeholderTextColor={colors.secondary1}
                control={control}
                name="address"
                rules={{required: 'Please enter an appointment fee'}}
                title="Street Address"
              />
            </View>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.text}>City</Text>
            <View style={styles.dropdownContainer}>
              <Dropdown
                open={cityOpen}
                setOpen={setCityOpen}
                items={Cities}
                control={control}
                title="City"
                setValue={callback => {
                  setValue('city', callback());
                }}
                value={watch('city')}
                minHeight={dimensions.Height / 18}
                name="city"
                placeholder="City"
                width={dimensions.Width / 1.2}
                rules={{
                  required: 'Please select a city',
                  validate: value => value !== null || 'Please select a city',
                }}
              />
            </View>
          </View>

          {/* Tenure */}
          <View style={styles.infoContainer}>
            <Text style={styles.text}>Tenure</Text>
            <View style={styles.tenureContainer}>
              <View style={styles.tenureInputContainer}>
                <Text style={styles.text}>From:</Text>
                <CustomDatePicker
                  type="outlined"
                  open={openFromDate}
                  setOpen={setOpenFromDate}
                  onChangeDate={onChangeDate}
                  name="dateFrom"
                  date={date}
                  width={dimensions.Width / 4}
                  height={dimensions.Height / 30}
                  padding={dimensions.Width / 50}
                  maximumDate={new Date()}
                  rules={{
                    required: "Date of birth can't be empty",
                  }}
                  control={control}
                />
              </View>

              <View style={styles.tenureInputContainer}>
                <Text style={styles.text}>To:</Text>
                <CustomDatePicker
                  type="outlined"
                  open={openToDate}
                  setOpen={setOpenToDate}
                  onChangeDate={onChangeDate}
                  name="dateTo"
                  date={date}
                  width={dimensions.Width / 4}
                  height={dimensions.Height / 30}
                  padding={dimensions.Width / 50}
                  maximumDate={new Date()}
                  rules={{
                    required: "Date of birth can't be empty",
                  }}
                  control={control}
                  title={'Date of birth'}
                />
              </View>
            </View>
          </View>

          <View style={styles.controls}>
            <Button
              type="outlined"
              label="Cancel"
              onPress={() => {}}
              width={dimensions.Width / 2.6}
            />
            <Button
              type="filled"
              label="Save"
              onPress={() => {}}
              width={dimensions.Width / 2.6}
            />
          </View>
        </View>
      </ModalContainer>
    );
  };

  return (
    <View style={styles.container}>
      {openModal()}

      {/* Add Services Button */}
      <View style={styles.btnContainer}>
        <AddMore
          type={'outlined'}
          label={'Add More'}
          borderColor={colors.primary1}
          onPress={() => {
            setVisible(prevState => {
              return !prevState;
            });
          }}
        />
      </View>

      <ScrollView style={styles.contentContainer}>
        {/* Experiences */}
        <View>
          <ExperienceCard />
          <ExperienceCard />
          <ExperienceCard />
          <ExperienceCard />
          <ExperienceCard />
        </View>
      </ScrollView>
    </View>
  );
};

export default Experiences;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight: dimensions.Height / 1.8,
  },

  contentContainer: {
    width: '100%',
    paddingBottom: dimensions.Height / 10,
    paddingTop: dimensions.Height / 40,
  },

  btnContainer: {
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },

  modalContainer: {
    width: '100%',
    paddingVertical: dimensions.Height / 50,
    paddingHorizontal: dimensions.Width / 50,
  },

  infoContainer: {
    width: '100%',
    marginVertical: dimensions.Height / 250,
  },

  headingContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: dimensions.Height / 50,
  },

  heading: {
    fontSize: fonts.size.font24,
    fontWeight: fonts.weight.bold,
  },

  inputContainer: {
    width: '100%',
  },
  dropdownContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  checkboxContainer: {
    marginTop: dimensions.Height / 500,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  checkboxText: {
    fontSize: fonts.size.font14,
    fontWeight: fonts.weight.regular,
    color: colors.primary1,
    marginLeft: dimensions.Width / 80,
  },

  text: {
    fontSize: fonts.size.font14,
    fontWeight: fonts.weight.semi,
  },

  chipContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },

  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  timeLabel: {
    fontSize: fonts.size.font14,
    fontWeight: fonts.weight.semi,
    width: dimensions.Width / 8,
  },

  controls: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  tenureContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: dimensions.Height / 100,
  },

  tenureInputContainer: {
    width: '50%',
    flexDirection: 'row',
    paddingHorizontal: dimensions.Width / 50,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

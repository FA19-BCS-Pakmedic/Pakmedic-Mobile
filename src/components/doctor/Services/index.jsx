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

import ServiceCard from './Card';
import AddMore from '../../shared/AddMore';
import Button from '../../shared/Button';

import ModalContainer from '../../../containers/ModalContainer';
import {ModalInputField, ValidateInputField} from '../../shared/Input';
import {useForm} from 'react-hook-form';
import Chip from '../../shared/Chip';

import {hours, minutes} from '../../../utils/constants/TIME';
import {Dropdown, ValidateDropdown} from '../../shared/Dropdown';
import Cities from '../../../utils/constants/Cities';

const Services = () => {
  const [visible, setVisible] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const [selectedDays, setSelectedDays] = useState([]);

  const [dayChips, setDayChips] = useState([
    {value: 'Mon', isSelected: false},
    {value: 'Tue', isSelected: false},
    {value: 'Wed', isSelected: false},
    {value: 'Thu', isSelected: false},
    {value: 'Fri', isSelected: false},
    {value: 'Sat', isSelected: false},
    {value: 'Sun', isSelected: false},
  ]);

  const [dropdownFromHourOpen, setDropDownFromHourOpen] = useState(false);
  const [dropdownFromMinOpen, setDropDownFromMinOpen] = useState(false);
  const [dropdownToHourOpen, setDropDownToHourOpen] = useState(false);
  const [dropdownToMinOpen, setDropDownToMinOpen] = useState(false);
  const [cityOpen, setCityOpen] = useState(false);

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
      appointmentFee: '',
      availabilityDays: [],
      availabilityTimeFromHour: '',
      availabilityTimeFromMin: '',
      availabilityTimeToHour: '',
      availabilityTimeToMin: '',
      address: '',
      city: '',
      zip: '',
    },
  });

  const onChipPress = index => {
    // console.log(index);
    // let temp = dayChips;
    // temp[index].isSelected = !temp[index].isSelected;
    setDayChips(prevState => {
      let temp = prevState;
      temp[index].isSelected = !temp[index].isSelected;
      return temp;
    });
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
        height={dimensions.Height / 1.12}
        bgColor={'white'}
        borderColor={colors.primary1}>
        <View style={styles.modalContainer}>
          {/* Heading */}
          <View style={styles.headingContainer}>
            <Text style={styles.heading}>Add Service</Text>
          </View>

          {/* Hospital/Clinic Information */}
          <View style={styles.infoContainer}>
            <View style={styles.inputContainer}>
              <ModalInputField
                placeholder="Hospital/Clinic Name"
                type="outlined"
                width={dimensions.Width / 1.2}
                placeholderTextColor={colors.secondary1}
                control={control}
                name="name"
                isDisabled={isOnline}
                rules={
                  !isOnline && {
                    required: 'Please enter a name',
                  }
                }
                title="Hospital/Clinic Name"
              />
              <View style={styles.checkboxContainer}>
                <TouchableOpacity onPress={() => setIsOnline(!isOnline)}>
                  {isOnline ? (
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
                <Text style={styles.checkboxText}>
                  Is this an online consultation?
                </Text>
              </View>
            </View>
          </View>

          {/* Appointment section */}
          <View style={styles.infoContainer}>
            <View style={styles.inputContainer}>
              <ModalInputField
                placeholder="Appointment Fee"
                type="outlined"
                width={dimensions.Width / 1.2}
                placeholderTextColor={colors.secondary1}
                control={control}
                name="appointmentFee"
                rules={{required: 'Please enter an appointment fee'}}
                title="Appointment Fee"
              />
            </View>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.text}>Availability Days</Text>
            <View style={styles.chipContainer}>
              {/* Day Chips */}
              {dayChips.map((item, index) => {
                return (
                  <Chip
                    value={item.value}
                    key={index}
                    index={index}
                    onPress={onChipPress}
                    color={colors.white}
                    background={
                      item.isSelected ? colors.secondary1 : colors.primary1
                    }
                  />
                );
              })}
            </View>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.text}>Availability Time</Text>
            <View style={styles.timeContainer}>
              <Text style={styles.timeLabel}>From: </Text>
              <Dropdown
                width={'40%'}
                open={dropdownFromHourOpen}
                setOpen={setDropDownFromHourOpen}
                items={hours}
                minHeight={dimensions.Height / 30}
                placeholder="HH"
                setValue={callback => {
                  console.log(callback());

                  setValue('availabilityTimeFromHour', callback());
                }}
                value={watch('availabilityTimeFromHour')}
              />
              <Dropdown
                width={'40%'}
                open={dropdownFromMinOpen}
                setOpen={setDropDownFromMinOpen}
                minHeight={dimensions.Height / 30}
                items={minutes}
                placeholder="MM"
                setValue={callback => {
                  console.log(callback());
                  setValue('availabilityTimeFromMin', callback());
                }}
                value={watch('availabilityTimeFromMin')}
              />
            </View>

            <View style={styles.timeContainer}>
              <Text style={styles.timeLabel}>To: </Text>
              <Dropdown
                width={'40%'}
                open={dropdownToHourOpen}
                setOpen={setDropDownToHourOpen}
                items={hours}
                placeholder="HH"
                minHeight={dimensions.Height / 30}
                setValue={callback => {
                  console.log(callback());

                  setValue('availabilityTimeToHour', callback());
                }}
                value={watch('availabilityTimeToHour')}
              />
              <Dropdown
                width={'40%'}
                open={dropdownToMinOpen}
                setOpen={setDropDownToMinOpen}
                items={minutes}
                minHeight={dimensions.Height / 30}
                placeholder="MM"
                setValue={callback => {
                  console.log(callback());
                  setValue('availabilityTimeToMin', callback());
                }}
                value={watch('availabilityTimeToMin')}
              />
            </View>
          </View>

          {!isOnline ? (
            <>
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
                    isDisabled={isOnline}
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
                      validate: value =>
                        value !== null || 'Please select a city',
                    }}
                  />
                </View>
              </View>
            </>
          ) : null}
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
        {/* Services */}
        <View style={styles.serviceContainer}>
          <ServiceCard />
          <ServiceCard />
          <ServiceCard />
          <ServiceCard />
          <ServiceCard />
        </View>
      </ScrollView>
    </View>
  );
};

export default Services;

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
});

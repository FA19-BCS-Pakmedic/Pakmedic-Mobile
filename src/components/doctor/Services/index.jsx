import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';

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
import {STATES} from '../../../utils/constants/States';

import {useCustomToast} from '../../../hooks/useCustomToast';

import {
  addService,
  deleteService,
  getServiceById,
  getServices,
  updateService,
} from '../../../services/doctorServices';
import {DAYS} from '../../../utils/constants/Days';
import NotFound from '../../shared/NotFound';

const initialState = {
  name: '',
  appointmentFee: '',
  availabilityDays: [],
  availabilityTimeFromHour: '',
  availabilityTimeFromMin: '',
  availabilityTimeToHour: '',
  availabilityTimeToMin: '',
  address: '',
  city: '',
  state: '',
  isOnline: false,
};

const Services = ({services, setStoredUser}) => {
  const [visible, setVisible] = useState(false);
  // const [isOnline, setIsOnline] = useState(false);
  const [selectedDays, setSelectedDays] = useState([]);

  // console.log('here', doctorID);

  // const [services, setServices] = useState([]);

  const [loading, setLoading] = useState(false);

  const [dayChips, setDayChips] = useState(DAYS);

  const [isEdit, setIsEdit] = useState(false);

  const {showToast} = useCustomToast();

  const [dropdownFromHourOpen, setDropDownFromHourOpen] = useState(false);
  const [dropdownFromMinOpen, setDropDownFromMinOpen] = useState(false);
  const [dropdownToHourOpen, setDropDownToHourOpen] = useState(false);
  const [dropdownToMinOpen, setDropDownToMinOpen] = useState(false);
  const [isTimeFromValid, setIsTimeFromValid] = useState(true);
  const [isTimeToValid, setIsTimeToValid] = useState(true);
  const [isDaysValid, setIsDaysValid] = useState(true);
  const [cityOpen, setCityOpen] = useState(false);
  const [stateOpen, setStateOpen] = useState(false);

  const [selectedService, setSelectedService] = useState(null);

  // useForm hook from react-hook-form
  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
    setValue,
    clearErrors,
    reset,
    watch,
  } = useForm({
    mode: 'all',
    revalidate: 'all',
    defaultValues: {
      ...initialState,
    },
  });

  const onChipPress = index => {
    setDayChips(prevState => {
      return prevState.map(state => {
        if (state.value === dayChips[index].value) {
          return {
            ...state,
            isSelected: !state.isSelected,
          };
        } else {
          return state;
        }
      });
    });
  };

  useEffect(() => {
    setValue('availabilityDays', getSelectedDays(selectedDays));
    setIsDaysValid(true);
  }, [dayChips]);

  const getSelectedDays = () => {
    let selectedDays = [];
    dayChips.forEach(item => {
      if (item.isSelected) {
        selectedDays.push(item.value);
      }
    });
    return selectedDays;
  };

  const validateTime = () => {
    setIsTimeFromValid(
      !watch('availabilityTimeFromHour').length > 0 ||
        !watch('availabilityTimeFromMin').length > 0
        ? false
        : true,
    );

    setIsTimeToValid(
      !watch('availabilityTimeToHour') || !watch('availabilityTimeToMin')
        ? false
        : true,
    );

    return (
      watch('availabilityTimeFromHour').length > 0 &&
      watch('availabilityTimeFromMin').length > 0 &&
      watch('availabilityTimeToHour').length > 0 &&
      watch('availabilityTimeToMin').length > 0
    );
  };

  useEffect(() => {
    if (selectedService) {
      setValue('name', selectedService?.hospital?.name);
      setValue('address', selectedService?.hospital?.address?.address);
      setValue('city', selectedService?.hospital?.address?.city);
      setValue('state', selectedService?.hospital?.address?.state);
      setValue('appointmentFee', selectedService.fee.toString());
      setDayChips(prevState => {
        return prevState.map(state => {
          if (selectedService.days.includes(state.value)) {
            return {
              ...state,
              isSelected: true,
            };
          } else {
            return state;
          }
        });
      });
      setValue(
        'availabilityTimeFromHour',
        selectedService.availFrom.split(':')[0],
      );
      setValue(
        'availabilityTimeFromMin',
        selectedService.availFrom.split(':')[1],
      );
      setValue('availabilityTimeToHour', selectedService.availTo.split(':')[0]);
      setValue('availabilityTimeToMin', selectedService.availTo.split(':')[1]);
      setValue('isOnline', selectedService.isOnline);
    }
  }, [selectedService]);

  const onPressEdit = async id => {
    try {
      const response = await getServiceById(id);

      setSelectedService(response.data.data.service);

      setIsEdit(true);
      setVisible(true);
    } catch (err) {
      console.log(err);
    }
  };

  const validateDays = () => {
    setIsDaysValid(watch('availabilityDays').length > 0);
    return watch('availabilityDays').length > 0;
  };

  const onDeletePress = async id => {
    let response;
    try {
      response = await deleteService(id);

      console.log(response.data.data.user);

      showToast('Service deleted successfully', 'success');
      console.log(response);
    } catch (err) {
      console.log(err);
      showToast('Error deleting service', 'danger');
    } finally {
      setStoredUser(response.data.data.user);
    }
  };

  const onSubmit = async values => {
    console.log(validateDays(), validateTime());

    if ((validateTime() && validateDays()) || watch('isOnline')) {
      const data = {
        name: values.name,
        fee: values.appointmentFee,
        days: values.availabilityDays,
        availFrom: `${values.availabilityTimeFromHour}:${values.availabilityTimeFromMin}`,
        availTo: `${values.availabilityTimeToHour}:${values.availabilityTimeToMin}`,
        address: values.address,
        city: values.city,
        state: values.state,
        isOnline: values.isOnline,
      };

      setLoading(true);

      let response;
      try {
        if (!isEdit) {
          response = await addService(data);
        } else {
          response = await updateService(selectedService._id, data);
        }

        console.log(response.data.data);

        showToast('Service added successfully', 'success');
      } catch (err) {
        console.log(err);
        showToast('Error adding service', 'danger');
      } finally {
        setStoredUser(response.data.data.user);
        resetForm();
      }
    }
  };

  const resetForm = () => {
    reset();
    setVisible(false);
    setLoading(false);
    setIsEdit(false);
    setDayChips(prevState => {
      return prevState.map(state => {
        return {
          ...state,
          isSelected: false,
        };
      });
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
        height={dimensions.Height / (!watch('isOnline') ? 1.13 : 1.3)}
        bgColor={'white'}
        borderColor={colors.primary1}>
        <ScrollView
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={true}>
          <View style={styles.modalContainer}>
            {/* Heading */}
            <View style={styles.headingContainer}>
              <Text style={styles.heading}>Add Service</Text>
            </View>

            {/* Hospital/Clinic Information */}
            <View style={styles.infoContainer}>
              <View style={styles.inputContainer}>
                <ValidateInputField
                  text={watch('name')}
                  placeholder="Hospital/Clinic Name"
                  type="outlined"
                  width="93%"
                  isErrorBoundary={false}
                  placeholderTextColor={colors.secondary1}
                  control={control}
                  name="name"
                  isDisabled={watch('isOnline')}
                  rules={{
                    required: {
                      value: !watch('isOnline'),
                      message: 'Hospital/Clinic name is required',
                    },
                  }}
                  title="Hospital/Clinic Name"
                />
                <View style={styles.checkboxContainer}>
                  <TouchableOpacity
                    onPress={() => setValue('isOnline', !watch('isOnline'))}>
                    {watch('isOnline') ? (
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
                <ValidateInputField
                  text={watch('appointmentFee')}
                  placeholder="Appointment Fee"
                  type="outlined"
                  width="93%"
                  isErrorBoundary={false}
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
                      value={item.label}
                      key={index}
                      index={index}
                      onPress={onChipPress}
                      color={colors.white}
                      background={
                        item.isSelected ? colors.secondary1 : colors.primary1
                      }
                      error={!isDaysValid}
                    />
                  );
                })}
              </View>
              {isDaysValid ? null : (
                <Text style={styles.errorText}>
                  Please select at least one day
                </Text>
              )}
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
                  error={!isTimeFromValid}
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
                  error={!isTimeFromValid}
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
                  error={!isTimeToValid}
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
                  error={!isTimeToValid}
                />
              </View>
              {isTimeFromValid && isTimeToValid ? null : (
                <Text style={styles.errorText}>
                  Please enter a valid time range
                </Text>
              )}
            </View>

            {!watch('isOnline') ? (
              <>
                <View style={styles.infoContainer}>
                  <Text style={styles.text}>City</Text>
                  <View style={styles.dropdownContainer}>
                    <ValidateDropdown
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
                      width="100%"
                      isErrorBoundary={false}
                      rules={{
                        required: 'Please select a city',
                        validate: value =>
                          value !== null || 'Please select a city',
                      }}
                    />
                  </View>
                </View>

                <View style={styles.infoContainer}>
                  <Text style={styles.text}>State</Text>
                  <View style={styles.dropdownContainer}>
                    <ValidateDropdown
                      open={stateOpen}
                      setOpen={setStateOpen}
                      items={STATES}
                      control={control}
                      title="State"
                      setValue={callback => {
                        setValue('state', callback());
                      }}
                      value={watch('state')}
                      minHeight={dimensions.Height / 18}
                      name="state"
                      placeholder="State"
                      width="100%"
                      isErrorBoundary={false}
                      rules={{
                        required: 'Please select a state',
                        validate: value =>
                          value !== null || 'Please select a state',
                      }}
                    />
                  </View>
                </View>

                <View style={[styles.infoContainer]}>
                  <View style={styles.inputContainer}>
                    <ValidateInputField
                      text={watch('address')}
                      placeholder="Street Address"
                      type="outlined"
                      placeholderTextColor={colors.secondary1}
                      control={control}
                      width="93%"
                      isErrorBoundary={false}
                      name="address"
                      rules={{required: 'Please enter an appointment fee'}}
                      title="Street Address"
                      isDisabled={watch('isOnline')}
                    />
                  </View>
                </View>
              </>
            ) : null}
            <View style={styles.controls}>
              <Button
                type="outlined"
                label="Cancel"
                onPress={() => {
                  setVisible(false);
                }}
                width={dimensions.Width / 2.6}
              />
              <Button
                type="filled"
                label="Save"
                onPress={handleSubmit(onSubmit)}
                isLoading={loading}
                width={dimensions.Width / 2.6}
              />
            </View>
          </View>
        </ScrollView>
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
          {services.length > 0 ?
            services.map((service, index) => {
              return (
                <ServiceCard
                  service={service}
                  key={index}
                  onEdit={onPressEdit}
                  onDelete={onDeletePress}
                />
              );
            }) : (
              <NotFound
                  title="No services"
                  text='No services are added yet'
                />
            )}
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
    paddingTop: dimensions.Height / 40,
  },

  btnContainer: {
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },

  scrollContainer: {
    width: '100%',
  },

  modalContainer: {
    width: '100%',
    paddingVertical: dimensions.Height / 50,
    paddingHorizontal: dimensions.Width / 30,
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

  errorText: {
    fontSize: fonts.size.font14,
    fontWeight: fonts.weight.regular,
    color: colors.invalid,
  },

  text: {
    fontSize: fonts.size.font16,
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

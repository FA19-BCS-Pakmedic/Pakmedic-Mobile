import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import colors from '../../../utils/styles/themes/colors';
import fonts from '../../../utils/styles/themes/fonts';
import dimensions from '../../../utils/styles/themes/dimensions';

import CheckBoxIcon from '../../../assets/svgs/Checkbox.svg';
import UncheckBoxIcon from '../../../assets/svgs/Checkbox-unchecked.svg';

import ExperienceCard from './Card';
import AddMore from '../../shared/AddMore';
import Button from '../../shared/Button';

import ModalContainer from '../../../containers/ModalContainer';
import {ValidateInputField} from '../../shared/Input';
import {useForm} from 'react-hook-form';
import Chip from '../../shared/Chip';

import CustomDatePicker from '../../shared/CustomDatePicker';
import {hours, minutes} from '../../../utils/constants/TIME';
import {Dropdown, ValidateDropdown} from '../../shared/Dropdown';
import Cities from '../../../utils/constants/Cities';
import {
  addExperience,
  deleteExperience,
  getExperienceByID,
  updateExperience,
} from '../../../services/doctorServices';

const Experiences = ({setStoredUser, experiences}) => {
  const [visible, setVisible] = useState(false);

  const [cityOpen, setCityOpen] = useState(false);

  // for opening and closing date modal
  const [openFromDate, setOpenFromDate] = useState(false);
  const [openToDate, setOpenToDate] = useState(false);

  const [isEdit, setIsEdit] = useState(false);

  const [selectedExperience, setSelectedExperience] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  // useForm hook from react-hook-form
  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
    setValue,
    clearErrors,
    watch,
    reset,
  } = useForm({
    mode: 'all',
    revalidate: 'all',
    defaultValues: {
      name: '',
      title: '',
      address: '',
      city: '',
      from: new Date(),
      to: new Date(),
    },
  });

  console.log(experiences);

  const onChangeDate = (date, name) => {
    // console.log(date);

    if (date < new Date()) {
      if (name === 'from') setOpenFromDate(false);
      else setOpenToDate(false);
      setValue(name, date);
      clearErrors(name);
      console.log(watch('from'), watch('to'));
    }
  };

  useEffect(() => {
    if (selectedExperience) {
      setValue('name', selectedExperience.hospital.name);
      setValue('title', selectedExperience.title);
      setValue('address', selectedExperience.hospital.address.address);
      setValue('city', selectedExperience.hospital.address.city);
      setValue('from', new Date(selectedExperience.from));
      setValue('to', new Date(selectedExperience.to));

      setVisible(true);
      setIsEdit(true);

      console.log(selectedExperience);
    }
  }, [selectedExperience]);

  const onPressDelete = async id => {
    if (id) {
      let response;
      try {
        response = await deleteExperience(id);
      } catch (err) {
        console.log(err);
      } finally {
        response && setStoredUser(response.data.data.user);
      }
    }
  };

  const onPressEdit = async id => {
    if (id) {
      let response;
      try {
        response = await getExperienceByID(id);
      } catch (err) {
        console.log(err);
      } finally {
        response && setSelectedExperience(response.data.data.experience);
      }
    }
  };

  const onSubmit = async values => {
    console.log(values);
    let response;
    setIsLoading(true);

    try {
      response = await (isEdit && selectedExperience
        ? updateExperience(selectedExperience._id, values)
        : addExperience(values));
    } catch (err) {
      console.log(err);
    } finally {
      reset();
      response && setStoredUser(response.data.data.user);
      setIsLoading(false);
      setVisible(false);
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
        height={dimensions.Height / 1.35}
        bgColor={'white'}
        borderColor={colors.primary1}>
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.modalContainer}>
            <View style={styles.formContainer}>
              {/* Heading */}
              <View style={styles.headingContainer}>
                <Text style={styles.heading}>Add Experience</Text>
              </View>

              {/* Job title */}
              <View style={styles.infoContainer}>
                <View style={styles.inputContainer}>
                  <ValidateInputField
                    isErrorBoundary={false}
                    width="93%"
                    text={watch('title')}
                    placeholder="Job Title"
                    type="outlined"
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
                  <ValidateInputField
                    isErrorBoundary={false}
                    width="93%"
                    text={watch('name')}
                    placeholder="Hospital Name"
                    type="outlined"
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
                  <ValidateInputField
                    isErrorBoundary={false}
                    width="93%"
                    text={watch('address')}
                    placeholder="Street Address"
                    type="outlined"
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

              {/* Tenure */}
              <View style={styles.infoContainer}>
                <Text style={styles.text}>Tenure</Text>
                <View style={styles.tenureContainer}>
                  <View style={styles.tenureInputContainer}>
                    <Text style={styles.subText}>From:</Text>
                    <CustomDatePicker
                      type="outlined"
                      open={openFromDate}
                      setOpen={setOpenFromDate}
                      onChangeDate={onChangeDate}
                      name="from"
                      date={watch('from')}
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
                    <Text style={styles.subText}>To:</Text>
                    <CustomDatePicker
                      type="outlined"
                      open={openToDate}
                      setOpen={setOpenToDate}
                      onChangeDate={onChangeDate}
                      name="to"
                      date={watch('to')}
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
                isLoading={isLoading}
                onPress={() => {
                  handleSubmit(onSubmit)();
                }}
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
        {/* Experiences */}
        <View>
          {experiences.length > 0
            ? experiences.map((experience, index) => {
                return (
                  <ExperienceCard
                    key={index}
                    experience={experience}
                    index={index}
                    onEdit={onPressEdit}
                    onDelete={onPressDelete}
                  />
                );
              })
            : null}
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
    justifyContent: 'space-between',
    paddingHorizontal: dimensions.Width / 30,
  },

  scrollContainer: {
    width: '100%',
  },

  formContainer: {
    width: '100%',
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
    fontSize: fonts.size.font16,
    fontWeight: fonts.weight.semi,
  },
  subText: {
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

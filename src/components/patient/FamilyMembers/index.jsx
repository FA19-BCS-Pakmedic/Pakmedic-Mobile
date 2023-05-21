import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import React, {useState} from 'react';

import StaticContainer from '../../../containers/StaticContainer';
import FamilyMemberCard from './Card';
import dimensions from '../../../utils/styles/themes/dimensions';
import fonts from '../../../utils/styles/themes/fonts';
import ConfirmationAlert from '../../shared/ConfirmationAlert';
import {useForm} from 'react-hook-form';
import ModalContainer from '../../../containers/ModalContainer';
import colors from '../../../utils/styles/themes/colors';
import {ValidateInputField} from '../../shared/Input';
import AddMore from '../../shared/AddMore';
import Button from '../../shared/Button';
import {ValidateDropdown} from '../../shared/Dropdown';
import {BLOODGROUPS} from '../../../utils/constants/BloodGroups';
import IconTab from '../../shared/IconTab';
import SonIcon from '../../../assets/images/Son-icon.png';
import DaughterIcon from '../../../assets/images/daughter-icon.png';
import {
  addFamilyMember,
  deleteFamilyMember,
  updateFamilyMember,
} from '../../../services/patientServices';
import {useCustomToast} from '../../../hooks/useCustomToast';
import NotFound from '../../shared/NotFound';

const FamilyMembers = ({familyMembers, updateUser}) => {
  const [selectedMember, setSelectedMember] = useState(null);
  const [openOptions, setOpenOptions] = useState(false);
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [bloodDropOpen, setBloodDropOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isBtnLoading, setIsnBtnLoading] = useState(false);

  const {showToast} = useCustomToast();

  const {control, handleSubmit, watch, reset, setValue} = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      name: '',
      relation: '',
      age: '',
      weight: '',
      height: '',
      bloodGroup: '',
    },
  });

  console.log(familyMembers);

  const [relations, setRelations] = useState([
    {icon: SonIcon, value: 'Son', isActive: false},
    {icon: DaughterIcon, value: 'Daughter', isActive: false},
  ]);

  const onSubmit = async data => {
    console.log(data);
    setIsnBtnLoading(true);
    try {
      if (!isEdit) await addFamilyMember(data);
      else await updateFamilyMember(selectedMember._id, data);
      showToast('Family member added successfully', 'success');
      updateUser();
    } catch (err) {
      console.log(err);
      showToast('Error adding family member', 'danger');
    } finally {
      setIsnBtnLoading(false);
      setVisible(false);
      setIsEdit(false);
      reset();
    }
  };

  const onPressEdit = () => {
    console.log('pressed Edit', selectedMember);
    setIsEdit(true);
    setValue('name', selectedMember.name);
    setValue('relation', selectedMember.relation);
    setRelations(prevState => {
      return prevState.map(relation => {
        if (relation.value === selectedMember.relation) {
          relation.isActive = true;
        } else {
          relation.isActive = false;
        }
        return relation;
      });
    });
    setValue('age', selectedMember.age);
    setValue('weight', selectedMember.bio.weight);
    setValue('height', selectedMember.bio.height);
    setValue('bloodGroup', selectedMember.bio.bloodGroup);
    setVisible(true);

    console.log(watch('weight'), watch('height'));
  };

  const onPressDelete = async () => {
    await deleteFamilyMember(selectedMember._id);
    updateUser();
  };

  const onSelectRelation = value => {
    setRelations(prevState => {
      return prevState.map(relation => {
        if (relation.value === value) {
          relation.isActive = true;
          setValue('relation', relation.value);
        } else {
          relation.isActive = false;
        }
        return relation;
      });
    });
  };

  const openConfirmationalModal = () => {
    return (
      <ConfirmationAlert
        alertText={'Are you sure you want to remove this family member?'}
        cancelControl={{
          width: dimensions.Width / 3,
          onPress: () => {
            setConfirmationVisible(false);
          },
        }}
        confirmControl={{
          width: dimensions.Width / 3,
          onPress: onPressDelete,
        }}
        height={dimensions.Height / 5}
        width={dimensions.Width / 1.2}
        isModalVisible={confirmationVisible}
        setModalVisible={setConfirmationVisible}
        type="center"
      />
    );
  };

  const openOptionsModal = () => {
    return (
      <>
        <ModalContainer
          isModalVisible={openOptions}
          setModalVisible={setOpenOptions}
          width={dimensions.Width}
          type="bottom"
          backDropOpacity={0.3}
          padding={dimensions.Height / 50}
          height={dimensions.Height / 2.8}
          bgColor={'white'}
          borderColor={colors.primary1}>
          <View style={styles.bottomModalContainer}>
            <View style={styles.headingContainer}>
              <Text style={styles.heading}>Family member's options</Text>
            </View>

            <View style={styles.optionContainer}>
              <TouchableHighlight
                underlayColor="#f4f4f4"
                activeOpacity={1}
                style={styles.option}
                onPress={() => {
                  onPressEdit();
                  setOpenOptions(false);
                }}>
                <Text style={styles.optionText}>Edit</Text>
              </TouchableHighlight>
            </View>

            <View style={styles.optionContainer}>
              <TouchableHighlight
                underlayColor="#f4f4f4"
                activeOpacity={1}
                style={styles.option}
                onPress={() => {
                  setConfirmationVisible(true);
                  setOpenOptions(false);
                }}>
                <Text style={styles.optionText}>Delete</Text>
              </TouchableHighlight>
            </View>
          </View>
        </ModalContainer>
      </>
    );
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
        height={dimensions.Height / 1.1}
        bgColor={'white'}
        borderColor={colors.primary1}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Family Member</Text>
          <View style={styles.inputContainer}>
            <ValidateInputField
              control={control}
              name="name"
              placeholder="Enter name"
              rules={{
                required: 'name is required',
              }}
              type="outlined"
              width="100%"
              height={dimensions.Height / 20}
              title={'Name'}
              text={watch('name')}
            />
          </View>
          <View style={styles.inputContainer}>
            <ValidateInputField
              control={control}
              name="age"
              placeholder="Enter age"
              rules={{
                required: 'age is required',
              }}
              type="outlined"
              width="100%"
              keyboardType={'numeric'}
              height={dimensions.Height / 20}
              title={'Age'}
              text={watch('age')}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.text}>Blood Group</Text>
            <ValidateDropdown
              control={control}
              name="bloodGroup"
              items={BLOODGROUPS}
              placeholder="Select blood group"
              rules={{
                required: 'blood group is required',
              }}
              type="outlined"
              width="100%"
              open={bloodDropOpen}
              setOpen={setBloodDropOpen}
              setValue={callback => {
                setValue('bloodGroup', callback());
              }}
            />
          </View>

          <View style={styles.inputContainer}>
            {/* <ValidateInputField
              control={control}
              name="height"
              placeholder="Enter height in cm"
              rules={{
                required: 'height is required',
              }}
              type="outlined"
              width="100%"
              keyboardType={'numeric'}
              height={dimensions.Height / 20}
              title={'Height'}
              text={watch('height')}
            /> */}
            <ValidateInputField
              control={control}
              name="height"
              placeholder="Enter height"
              rules={{
                required: 'height is required',
              }}
              type="outlined"
              width="100%"
              keyboardType={'numeric'}
              height={dimensions.Height / 20}
              title={'Height'}
              text={watch('height').toString()}
            />
          </View>

          <View style={styles.inputContainer}>
            {/* <ValidateInputField
              control={control}
              name="weight"
              placeholder="Enter weight in kg"
              rules={{
                required: 'weight is required',
              }}
              keyboardType={'numeric'}
              type="outlined"
              width="100%"
              height={dimensions.Height / 20}
              title={'Weight'}
              text={watch('weight')}
            /> */}
            <ValidateInputField
              control={control}
              name="weight"
              placeholder="Enter weight"
              rules={{
                required: 'weight is required',
              }}
              type="outlined"
              width="100%"
              keyboardType={'numeric'}
              height={dimensions.Height / 20} 
              title={'Weight'}
              text={watch('weight').toString()}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.text}>Choose Relation</Text>
            <View style={styles.iconTabsContainer}>
              {relations.map((relation, index) => {
                return (
                  <View style={styles.iconTab} key={index}>
                    <IconTab
                      icon={relation.icon}
                      value={relation.value}
                      isActive={relation.isActive}
                      onSelect={onSelectRelation}
                    />
                  </View>
                );
              })}
            </View>
          </View>

          <View style={styles.controls}>
            <Button
              label="Cancel"
              type="outlined"
              onPress={() => setVisible(false)}
              width={'48%'}
            />
            <Button
              label="Save"
              type="filled"
              onPress={() => handleSubmit(onSubmit)()}
              isLoading={isBtnLoading}
              width={'48%'}
            />
          </View>
        </View>
      </ModalContainer>
    );
  };

  return (
    <View style={styles.container}>
      {openModal()}
      {openConfirmationalModal()}
      {openOptionsModal()}
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
        {familyMembers.length > 0 ? (
          familyMembers.map((familyMember, index) => {
            return (
              <FamilyMemberCard
                key={index}
                familyMember={familyMember}
                setOpenOptions={setOpenOptions}
                setSelectedMember={setSelectedMember}
              />
            );
          })
        ) : (
          <NotFound
            text='No family members are added'
            height={dimensions.Height / 2}
            title="No family members found"
          />
        )}
      </ScrollView>
    </View>
  );
};

export default FamilyMembers;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight: dimensions.Height / 1.8,
    flex: 1,
  },

  btnContainer: {
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },

  contentContainer: {
    width: '100%',
    paddingBottom: dimensions.Height / 10,
    paddingTop: dimensions.Height / 40,
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
  controls: {
    width: '92%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  bottomModalContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  text: {
    fontSize: fonts.size.font14,
    fontWeight: fonts.weight.semi,
    marginBottom: dimensions.Height / 100,
  },
  modalTitle: {
    fontSize: fonts.size.font24,
    fontWeight: fonts.weight.bold,
  },

  modalContainer: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
  },

  inputContainer: {
    width: '92%',
  },

  headingContainer: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  heading: {
    fontSize: fonts.size.font20,
    fontWeight: fonts.weight.bold,
  },

  optionContainer: {
    width: '100%',
    flex: 1,
  },

  option: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  optionText: {
    fontSize: fonts.size.font16,
    fontWeight: fonts.weight.semi,
  },

  iconTabsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

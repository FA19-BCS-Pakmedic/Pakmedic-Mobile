import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {ModalInputField, ValidateInputField} from '../../shared/Input';
import {useForm} from 'react-hook-form';
import colors from '../../../utils/styles/themes/colors';
import dimensions from '../../../utils/styles/themes/dimensions';
import fonts from '../../../utils/styles/themes/fonts';
import AddMore from '../../shared/AddMore';
import Button from '../../shared/Button';
import {updatePatient} from '../../../services/patientServices';
import GeneticCard from './Card';
import ModalContainer from '../../../containers/ModalContainer';
import {useCustomToast} from '../../../hooks/useCustomToast';
import NotFound from '../../shared/NotFound';

const geneticDiseases = ({updateUser, geneDis, isViewing}) => {
  const {showToast} = useCustomToast();
  const [visible, setVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editIdx, setEditIdx] = useState(-1);
  const [loading, setLoading] = useState(false);

  console.log(geneticDiseases);
  const geneticDiseases = geneDis ? [...geneDis] : [];

  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
    setValue,
    watch,
    reset,
  } = useForm({
    mode: 'all',
    revalidate: 'all',
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = async values => {
    console.log('here');
    setLoading(true);
    try {
      if (!isEdit) {
        geneticDiseases.push(values.name);
      } else {
        if (geneticDiseases?.length > 0) geneticDiseases[editIdx] = values.name;
      }
      const response = await updatePatient({
        medical: {geneticDiseases},
      });
      updateUser();
      showToast('Genetic disease added successfully', 'success');
    } catch (err) {
      console.log(err);
      showToast('Error adding genetic disease', 'danger');
    } finally {
      setVisible(false);
      setLoading(false);
      reset();
    }
  };

  const onDeletePress = async idx => {
    try {
      if (geneticDiseases?.length > 0) {
        geneticDiseases.splice(idx, 1);

        const response = await updatePatient({
          medical: {geneticDiseases},
        });

        setVisible(false);

        reset();
        updateUser();
        showToast('Genetic disease deleted successfully', 'success');
      }
    } catch (err) {
      console.log(err);
      showToast('Error deleting Genetic disease', 'danger');
    }
  };

  const onEditPress = idx => {
    setIsEdit(true);
    setEditIdx(idx);
    if (geneticDiseases.length > 0) setValue('name', geneticDiseases[idx]);
    setVisible(true);
  };

  const openModal = () => {
    return (
      <>
        <ModalContainer
          isModalVisible={visible}
          setModalVisible={setVisible}
          width={dimensions.Width / 1.1}
          type="center"
          backDropOpacity={0.5}
          padding={dimensions.Height / 50}
          height={dimensions.Height / 3}
          bgColor={'white'}
          borderColor={colors.primary1}>
          <View style={styles.modalContainer}>
            <View style={styles.headingContainer}>
              <Text style={styles.heading}>Add Genetic Disease</Text>
            </View>
            <View style={styles.infoContainer}>
              <View style={styles.inputContainer}>
                <ValidateInputField
                  placeholder="Genetic disease"
                  type="outlined"
                  placeholderTextColor={colors.secondary1}
                  control={control}
                  width="93%"
                  isErrorBoundary={false}
                  name="name"
                  text={watch('name')}
                  rules={{
                    required: {
                      value: true,
                      message: 'Genetic disease is required',
                    },
                  }}
                  title="Genetic disease"
                />
              </View>
            </View>
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
                // isLoading={loading}
                width={dimensions.Width / 2.6}
                isLoading={loading}
              />
            </View>
          </View>
        </ModalContainer>
      </>
    );
  };

  return (
    <View style={styles.container}>
      {openModal()}
      {/* Add Services Button */}
      {!isViewing && 
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
      </View>}
      <ScrollView style={styles.contentContainer}>
        {geneticDiseases?.length > 0 ? (
          geneticDiseases?.map((disease, index) => {
            return (
              <GeneticCard
                key={index}
                index={index}
                disease={disease}
                onEdit={onEditPress}
                onDelete={onDeletePress}
                isViewing={isViewing}
              />
            );
          })
        ) : (
          <NotFound
            title='No Genetic Diseases Found'
            text='Please add genetic diseases to your profile'
          />
        )}
      </ScrollView>
    </View>
  );
};

export default geneticDiseases;

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
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

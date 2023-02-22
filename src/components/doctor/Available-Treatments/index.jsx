import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import ModalContainer from '../../../containers/ModalContainer';
import colors from '../../../utils/styles/themes/colors';
import dimensions from '../../../utils/styles/themes/dimensions';
import fonts from '../../../utils/styles/themes/fonts';
import AddMore from '../../shared/AddMore';
import Button from '../../shared/Button';
import {ModalInputField} from '../../shared/Input';
import AvailableTreatmentsCard from './Card';

export default function AvailableTreatments() {
  const [visible, setVisible] = useState(false);

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
    },
  });

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
          height={dimensions.Height / 3.2}
          bgColor={'white'}
          borderColor={colors.primary1}>
          <View style={styles.modalContainer}>
            <View style={styles.headingContainer}>
              <Text style={styles.heading}>Add Treatment</Text>
            </View>
            <View style={styles.infoContainer}>
              <View style={styles.inputContainer}>
                <ModalInputField
                  placeholder="Treatment name"
                  type="outlined"
                  placeholderTextColor={colors.secondary1}
                  control={control}
                  name="name"
                  rules={{
                    required: {
                      value: true,
                      message: 'Treatment Name is required',
                    },
                  }}
                  title="Treatment Name"
                />
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
      </>
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
        <AvailableTreatmentsCard />
        <AvailableTreatmentsCard />
        <AvailableTreatmentsCard />
        <AvailableTreatmentsCard />
        <AvailableTreatmentsCard />
      </ScrollView>
    </View>
  );
}

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
  controls: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

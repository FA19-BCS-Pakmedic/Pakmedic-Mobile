import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import ModalContainer from '../../../containers/ModalContainer';
import {REASONS} from '../../../utils/constants/Reasons';
import colors from '../../../utils/styles/themes/colors';
import dimensions from '../../../utils/styles/themes/dimensions';
import fonts from '../../../utils/styles/themes/fonts';
import AddMore from '../../shared/AddMore';
import Button from '../../shared/Button';
import {Dropdown} from '../../shared/Dropdown';
import {ModalInputField} from '../../shared/Input';
import ReviewCard from './Card';

export default function Reviews() {
  const [visible, setVisible] = useState(false);

  const [reportOpen, setReportOpen] = useState(false);

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
      reportReason: '',
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
              <Text style={styles.heading}>Report Review</Text>
            </View>
            <View style={styles.infoContainer}>
              <View style={styles.dropdownContainer}>
                <Dropdown
                  open={reportOpen}
                  setOpen={setReportOpen}
                  items={REASONS}
                  control={control}
                  title="Reason"
                  setValue={callback => {
                    setValue('reportReason', callback());
                  }}
                  value={watch('reportReason')}
                  minHeight={dimensions.Height / 18}
                  name="reportReason"
                  placeholder="Reason"
                  width={dimensions.Width / 1.2}
                  rules={{
                    required: 'Please select a reason',
                    validate: value =>
                      value !== null || 'Please select a reason',
                  }}
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
                label="Submit"
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
      <View style={styles.reviewCountContainer}>
        <Text style={styles.reviewCount}>674 Reviews</Text>
      </View>
      <ScrollView style={styles.contentContainer}>
        <ReviewCard setOpen={setVisible} />
        <ReviewCard setOpen={setVisible} />
        <ReviewCard setOpen={setVisible} />
        <ReviewCard setOpen={setVisible} />
        <ReviewCard setOpen={setVisible} />

        <View style={styles.btnContainer}>
          <Button
            type="filled"
            label="View All Reviews"
            onPress={() => {}}
            width={dimensions.Width / 2}
          />
        </View>
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

  reviewCountContainer: {
    width: '100%',
  },

  reviewCount: {
    fontSize: fonts.size.font24,
    fontWeight: fonts.weight.bold,
  },

  btnContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: dimensions.Height / 20,
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

  dropdownContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

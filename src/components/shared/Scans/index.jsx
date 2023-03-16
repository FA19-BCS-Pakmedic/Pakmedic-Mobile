import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useForm} from 'react-hook-form';

import DocumentPicker, {
  isInProgress,
  types,
} from 'react-native-document-picker';

import dimensions from '@/utils/styles/themes/dimensions';
import colors from '@/utils/styles/themes/colors';
import fonts from '@/utils/styles/themes/fonts';

import ScanCard from './ScanCard';
import ModalContainer from '@/containers/ModalContainer';
import {ValidateInputField} from '@/components/shared/Input';
import CustomDatePicker from '@/components/shared/CustomDatePicker';
import FilePicker from '../FilePicker';
import Button from '../Button';

import {addScan, deleteScan, updateScan} from '../../../services/ehrServices';

const Scans = ({scans, visible, setVisible, updateUser, isEdit, setIsEdit}) => {
  const [scanImage, setScanImage] = useState(null);
  const [open, setOpen] = useState(false);

  const [selectedScan, setSelectedScan] = useState(null);

  const [openOptions, setOpenOptions] = useState(false);

  const [isBtnLoading, setIsBtnLoading] = useState(false);

  const {control, handleSubmit, watch, reset, setValue} = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      title: '',
      date: new Date(),
      file: null,
      isFamilyReport: false,
      familyMemberId: '',
    },
  });

  const onChangeDate = (date, name) => {
    if (date) {
      setValue(name, date);
    }
  };

  useEffect(() => {
    if (scanImage) {
      setValue('file', scanImage[0].name);
    }
  }, [scanImage]);

  const handleError = err => {
    if (DocumentPicker.isCancel(err)) {
      console.warn('cancelled');
      // User cancelled the picker, exit any dialogs or menus and move on
    } else if (isInProgress(err)) {
      console.warn(
        'multiple pickers were opened, only the last will be considered',
      );
    } else {
      throw err;
    }
  };

  const onPressDelete = async () => {
    if (selectedScan) {
      await deleteScan(selectedScan._id);
      updateUser();
      setOpenOptions(false);
    }
  };

  const onSubmit = async data => {
    console.log('on submit called');

    let formData;
    if (!isEdit) {
      formData = new FormData();
      formData.append('title', JSON.stringify(data.title));
      formData.append('date', JSON.stringify(new Date(data.date)));
      formData.append('isFamilyReport', JSON.stringify(data.isFamilyReport));
      formData.append('familyMemberId', JSON.stringify(data.familyMemberId));
      formData.append('file', {
        uri: scanImage[0].uri,
        type: scanImage[0].type,
        name: scanImage[0].name,
      });
    }
    try {
      setIsBtnLoading(true);
      if (!isEdit) await addScan(formData);
      else await updateScan(selectedScan._id, data);
      updateUser();
      setVisible(false);
      reset();
    } catch (err) {
      console.log(err);
    } finally {
      setIsBtnLoading(false);
      setIsEdit(false);
    }
  };

  const onPressEdit = () => {
    setIsEdit(true);
    setOpenOptions(false);
    setValue('file', selectedScan.image);
    setValue('title', selectedScan.title);
    setValue('date', new Date(selectedScan.date));
    setValue('isFamilyReport', selectedScan.isFamilyReport);
    setVisible(true);
  };

  const openOptionsModal = () => {
    console.log(openOptions);
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
              <Text style={styles.heading}>Scan options</Text>
            </View>
            <View style={styles.optionContainer}>
              <TouchableHighlight
                underlayColor="#f4f4f4"
                activeOpacity={1}
                style={styles.option}
                onPress={() => {}}>
                <Text style={styles.optionText}>Download</Text>
              </TouchableHighlight>
            </View>

            <View style={styles.optionContainer}>
              <TouchableHighlight
                underlayColor="#f4f4f4"
                activeOpacity={1}
                style={styles.option}
                onPress={() => {
                  onPressEdit();
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
                  onPressDelete();
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
        height={dimensions.Height / 1.8}
        bgColor={'white'}
        borderColor={colors.primary1}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Scans</Text>
          <View style={styles.inputContainer}>
            <ValidateInputField
              control={control}
              name="title"
              placeholder="Enter title"
              rules={{
                required: 'Title is required',
              }}
              type="outlined"
              width="100%"
              height={dimensions.Height / 20}
              title={'Scan Title'}
              text={watch('title')}
            />
          </View>
          <View style={styles.inputContainer}>
            {/* <Text style={styles.text}>Scan Date</Text> */}
            <CustomDatePicker
              control={control}
              name="date"
              date={watch('date')}
              title={'Scan Date'}
              open={open}
              setOpen={setOpen}
              onChangeDate={onChangeDate}
            />
          </View>
          <View style={styles.inputContainer}>
            <FilePicker
              control={control}
              name="file"
              title={'Scan File'}
              type="outlined"
              width="100%"
              height={dimensions.Height / 15}
              placeholder="Choose File"
              rules={{
                required: 'File is required',
              }}
              isDisabled={isEdit}
              text={watch('file')}
              onPress={async () => {
                try {
                  const pickerResult = await DocumentPicker.pickSingle({
                    presentationStyle: 'fullScreen',
                    copyTo: 'cachesDirectory',
                    type: [types.images],
                  });
                  setScanImage([pickerResult]);
                } catch (e) {
                  handleError(e);
                }
              }}
            />
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
              width={'48%'}
              isLoading={isBtnLoading}
            />
          </View>
        </View>
      </ModalContainer>
    );
  };

  return (
    <>
      {openModal()}
      {openOptionsModal()}
      <ScrollView
        style={styles.scrollContainer}
        contentContainer={styles.scrollContentContainer}>
        <View style={styles.contentContainer}>
          {scans.length &&
            scans.map(scan => {
              return (
                <View style={styles.scanContainer} key={scan._id}>
                  <ScanCard
                    scan={scan}
                    setOpenOptions={setOpenOptions}
                    setSelectedScan={setSelectedScan}
                  />
                </View>
              );
            })}
        </View>
      </ScrollView>
    </>
  );
};

export default Scans;

const styles = StyleSheet.create({
  scrollContainer: {
    width: '100%',
  },
  scrollContentContainer: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  contentContainer: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: dimensions.Width / 20,
    paddingBottom: dimensions.Height / 7,
  },

  scanContainer: {
    marginVertical: dimensions.Height / 40,
  },

  modalContainer: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
  },

  modalTitle: {
    fontSize: fonts.size.font24,
    fontWeight: fonts.weight.bold,
  },

  inputContainer: {
    width: '92%',
  },
  text: {
    fontSize: fonts.size.font14,
    fontWeight: fonts.weight.semi,
    marginBottom: dimensions.Height / 100,
  },
  controls: {
    width: '100%',
    flexDirection: 'row',
    marginTop: dimensions.Height / 100,
    justifyContent: 'space-between',
    padding: dimensions.Width / 30,
  },

  bottomModalContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
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
});

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

import {addFile} from '../../../services/fileServices';

import dimensions from '../../../utils/styles/themes/dimensions';
import fonts from '../../../utils/styles/themes/fonts';
import colors from '../../../utils/styles/themes/colors';

import ReportCard from './ReportCard';
import ModalContainer from '@/containers/ModalContainer';
import {ValidateInputField} from '@/components/shared/Input';
import CustomDatePicker from '@/components/shared/CustomDatePicker';
import FilePicker from '../FilePicker';
import Button from '../Button';

import {LABS, TESTS} from '@/utils/constants/Labs';

import {
  addReport,
  deleteReport,
  updateReport,
} from '../../../services/ehrServices';
import ConfirmationAlert from '../ConfirmationAlert';
import {ValidateDropdown} from '../Dropdown';
import {downloadFile} from '../../../utils/helpers/downloadFile';
import {apiEndpoint} from '../../../utils/constants/APIendpoint';

const Reports = ({
  reports,
  visible,
  setVisible,
  updateUser,
  isEdit,
  setIsEdit,
}) => {
  const [reportFile, setReportFile] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [openOptions, setOpenOptions] = useState(false);
  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [isTestsOpen, setIsTestsOpen] = useState(false);
  const [isLabsOpen, setIsLabsOpen] = useState(false);

  const {control, handleSubmit, watch, reset, setValue, clearErrors} = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      title: '',
      symptoms: '',
      date: new Date(),
      file: null,
      isFamilyReport: false,
      familyMemberId: '',
      lab: '',
      type: '',
    },
  });

  const onChangeDate = (date, name) => {
    if (date) {
      setValue(name, date);
    }
  };

  useEffect(() => {
    const uploadFile = async () => {
      const formData = new FormData();
      setIsUploading(true);
      formData.append('file', {
        uri: reportFile[0].uri,
        type: reportFile[0].type,
        name: reportFile[0].name,
      });
      try {
        const response = await addFile(formData);
        setValue('file', response.data.data.filename);
      } catch (err) {
        console.log(err);
      } finally {
        setIsUploading(false);
      }
    };
    if (reportFile) {
      uploadFile();
    }
  }, [reportFile]);

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
    try {
      await deleteReport(selectedReport._id);
      updateUser();
    } catch (err) {
      console.log(err);
    } finally {
      setConfirmationVisible(false);
    }
  };

  const onSubmit = async data => {
    console.log(data);
    try {
      setIsBtnLoading(true);
      isEdit
        ? await updateReport(selectedReport._id, data)
        : await addReport(data);
      updateUser();
      reset();
    } catch (err) {
      console.log(err);
    } finally {
      setIsBtnLoading(false);
      setVisible(false);
    }
  };

  const onPressEdit = () => {
    setIsEdit(true);
    setOpenOptions(false);
    setValue('file', selectedReport.file);
    setValue('title', selectedReport.title);
    setValue('date', new Date(selectedReport.date));
    setValue('isFamilyReport', selectedReport.isFamilyReport);
    setValue('familyMemberId', selectedReport.familyMemberId);
    setValue('lab', selectedReport.lab);
    setValue('type', selectedReport?.type);
    setValue('symptoms', selectedReport.symptoms);
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
              <Text style={styles.heading}>Report options</Text>
            </View>
            <View style={styles.optionContainer}>
              <TouchableHighlight
                underlayColor="#f4f4f4"
                activeOpacity={1}
                style={styles.option}
                onPress={() => {
                  downloadFile(
                    `${apiEndpoint}files/${selectedReport.file}`,
                    selectedReport.file,
                  );
                  // console.log(`${apiEndpoint}files/${selectedReport.file}`);
                }}>
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

  const openConfirmationalModal = () => {
    return (
      <ConfirmationAlert
        alertText={'Are you sure you want to delete this scan?'}
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

  const openModal = () => {
    return (
      <ModalContainer
        isModalVisible={visible}
        setModalVisible={setVisible}
        width={dimensions.Width / 1.1}
        type="center"
        backDropOpacity={0.5}
        padding={dimensions.Height / 50}
        height={dimensions.Height / 1.25}
        bgColor={'white'}
        borderColor={colors.primary1}>
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Reports</Text>
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
                title={'Report Title'}
                text={watch('title')}
              />
            </View>

            <View style={styles.inputContainer}>
              <ValidateInputField
                control={control}
                name="symptoms"
                placeholder="Enter symptoms"
                type="outlined"
                width="100%"
                height={dimensions.Height / 20}
                title={'Symptoms'}
                text={watch('symptoms')}
                rules={{required: 'Enter atleast one symptom'}}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.text}>Lab Name</Text>
              <ValidateDropdown
                control={control}
                name="lab"
                placeholder="Select the lab name"
                items={LABS}
                setOpen={setIsLabsOpen}
                open={isLabsOpen}
                setValue={callback => {
                  setValue('lab', callback());
                  clearErrors('lab');
                }}
                value={watch('lab')}
                minHeight={dimensions.Height / 18}
                rules={{
                  required: 'Please select a lab name',
                  validate: value => value !== null || 'Please select a city',
                }}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.text}>Test type</Text>
              <ValidateDropdown
                control={control}
                name="type"
                placeholder="Select the test type"
                items={TESTS}
                setOpen={setIsTestsOpen}
                open={isTestsOpen}
                setValue={callback => {
                  setValue('type', callback());
                  clearErrors('type');
                }}
                value={watch('type')}
                minHeight={dimensions.Height / 18}
                rules={{
                  required: 'Please select a test type',
                  validate: value => value !== null || 'Please select a city',
                }}
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
                rules={{
                  // date cannot exceed today
                  validate: value => {
                    return value < new Date() || "Date can't be in the future";
                  },
                }}
              />
            </View>
            <View style={styles.inputContainer}>
              <FilePicker
                control={control}
                name="file"
                title={'Report File'}
                type="outlined"
                width="100%"
                height={dimensions.Height / 15}
                placeholder="Choose File"
                rules={{
                  required: 'File is required',
                }}
                isLoading={isUploading}
                text={watch('file')}
                onPress={async () => {
                  try {
                    const pickerResult = await DocumentPicker.pickSingle({
                      presentationStyle: 'fullScreen',
                      copyTo: 'cachesDirectory',
                      type: [types.images, types.pdf],
                    });
                    setReportFile([pickerResult]);
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
        </ScrollView>
      </ModalContainer>
    );
  };

  return (
    <>
      {openModal()}
      {openOptionsModal()}
      {openConfirmationalModal()}
      <ScrollView
        style={styles.scrollContainer}
        contentContainer={styles.scrollContentContainer}>
        <View style={styles.contentContainer}>
          {reports.length
            ? reports.map((report, index) => (
                <View style={styles.reportContainer} key={index}>
                  <ReportCard
                    setOpenOptions={setOpenOptions}
                    setSelectedReport={setSelectedReport}
                    report={report}
                  />
                </View>
              ))
            : null}
        </View>
      </ScrollView>
    </>
  );
};

export default Reports;

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

  reportContainer: {
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

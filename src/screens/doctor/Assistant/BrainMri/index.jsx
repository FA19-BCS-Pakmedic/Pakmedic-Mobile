import {View, Text, TouchableOpacity, FlatList, Image} from 'react-native';
import React from 'react';
import StaticContainer from '../../../../containers/StaticContainer';
import DocumentPicker, {
  isInProgress,
  types,
} from 'react-native-document-picker';

import {styles} from './styles';

import dimensions from '../../../../utils/styles/themes/dimensions';
import colors from '../../../../utils/styles/themes/colors';
import fonts from '../../../../utils/styles/themes/fonts';
import {useForm} from 'react-hook-form';

import Button from '../../../../components/shared/Button';

import FilePicker from '../../../../components/shared/FilePicker';

import {addFile} from '../../../../services/fileServices';

import {BrainMRI} from '../../../../services/doctorServices';

import deviceStorage from '../../../../utils/helpers/deviceStorage';

import PopupAlerts from '../../../../components/shared/PopupAlerts';

import {useSelector} from 'react-redux';

const BrainMRIScreen = navigation => {
  const user = useSelector(state => state.auth.user);

  const {control, handleSubmit, watch, setValue, reset} = useForm({
    mode: 'onChange',
    defaultValues: {
      file: null,
    },
  });

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

  const [file, setFile] = React.useState(null);
  const [isUploading, setIsUploading] = React.useState(false);
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [alertName, setAlertName] = React.useState('LoginSuccess');
  const [message, setMessage] = React.useState('We Will Notify You Soon!');

  React.useEffect(() => {
    const uploadFile = async () => {
      const formData = new FormData();
      setIsUploading(true);
      formData.append('file', {
        uri: file[0].uri,
        type: file[0].type,
        name: file[0].name,
      });
      try {
        const response = await addFile(formData);
        setValue('file', response?.data?.data?.filename);
      } catch (err) {
        console.log(err);
      } finally {
        setIsUploading(false);
      }
    };
    if (file) {
      uploadFile();
    }
  }, [file]);

  const onSubmit = async data => {
    if (file == null) {
      alert('Please select a file');
    } else {
      const fcm = await deviceStorage.loadItem('FCMToken');
      data.token = fcm;
      data.user = user?._id;
      const res = await BrainMRI(data);
      if (res?.data === 'Processing image...') {
        setModalVisible(true);
      }
    }
  };

  return (
    <StaticContainer
      customHeaderEnable={true}
      customHeaderName="Brain MRI Diagnosis">
      <View style={styles.container}>
        <View style={styles.fileContainer}></View>
        <FilePicker
          control={control}
          name="file"
          title={'Attach Files'}
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
              });
              setFile([pickerResult]);
            } catch (e) {
              handleError(e);
            }
          }}
        />

        <Button
          label="Run Diagnosis"
          type="Outline"
          width={dimensions.Width / 1.1}
          height={dimensions.Height / 15}
          fontSize={fonts.size.font14}
          onPress={handleSubmit(onSubmit)}
        />
        <PopupAlerts
          isModalVisible={isModalVisible}
          setModalVisible={setModalVisible}
          height={1.8}
          width={1.2}
          timer={2000}
          alertName={alertName}
          message={message}
          redirect={{screen: 'DoctorTabStack'}}></PopupAlerts>
      </View>
    </StaticContainer>
  );
};

export default BrainMRIScreen;

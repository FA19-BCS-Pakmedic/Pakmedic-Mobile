import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  VirtualizedList,
} from 'react-native';

import ModalContainer from '../../../containers/ModalContainer';

import dimensions from '../../../utils/styles/themes/dimensions';
import colors from '../../../utils/styles/themes/colors';
import fonts from '../../../utils/styles/themes/fonts';

import Button from '../Button';

import CheckBoxIcon from '../../../assets/svgs/Checkbox.svg';
import UncheckBoxIcon from '../../../assets/svgs/Checkbox-unchecked.svg';
import {ValidateInputField} from '../Input';
import {useForm} from 'react-hook-form';
import DocumentPicker, {
  isInProgress,
  types,
} from 'react-native-document-picker';

import {addPost} from '../../../services/communityServices';
import {addFile} from '../../../services/fileServices';
import FilePicker from '../FilePicker';
import {useSelector} from 'react-redux';

export default CommunityPostAdd = props => {
  const {Visible, setModalVisible, navigation, item} = props;
  const {control, handleSubmit, watch, setValue, reset} = useForm({
    mode: 'onChange',
    defaultValues: {
      title: '',
      post: '',
      file: '',
    },
  });

  const [file, setFile] = React.useState(null);

  const [isCheck, setIsCheck] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [isUploading, setIsUploading] = React.useState(false);

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
        setValue('file', response.data.data.filename);
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
    setLoading(true);
    Post({
      title: data?.title,
      content: data?.post,
      isAnonymous: isCheck,
      file: data?.file,
      
    });
  };

  const Post = async data => {
    try {
      const response = await addPost(item._id, data);
      if (response?.status === 201) {
        setLoading(false);
        setModalVisible(false);
      }
    } catch (error) {
      console.log('error', error);
      setLoading(false);
    } finally {
      reset();
      setIsCheck(false);
    }
  };

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

  return (
    <ModalContainer
      isModalVisible={Visible}
      setModalVisible={setModalVisible}
      height={dimensions.Height / 1.6}
      width={dimensions.Width * 0.9}
      backDropOpacity={0.5}
      padding={dimensions.Height / 50}
      bgColor={colors.white}
      back={false}
      borderColor={colors.primary1}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Create a Post</Text>
        </View>
        <View style={styles.body}>
          <ValidateInputField
            placeholder="Write your problem title"
            placeholderTextColor={colors.secondary1}
            control={control}
            name="title"
            rules={{
              required: {
                value: true,
                message: 'Title is required',
              },
            }}
            containerWidth={dimensions.Width * 0.8}
            fontSize={fonts.size.font14}
            title="Title"
            type="outlined"
            watch={watch('title')}
          />

          <ValidateInputField
            placeholder="Write your problem description"
            placeholderTextColor={colors.secondary1}
            control={control}
            name="post"
            rules={{
              required: {
                value: true,
                message: 'Post is required',
              },
            }}
            title="Post"
            containerWidth={dimensions.Width * 0.8}
            fontSize={fonts.size.font14}
            multiline={true}
            inputHeight={dimensions.Height / 6.5}
            type="outlined"
            isFlexStart={true}
            watch={watch('post')}
          />
        </View>
        <View style={styles.fileContainer}>
          <FilePicker
            control={control}
            name="file"
            title={'Attach Files'}
            type="outlined"
            width="100%"
            height={dimensions.Height / 15}
            placeholder="Choose File"
            isLoading={isUploading}
            text={watch('file')}
            onPress={async () => {
              try {
                const pickerResult = await DocumentPicker.pickSingle({
                  presentationStyle: 'fullScreen',
                  copyTo: 'cachesDirectory',
                  type: [types.images, types.pdf],
                });
                setFile([pickerResult]);
              } catch (e) {
                handleError(e);
              }
            }}
          />
        </View>
        <View style={styles.checkContainer}>
          {/* on Button click it switches between check and uncheck */}

          <TouchableOpacity
            style={styles.check}
            onPress={() => setIsCheck(!isCheck)}>
            {isCheck ? (
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

          <Text style={styles.fileText}>Check to make anonymous post</Text>
        </View>

        <View style={styles.ButtonContainer}>
          <Button
            label="Cancel"
            type="outlined"
            width={dimensions.Width / 3.5}
            height={dimensions.Height / 25}
            fontSize={fonts.size.font14}
            onPress={() => {
              setIsCheck(false);
              setLoading(false);
              reset();
              setModalVisible(false);
            }}
          />
          <Button
            label="Post"
            type="filled"
            width={dimensions.Width / 3.5}
            height={dimensions.Height / 25}
            fontSize={fonts.size.font14}
            isLoading={loading}
            onPress={handleSubmit(onSubmit)}
            isDisabled={loading || isUploading}
          />
        </View>
      </View>
    </ModalContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    height: dimensions.Height / 25,
  },
  headerText: {
    fontSize: fonts.size.font16,
    fontWeight: fonts.weight.bold,
    color: colors.secondary1,
  },
  body: {
    height: dimensions.Height / 3,
    justifyContent: 'space-evenly',
  },
  title: {
    fontSize: fonts.size.font14,
    fontWeight: fonts.weight.bold,
    color: colors.secondary1,
  },
  inputContainer: {
    width: '100%',
  },
  fileContainer: {
    height: dimensions.Height / 9,
    //justifyContent: 'center',
  },
  fileText: {
    marginLeft: dimensions.Width * 0.01,
    fontSize: fonts.size.font12,
    fontWeight: fonts.weight.normal,
    color: colors.secondary1,
  },
  checkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: dimensions.Height / 20,
  },
  check: {
    width: dimensions.Width / 15,
    height: dimensions.Height / 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ButtonContainer: {
    height: dimensions.Height / 20,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});

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

import {addPost} from '../../../services/postServices';

export default CommunityPostAdd = props => {
  const {Visible, setModalVisible, navigation} = props;
  const {control, handleSubmit, watch} = useForm({
    mode: 'onChange',
    initialValues: {
      title: '',
      post: '',
    },
  });

  const [isCheck, setIsCheck] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onSubmit = async data => {
    setLoading(true);
    Post({title: data?.title, content: data?.post, authorType: 'Patient'});
  };

  const Post = async data => {
    try {
      console.log('data', data);
      const response = await addPost(data);
      if (response?.status === 201) {
        setLoading(false);
        setModalVisible(false);
      }
    } catch (error) {
      console.log('error', error);
      setLoading(false);
    }
  };

  return (
    <ModalContainer
      isModalVisible={Visible}
      setModalVisible={setModalVisible}
      height={dimensions.Height / 1.7}
      width={dimensions.Width * 0.9}
      backDropOpacity={0.5}
      padding={dimensions.Height / 50}
      bgColor={colors.white}
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
            watch={watch('post')}
          />
        </View>
        <View style={styles.fileContainer}>
          <Text style={styles.title}>Attach Files:</Text>
          <View style={styles.file}>
            <Button
              label="Choose file"
              type="filled"
              width={dimensions.Width / 3.5}
              height={dimensions.Height / 25}
              fontSize={fonts.size.font14}
            />
            <Text style={styles.fileText}>File Name</Text>
          </View>
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
            onPress={() => setModalVisible(false)}
          />
          <Button
            label="Post"
            type="filled"
            width={dimensions.Width / 3.5}
            height={dimensions.Height / 25}
            fontSize={fonts.size.font14}
            isLoading={loading}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </View>
    </ModalContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    height: dimensions.Height / 20,
  },
  headerText: {
    fontSize: fonts.size.font16,
    fontWeight: fonts.weight.bold,
    color: colors.secondary1,
  },
  body: {
    height: dimensions.Height / 3.3,
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
    height: dimensions.Height / 10,
    justifyContent: 'space-evenly',
  },
  fileText: {
    marginLeft: dimensions.Width * 0.01,
    fontSize: fonts.size.font12,
    fontWeight: fonts.weight.normal,
    color: colors.secondary1,
  },
  file: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderColor: colors.primary1,
    borderWidth: 1,
    height: dimensions.Height / 17,
    borderRadius: 5,
    padding: dimensions.Height / 100,
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

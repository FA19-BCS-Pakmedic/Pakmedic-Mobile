import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import ModalContainer from '../../../containers/ModalContainer';

import dimensions from '../../../utils/styles/themes/dimensions';
import colors from '../../../utils/styles/themes/colors';
import fonts from '../../../utils/styles/themes/fonts';

import Button from '../../shared/Button';

import {ValidateInputField} from '../../shared/Input';

import {useForm} from 'react-hook-form';

import {useSelector} from 'react-redux';

import Star from '../../../assets/svgs/Star.svg';
import {FlatList} from 'react-native-gesture-handler';

import {createReview} from '../../../services/reviewServices';

export default ReviewAddModal = props => {
  const {Visible, setModalVisible, navigation, item, edit} = props;
  const role = useSelector(state => state.role.role);
  const id = useSelector(state => state.auth.user._id);

  const [loading, setLoading] = useState(false);

  const [rating, setRating] = useState(1);

  const {control, handleSubmit, watch, setValue, reset} = useForm({
    mode: 'onChange',
    defaultValues: {
      review: '',
      ratings: 0,
    },
  });

  React.useEffect(() => {
    setValue('ratings', rating);
  }, [rating]);

  const onSubmit = async data => {
    //console.log(data);
    data.patient = id;
    data.doctor = item._id;
    //console.log('new data', data);
    try {
      setLoading(true);

      const res = await createReview(data);
      //console.log(res.data);
      reset();
      setRating(1);
      setLoading(false);
      setModalVisible(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <ModalContainer
      isModalVisible={Visible}
      setModalVisible={setModalVisible}
      height={dimensions.Height / 2.3}
      width={dimensions.Width * 0.9}
      backDropOpacity={0.5}
      padding={dimensions.Height / 50}
      bgColor={colors.white}
      back={false}
      borderColor={colors.primary1}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            {edit ? 'Edit Review' : 'Add Review'}
          </Text>
        </View>
        <View style={styles.body}>
          <FlatList
            data={[1, 2, 3, 4, 5]}
            contentContainerStyle={styles.ratingContainer}
            renderItem={item => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setRating(item.index + 1);
                  }}
                  style={styles.star}>
                  <Star
                    width={dimensions.Width / 9}
                    height={dimensions.Width / 9}
                    fill={rating > item.index ? '#FBBC04' : '#0000'}
                  />
                </TouchableOpacity>
              );
            }}
          />

          <ValidateInputField
            placeholder={'Write your review here'}
            placeholderTextColor={colors.secondary1}
            control={control}
            name="review"
            rules={{
              required: {
                value: true,
                message: 'review is required',
              },
            }}
            containerWidth={dimensions.Width * 0.8}
            inputHeight={dimensions.Height / 8}
            fontSize={fonts.size.font14}
            text={watch('review')}
            multiline
            isFlexStart
            title={'Review'}
            type="outlined"
          />
        </View>

        <View style={styles.ButtonContainer}>
          <Button
            label="Cancel"
            type="outlined"
            width={dimensions.Width / 3.5}
            height={dimensions.Height / 25}
            fontSize={fonts.size.font14}
            isDisabled={loading}
            onPress={() => {
              setModalVisible(false);
              reset();
              setRating(1);
            }}
          />
          <Button
            label={edit ? 'Update' : 'Add'}
            type="filled"
            width={dimensions.Width / 3.5}
            height={dimensions.Height / 25}
            fontSize={fonts.size.font14}
            isLoading={loading}
            isDisabled={loading}
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
    //justifyContent: 'space-between',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: fonts.size.font16,
    fontWeight: fonts.weight.bold,
    color: colors.secondary1,
  },
  body: {
    height: dimensions.Height * 0.3,
  },
  Text: {
    fontSize: fonts.size.font14,
    fontWeight: fonts.weight.bold,
    marginBottom: dimensions.Height * 0.01,
  },

  ButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: dimensions.Height * 0.1,
  },
  star: {},
});

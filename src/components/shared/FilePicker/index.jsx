import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Controller} from 'react-hook-form';
import Button from '../Button';
import colors from '../../../utils/styles/themes/colors';
import fonts from '../../../utils/styles/themes/fonts';
import dimensions from '../../../utils/styles/themes/dimensions';

const FilePicker = ({
  control,
  name,
  title,
  type,
  width,
  height,
  onPress,
  text,
  isDisabled = false,
  isLoading = false,
}) => {
  console.log(text);
  return (
    <Controller
      control={control}
      name={name}
      render={({value}) => (
        <View style={styles(width, null, type).container}>
          <Text style={styles().title}>{title}</Text>
          <View style={styles(null, height, type).filePickerContainer}>
            <Button
              height={height / 1.5}
              width={dimensions.Width / 4}
              label="Choose File"
              type="filled"
              onPress={onPress}
              isLoading={isLoading}
            />
            <Text style={styles().fileName}>{text ? text : 'File Name'}</Text>
          </View>
        </View>
      )}
    />
  );
};

export default FilePicker;

const styles = (width, height, type) =>
  StyleSheet.create({
    container: {
      width: width,
    },

    title: {
      fontSize: fonts.size.font14,
      color: colors.secondary1,
      fontWeight: fonts.weight.semi,
      marginBottom: dimensions.Height / 100,
    },

    filePickerContainer: {
      width: '100%',
      height: height,
      borderWidth: 1,
      borderColor: type === 'outlined' ? colors.primary1 : colors.white,
      borderRadius: dimensions.Width / 60,
      backgroundColor: type === 'outlined' ? colors.white : colors.primary1,
      alignItems: 'center',

      flexDirection: 'row',
      paddingHorizontal: dimensions.Width / 30,
    },

    fileName: {
      fontSize: fonts.size.font14,
      color: colors.secondary1,
      fontWeight: fonts.weight.semi,
      marginLeft: dimensions.Width / 50,
      maxWidth: dimensions.Width / 2,
    },
  });

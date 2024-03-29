import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Controller} from 'react-hook-form';
import DatePicker from 'react-native-date-picker';

// importing theme
import colors from '../../../utils/styles/themes/colors';
import dimensions from '../../../utils/styles/themes/dimensions';
import fonts from '../../../utils/styles/themes/fonts';

//importing Icon
import FaIcon from 'react-native-vector-icons/FontAwesome';

const CustomDatePicker = ({
  onChangeDate,
  date,
  open,
  setOpen,
  name,
  rules,
  type,
  title,
  width,
  padding,
  height,
  control,
  maximumDate,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({field: {value}, fieldState: {error}}) => {
        return (
          <>
            <View style={[styles(null, width, height).root]}>
              {/* <Text style={styles().title}>{title}</Text> */}
              <TouchableOpacity
                style={[
                  styles(type, null, height, padding).container,
                  {
                    borderColor: error ? colors.invalid : colors.primary1,
                  },
                ]}
                onPress={() => {
                  setOpen(true);
                }}>
                <Text>{`${date.getDate()}/${
                  date.getMonth() + 1
                }/${date.getFullYear()}`}</Text>
                <FaIcon name="calendar" size={18} />
              </TouchableOpacity>

              {/* error message */}
              <View style={styles().errorMessageContainer}>
                {error && <ErrorMessage error={error} />}
              </View>
            </View>

            <DatePicker
              modal
              mode="date"
              open={open}
              date={date}
              onConfirm={date => onChangeDate(date, name)}
              onCancel={() => {
                setOpen(false);
              }}
              maximumDate={maximumDate}
              textColor={colors.black}
            />
          </>
        );
      }}
    />
  );
};

export default CustomDatePicker;

const styles = (type, width, height, padding) =>
  StyleSheet.create({
    root: {
      width: width ? width : '100%',
      // borderWidth: 1,
      height: height ? height : dimensions.Height / 17,
      marginBottom: dimensions.Height / 40,
    },

    container: {
      width: '100%',
      height: height ? height : dimensions.Height / 17,
      backgroundColor:
        type === 'filled' ? colors.secondaryMonoChrome100 : colors.white,
      borderWidth: type === 'filled' ? 0 : 1,
      borderColor:
        type === 'filled' ? colors.secondaryMonoChrome100 : colors.primary1,
      paddingHorizontal: padding ? padding : dimensions.Width / 17,
      borderRadius: 5,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },

    title: {
      fontSize: fonts.size.font16,
      fontWeight: fonts.weight.bold,
      marginBottom: dimensions.Height / 100,
    },

    errorMessageContainer: {
      width: '100%',
      height: dimensions.Height / 40,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },

    iconContainer: {
      width: 25,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

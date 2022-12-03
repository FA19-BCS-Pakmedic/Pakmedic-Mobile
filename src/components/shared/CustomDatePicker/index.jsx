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
            <View style={[styles().root]}>
              {/* <Text style={styles().title}>{title}</Text> */}
              <TouchableOpacity
                style={[
                  styles(type).container,
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
              onConfirm={date => onChangeDate(date)}
              onCancel={() => {
                setOpen(false);
              }}
              maximumDate={maximumDate}
            />
          </>
        );
      }}
    />
  );
};

export default CustomDatePicker;

const styles = type =>
  StyleSheet.create({
    root: {
      width: '100%',
      // borderWidth: 1,
    },

    container: {
      width: '100%',
      height: dimensions.Height / 17,
      backgroundColor: type === 'filled' ? colors.secondaryLight : colors.white,
      borderWidth: type === 'filled' ? 0 : 1,
      borderColor: type === 'filled' ? colors.secondaryLight : colors.primary1,
      paddingHorizontal: dimensions.Width / 17,
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

//node modules import
import {
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import {Controller} from 'react-hook-form';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import IntlPhoneInput from 'react-native-intl-phone-input';

// import theme
import colors from '../../../utils/styles/themes/colors';
import dimensions from '../../../utils/styles/themes/dimensions';
import fonts from '../../../utils/styles/themes/fonts';

// custom components import
import ErrorMessage from '../ErrorMessage';

//contact input field

export const ContactInputField = ({
  control,
  name,
  rules = {},
  type,
  width,
  title,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: {onChange, onBlur},
        fieldState: {error, isDirty, isTouched},
      }) => (
        <View style={[styles().root]}>
          {/* <Text style={styles().title}>{title}</Text> */}
          <View
            style={[
              styles(type, width).container,

              {
                borderColor: error ? colors.invalid : colors.primary1,
                paddingLeft: 1,
              },
            ]}>
            <IntlPhoneInput
              onChangeText={e => {
                onChange(

                  // `${e.dialCode}-${e.phoneNumber.replace(/\s|(|)/gi, '')}`,
                  `0${e.phoneNumber.replace(/\s|(|)/gi, '')}`,
                );

              }}
              placeholder="Phone Number"
              placeholderTextColor={colors.secondary1}
              onBlur={onBlur}
              defaultCountry="PK"
              phoneInputStyle={styles(type, width).input}
              containerStyle={{
                width: '93.5%',
                // borderWidth: 1,
              }}
              flagStyle={styles().flagContainer}
            />
            <View>
              {(isDirty || isTouched || error) && (
                <Animatable.View
                  animation="fadeIn"
                  easing="ease-in-out"
                  style={styles().iconContainer}>
                  {!error && <Icon name="checkmark-circle-outline" size={18} />}
                  {error && (
                    <Icon
                      name="close-circle-outline"
                      size={18}
                      color={colors.invalid}
                    />
                  )}
                </Animatable.View>
              )}
            </View>
          </View>
          {/* error message */}
          <View style={styles().errorMessageContainer}>
            {error && <ErrorMessage error={error} />}
          </View>
        </View>
      )}
    />
  );
};

// Input field with validity functionality
export const ValidateInputField = ({
  control,
  name,
  rules = {},
  type,
  placeholder,
  width,
  keyboardType,
  isPasswordField,
  placeholderTextColor,
  text,
  title,
  isPasswordVisible,
  setIsPasswordVisible,
  onBlurEvent,
  isDisabled,
  isErrorBoundary = true,
}) => {
  // setting the password eye icon name based on the visiblility status
  const passwordIconName = !isPasswordVisible
    ? 'ios-eye-off-outline'
    : 'ios-eye-outline';

  // password visibility toggle function
  const togglePasswordView = () => {
    setIsPasswordVisible(isPasswordVisible);
  };

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      key={name}
      render={({
        field: {onChange, onBlur},
        fieldState: {error, isDirty, isTouched},
      }) => {
        return (
          <View style={styles().root}>
            {title ? <Text style={styles().title}>{title}</Text> : null}
            <View
              style={[
                styles(type, null, isDisabled).container,
                {
                  borderColor: error
                    ? colors.invalid
                    : type === 'outlined' && isDisabled
                    ? colors.white
                    : colors.primary1,
                },
              ]}>
              <TextInput
                editable={!isDisabled}
                style={styles(type, width).input}
                placeholder={placeholder}
                secureTextEntry={isPasswordVisible}
                keyboardType={keyboardType || 'text'}
                placeholderTextColor={placeholderTextColor || colors.secondary1}
                value={text}
                onChangeText={onChange}
                onBlur={() => {
                  onBlur();
                  if (onBlurEvent) {
                    onBlurEvent();
                  }
                }}
              />
              <View
                style={
                  isPasswordField &&
                  (isDirty || isTouched || error) &&
                  styles().iconsContainer
                }>
                {isPasswordField && (
                  <TouchableOpacity
                    onPress={togglePasswordView}
                    style={styles().iconContainer}>
                    <Icon name={passwordIconName} size={18} />
                  </TouchableOpacity>
                )}
                {(isDirty || isTouched || error) && (
                  <Animatable.View
                    animation="fadeIn"
                    easing="ease-in-out"
                    style={styles().iconContainer}>
                    {!error && (
                      <Icon name="checkmark-circle-outline" size={18} />
                    )}
                    {error && (
                      <Icon
                        name="close-circle-outline"
                        size={18}
                        color={colors.invalid}
                      />
                    )}
                  </Animatable.View>
                )}
              </View>
            </View>
            {/* error message */}
            {isErrorBoundary || error ? (
              <View style={styles().errorMessageContainer}>
                {error && <ErrorMessage error={error} />}
              </View>
            ) : null}
          </View>
        );
      }}
    />
  );
};

const styles = (type, width, isDisabled) =>
  StyleSheet.create({
    root: {
      width: '100%',
      marginVertical: dimensions.Height / 200,
    },
    container: {
      width: '100%',
      height: dimensions.Height / 17,
      // backgroundColor:
      //   type === 'filled' ? colors.secondaryMonochrome100 : colors.white,
      borderWidth: type === 'filled' ? 0 : 1,
      // borderColor:
      //   type === 'filled' ? colors.secondaryMonochrome100 : colors.primary1,
      // borderColor:
      //   // type === 'outlined' && isDisabled ? colors.white : colors.white,
      //   colors.black,
      backgroundColor:
        type === 'outlined'
          ? isDisabled
            ? colors.gray
            : colors.white
          : isDisabled
          ? colors.gray
          : colors.secondaryMonoChrome100,
      paddingHorizontal: dimensions.Width / 40,
      borderRadius: 5,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    },

    flagContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: fonts.size.font24,
    },

    title: {
      fontSize: fonts.size.font16,
      fontWeight: fonts.weight.bold,
      marginBottom: dimensions.Height / 100,
    },

    input: {
      color: colors.secondary1,
      width: width,
    },

    errorMessageContainer: {
      width: '100%',
      height: dimensions.Height / 40,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },

    iconsContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },

    iconContainer: {
      width: 25,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export const ModalInputField = ({
  control,
  name,
  rules = {},
  type,
  placeholder,
  width,
  height,
  isMultiline,
  numberOfLines,
  keyboardType,
  placeholderTextColor,
  text,
  title,
  isDisabled,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      key={name}
      render={({
        field: {onChange},
        fieldState: {error, isDirty, isTouched},
      }) => {
        return (
          <View style={modalInputStyles(null, null, width, height).root}>
            {title ? (
              <Text style={modalInputStyles().title}>{title}</Text>
            ) : null}
            <View
              style={
                modalInputStyles(null, null, width, height).inputContainer
              }>
              <TextInput
                editable={!isDisabled}
                style={modalInputStyles(type, isDisabled, null, height).input}
                placeholder={placeholder}
                keyboardType={keyboardType || 'text'}
                multiline={isMultiline}
                numberOfLines={numberOfLines}
                placeholderTextColor={
                  isDisabled
                    ? colors.gray2
                    : placeholderTextColor || colors.secondary1
                }
                onChangeText={onChange}
                value={text}
              />
            </View>
          </View>
        );
      }}
    />
  );
};

const modalInputStyles = (type, isDisabled, width, height) =>
  StyleSheet.create({
    root: {
      width: width ? width : '100%',
      // borderWidth: 1,
      height: height ? height : 'auto',
    },

    title: {
      fontSize: fonts.size.font14,
      fontWeight: fonts.weight.semi,
    },

    inputContainer: {
      width: width ? width : '100%',
      height: height ? height : 'auto',
      paddingHorizontal: dimensions.Width / 40,
      height: dimensions.Height / 19,
      marginTop: dimensions.Height / 100,
    },

    input: {
      borderWidth: type === 'outlined' ? 1 : 0,
      borderColor:
        type === 'outlined' && !isDisabled ? colors.primary1 : colors.white,
      backgroundColor:
        type === 'outlined'
          ? isDisabled
            ? colors.gray
            : colors.white
          : colors.secondaryMonoChrome100,
      color: colors.secondary1,
      borderRadius: 5,
      paddingHorizontal: dimensions.Width / 60,
      height: height ? height : 'auto',
      textAlignVertical: 'top',
    },

    iconContainer: {
      width: 25,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

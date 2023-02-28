//nodemodules import
import {View, StyleSheet} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {Controller} from 'react-hook-form';

//styles import
import colors from '../../../utils/styles/themes/colors';

// custom components import
import ErrorMessage from '../ErrorMessage';
import fonts from '../../../utils/styles/themes/fonts';
import dimensions from '../../../utils/styles/themes/dimensions';

export const ValidateDropdown = ({
  open,
  items,
  setOpen,
  setValue,
  control,
  placeholder,
  width,
  name,
  rules,
  isErrorBoundary = true,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({field: {value}, fieldState: {error}}) => {
        return (
          <View style={styles(width).validateRoot}>
            <DropDownPicker
              dropDownDirection="BOTTOM"
              listMode="SCROLLVIEW"
              scrollViewProps={{
                decelerationRate: 'fast',
              }}
              maxHeight={dimensions.Height / 6.5}
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              style={[
                styles(width).validateSelect,
                {
                  borderColor: error ? colors.invalid : colors.primary1,
                },
              ]}
              placeholder={placeholder}
              placeholderStyle={styles().placeholderStyle}
              listItemLabelStyle={styles().listItemLabelStyle}
              dropDownContainerStyle={styles().dropDownContainerStyle}
              containerStyle={styles().containerStyle}
            />
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

export const Dropdown = ({
  width,
  open,
  items,
  setOpen,
  setValue,
  placeholder,
  value,
  minHeight,
  error = false,
}) => {
  return (
    <View style={styles(width).root}>
      <DropDownPicker
        dropDownDirection="BOTTOM"
        listMode="SCROLLVIEW"
        scrollViewProps={{
          decelerationRate: 'fast',
        }}
        maxHeight={dimensions.Height / 5}
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        style={[
          styles().select,

          {
            borderColor: error ? colors.invalid : colors.primary1,
            minHeight: minHeight,
          },
        ]}
        placeholder={placeholder}
        placeholderStyle={styles().placeholderStyle}
        listItemLabelStyle={styles().listItemLabelStyle}
        dropDownContainerStyle={styles().dropDownContainerStyle}
        containerStyle={styles().containerStyle}
      />
    </View>
  );
};

const styles = width =>
  StyleSheet.create({
    validateRoot: {
      width: '100%',
    },

    root: {
      width: width,
      paddingHorizontal: dimensions.Width / 80,
    },

    title: {
      fontSize: fonts.size.font16,
      fontWeight: fonts.weight.bold,
    },

    validateSelect: {
      borderColor: colors.primary1,
      color: colors.secondary1,
      paddingHorizontal: dimensions.Width / 30,
      marginTop: dimensions.Height / 100,
      zIndex: -1,
      width: width ? width : '100%',
    },

    select: {
      borderColor: colors.primary1,
      color: colors.secondary1,
      paddingHorizontal: dimensions.Width / 30,
      marginVertical: dimensions.Height / 100,
      zIndex: -1,
      width: '100%',
    },

    containerStyle: {
      justifyContent: 'center',
      alignItems: 'center',
    },

    listItemLabelStyle: {
      color: colors.secondary1,
    },

    dropDownContainerStyle: {
      backgroundColor: colors.primaryMonoChrome100,
      borderColor: colors.secondary1,
      borderBottomColor: colors.primary1,
      borderRadius: 10,
      borderWidth: 0.5,
      zIndex: 999,
    },

    errorMessageContainer: {
      width: '100%',

      height: dimensions.Height / 40,

      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },

    placeholderStyle: {
      color: colors.secondary1,
    },
  });

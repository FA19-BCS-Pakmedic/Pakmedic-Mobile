//nodemodules import
import {View, StyleSheet, Text} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {Controller} from 'react-hook-form';

//styles import
import colors from '../../../utils/styles/themes/colors';

// custom components import
import ErrorMessage from '../ErrorMessage';
import fonts from '../../../utils/styles/themes/fonts';
import dimensions from '../../../utils/styles/themes/dimensions';

const Dropdown = ({
  open,
  items,
  setOpen,
  setValue,
  control,
  placeholder,
  name,
  rules,
  title,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({field: {value}, fieldState: {error}}) => {
        return (
          <View style={styles.root}>
            <DropDownPicker
              dropDownDirection="TOP"
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
                styles.select,
                {
                  borderColor: error ? colors.invalid : colors.primary1,
                },
              ]}
              placeholder={placeholder}
              placeholderStyle={styles.placeholderStyle}
              listItemLabelStyle={styles.listItemLabelStyle}
              dropDownContainerStyle={styles.dropDownContainerStyle}
              containerStyle={styles.containerStyle}
            />
            {/* error message */}
            <View style={styles.errorMessageContainer}>
              {error && <ErrorMessage error={error} />}
            </View>
          </View>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
  },

  title: {
    fontSize: fonts.size.font16,
    fontWeight: fonts.weight.bold,
  },

  select: {
    borderColor: colors.primary1,
    color: colors.secondary1,
    paddingHorizontal: dimensions.Width / 20,
  },

  listItemLabelStyle: {
    color: colors.secondary1,
  },
  dropDownContainerStyle: {
    backgroundColor: '#F0F8FF',
    borderColor: colors.secondary1,
    borderBottomColor: colors.primary1,
    borderRadius: 10,
    borderWidth: 0.5,
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

export default Dropdown;

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
            <Text style={styles.title}>{title}</Text>

            <DropDownPicker
              dropDownDirection="TOP"
              listMode="SCROLLVIEW"
              scrollViewProps={{
                decelerationRate: 'fast',
              }}
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
    marginVertical: dimensions.Height / 200,
  },

  title: {
    fontSize: fonts.size.font16,
    fontWeight: fonts.weight.bold,
  },

  select: {
    borderColor: colors.primary1,
    color: colors.secondary1,
  },

  listItemLabelStyle: {
    color: colors.secondary1,
  },
  dropDownContainerStyle: {
    backgroundColor: colors.secondaryLight,
    borderColor: colors.secondary1,
    borderBottomColor: colors.primary1,
  },

  errorMessageContainer: {
    width: '100%',

    height: dimensions.Height / 40,

    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  containerStyle: {
    marginTop: 10,
  },
  placeholderStyle: {
    color: colors.secondary1,
  },
});

export default Dropdown;

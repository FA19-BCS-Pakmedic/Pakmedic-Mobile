//node modules import
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Controller} from 'react-hook-form';
import Icon from 'react-native-vector-icons/Ionicons';

// styles import
import colors from '../../../utils/styles/themes/colors';
import fonts from '../../../utils/styles/themes/fonts';
import dimensions from '../../../utils/styles/themes/dimensions';

// import custom error
import ErrorMessage from '../ErrorMessage';

const RadioGroup = ({
  values,
  setSelected,
  selected,
  title,
  control,
  rules,
  name,
}) => {
  const options = [...values];

  const isSelected = value => {
    return value.toLowerCase() === selected?.toLowerCase()
      ? {
          style: styles.selected,
          icon: 'radio-button-on',
        }
      : {icon: 'radio-button-off'};
  };

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({fieldState: {error}}) => {
        return (
          <View style={styles.root}>
            {title ? <Text style={styles.title}>{title}</Text> : null}
            <View style={styles.options}>
              {options.map((option, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.option,
                      isSelected(option?.value).style,
                      {borderColor: error ? colors.invalid : colors.primary1},
                    ]}
                    onPress={() => setSelected(option?.value)}>
                    <View>
                      <Text style={styles.text}>{option.label}</Text>
                    </View>
                    <View>
                      <Icon name={isSelected(option?.value).icon} size={18} />
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
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
    // marginVertical: dimensions.Height / 250,
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginVertical: dimensions.Height / 100,
  },
  title: {
    marginBottom: dimensions.Height / 100,
    fontSize: fonts.size.font16,
    fontWeight: fonts.weight.semi,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
    borderColor: colors.primary1,
  },

  errorMessageContainer: {
    width: '100%',
    height: dimensions.Height / 40,

    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },

  selected: {
    backgroundColor: colors.primaryMonoChrome100,
  },
  text: {
    marginRight: dimensions.Width / 50,
  },
});

export default RadioGroup;

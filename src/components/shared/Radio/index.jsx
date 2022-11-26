//node modules import
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Controller} from 'react-hook-form';
import Icon from 'react-native-vector-icons/Ionicons';

// styles import
import colors from '../../../utils/styles/themes/colors';
import fonts from '../../../utils/styles/themes/fonts';
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
            <Text style={styles.title}>{title}</Text>
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
            {error && <ErrorMessage error={error} />}
          </View>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    marginVertical: 10,
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  title: {
    fontSize: fonts.size.font16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
    borderColor: colors.primary1,
  },
  selected: {
    backgroundColor: colors.primary3,
  },
  text: {
    marginRight: 10,
  },
});

export default RadioGroup;

import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  View,
} from 'react-native';

import fonts from '../../../utils/styles/themes/fonts';
import colors from '../../../utils/styles/themes/colors';
import dimensions from '../../../utils/styles/themes/dimensions';

export default ProfileOptions = ({options, onClick, isViewing}) => {
  return (
    <View style={styles().container}>
      <ScrollView horizontal contentContainerStyle={styles().contentContainer}>
        {options.map((option, index) => (
          isViewing && option.label === 'E-Signature' ? null : (
          <TouchableOpacity
            style={styles(option.isActive).capsule}
            key={index}
            onPress={() => onClick(index)}>
            <Text style={styles().capsuleText}>{option.label}</Text>
          </TouchableOpacity>)
        ))}
      </ScrollView>
    </View>
  );
};

const styles = isActive =>
  StyleSheet.create({
    container: {height: dimensions.Height / 10},

    contentContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: 'red',
    },

    capsule: {
      backgroundColor: isActive ? colors.secondary1 : colors.primary1,
      borderRadius: 50,
      paddingHorizontal: dimensions.Width / 20,
      paddingVertical: dimensions.Height / 70,
      marginHorizontal: dimensions.Width / 80,
      height: dimensions.Height / 20,
    },

    capsuleText: {
      color: colors.white,
      fontSize: fonts.size.font12,
      fontWeight: fonts.weight.semi,
    },
  });

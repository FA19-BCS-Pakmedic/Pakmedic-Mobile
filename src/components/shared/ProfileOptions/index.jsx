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

export default ProfileOptions = ({options, onClick}) => {
  const dummyOptions = [
    {label: 'General Info', isActive: false},
    {label: 'Services', isActive: true},
    {label: 'Treatments', isActive: false},
    {label: 'Experience', isActive: false},
    {label: 'Reviews', isActive: false},
    {label: 'About', isActive: false},
    {label: 'E-Signature', isActive: false},
  ];

  return (
    <View style={styles().container}>
      <ScrollView horizontal contentContainerStyle={styles().contentContainer}>
        {dummyOptions.map((option, index) => (
          <TouchableOpacity style={styles(option.isActive).capsule} key={index}>
            <Text style={styles().capsuleText}>{option.label}</Text>
          </TouchableOpacity>
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

import {Text, StyleSheet} from 'react-native';
import * as Animatable from 'react-native-animatable';

import colors from '../../../utils/styles/themes/colors';
import fonts from '../../../utils/styles/themes/fonts';

export default ErrorMessage = ({error}) => {
  return (
    <Animatable.View animation="fadeIn" easing="ease-in-out">
      <Text style={styles.errorText}>
        {error?.message || 'This field is required'}
      </Text>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  errorText: {
    color: colors.invalid,
    fontSize: fonts.size.font12,
  },
});

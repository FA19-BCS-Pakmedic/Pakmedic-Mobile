import {StyleSheet} from 'react-native';

import colors from '../../../../utils/styles/themes/colors';
import fonts from '../../../../utils/styles/themes/fonts';
import dimensions from '../../../../utils/styles/themes/dimensions';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  // logoContainer: {
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },

  textContainer: {
    width: '100%',
    marginTop: 10,
  },

  inputContainer: {
    width: '100%',
    marginVertical: dimensions.Height / 20,
  },

  text: {
    fontSize: fonts.size.font16,
    fontWeight: fonts.weight.semi,
  },

  optionsContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },

  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
  },
});

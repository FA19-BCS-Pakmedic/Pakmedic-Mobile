import {StyleSheet} from 'react-native';

import colors from '../../../../utils/styles/themes/colors';
import fonts from '../../../../utils/styles/themes/fonts';
import dimensions from '../../../../utils/styles/themes/dimensions';

export const styles = StyleSheet.create({
  root: {},

  scrollContainer: {
    width: '100%',
  },

  child: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexGrow: 1,
  },

  formContainer: {
    width: '100%',
    flex: 1,
  },
  text: {
    fontSize: fonts.size.font16,
    fontWeight: fonts.weight.normal,
  },

  buttonContainer: {
    width: '100%',
  },
});

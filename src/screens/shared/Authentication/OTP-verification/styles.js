import {StyleSheet} from 'react-native';

import colors from '../../../../utils/styles/themes/colors';
import fonts from '../../../../utils/styles/themes/fonts';
import dimensions from '../../../../utils/styles/themes/dimensions';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  mainContainer: {
    width: '100%',
    flex: 2,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    marginVertical: 30,
  },

  input: {
    width: '20%',
    backgroundColor: colors.secondaryLight,
    height: 50,
    color: colors.secondary1,
  },

  resendCodeContainer: {
    width: '100%',
    alignItems: 'center',
  },

  text: {
    fontSize: fonts.size.font14,
    fontWeight: fonts.weight.semi,
  },

  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    paddingVertical: 50,
    flex: 1,
  },
});

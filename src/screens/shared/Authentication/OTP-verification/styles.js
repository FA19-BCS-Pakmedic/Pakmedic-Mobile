import {StyleSheet} from 'react-native';

import colors from '../../../../utils/styles/themes/colors';
import fonts from '../../../../utils/styles/themes/fonts';
import dimensions from '../../../../utils/styles/themes/dimensions';

export const styles = StyleSheet.create({
  container: {

    width: '100%',
    flex: 6,
    // height: dimensions.Height / 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1,
  },

  pinContainer: {
    width: '100%',
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
    // height: dimensions.Height / 7,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
  },
});

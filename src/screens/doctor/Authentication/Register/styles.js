import {StyleSheet} from 'react-native';

import colors from '../../../../utils/styles/themes/colors';
import dimensions from '../../../../utils/styles/themes/dimensions';
import fonts from '../../../../utils/styles/themes/fonts';

export default StyleSheet.create({
  root: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  scrollContainer: {
    width: '100%',
  },

  child: {
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
  },

  socialButtonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  socialButton: {
    width: '48%',
    height: dimensions.Height / 15,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },

  formContainer: {
    width: '100%',
  },

  text: {
    fontSize: fonts.size.font16,
    fontWeight: fonts.weight.normal,
  },

  registerText: {
    color: colors.primary1,
    fontSize: fonts.size.font16,
    fontWeight: fonts.weight.bold,
  },

  registerTextContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },

  socialButtonsContainer: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

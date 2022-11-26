import {StyleSheet} from 'react-native';

import colors from '../../../../utils/styles/themes/colors';
import fonts from '../../../../utils/styles/themes/fonts';
import dimensions from '../../../../utils/styles/themes/dimensions';

export default StyleSheet.create({
<<<<<<< HEAD
  formContainer: {
    width: '100%',
  },

  logoContainer: {
=======
  root: {
    flex: 1,
    width: dimensions.Width,
    height: dimensions.Height,
    justifyContent: 'center',
>>>>>>> 43e713b870e41061eeebaba041924d6ca0321669
    alignItems: 'center',
    justifyContent: 'center',
  },

  textContainer: {
    justifyContent: 'center',
    width: '100%',
    marginVertical: dimensions.Height / 150,
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

  registerTextContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: dimensions.Height / 50,
  },
});

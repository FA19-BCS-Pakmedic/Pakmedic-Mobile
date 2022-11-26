import {StyleSheet} from 'react-native';

import colors from '../../../../utils/styles/themes/colors';
import fonts from '../../../../utils/styles/themes/fonts';
import dimensions from '../../../../utils/styles/themes/dimensions';

export default StyleSheet.create({
  root: {
    flex: 1,
    width: dimensions.Width,
    height: dimensions.Height,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
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
});

import {StyleSheet} from 'react-native';

// import theme
import colors from '../../../../utils/styles/themes/colors';
import dimensions from '../../../../utils/styles/themes/dimensions';
import fonts from '../../../../utils/styles/themes/fonts';

export default StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  genderText: {
    fontSize: fonts.size.font14,
    fontWeight: fonts.weight.bold,
    width: '100%',
    marginBottom: dimensions.Height / 65,
  },

  formContainer: {
    width: '100%',
  },

  text: {
    fontSize: fonts.size.font14,
    fontWeight: fonts.weight.normal,
  },

  registerText: {
    color: colors.primary1,
    fontSize: fonts.size.font14,
    fontWeight: fonts.weight.bold,
  },

  registerTextContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  socialButtonsContainer: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

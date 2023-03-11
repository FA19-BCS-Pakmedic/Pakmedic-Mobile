import {StyleSheet} from 'react-native';

// import theme
import colors from '../../../../utils/styles/themes/colors';
import dimensions from '../../../../utils/styles/themes/dimensions';
import fonts from '../../../../utils/styles/themes/fonts';

export default StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    justifyContent: 'space-around',
  },

  cnicText: {
    fontSize: fonts.size.font16,
    fontWeight: fonts.weight.bold,
    marginBottom: dimensions.Height / 150,
  },

  formContainer: {
    width: '100%',
  },
  socialButtonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  socialButton: {
    width: '40%',
    height: dimensions.Height / 17,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
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

  radioText: {
    fontSize: fonts.size.font14,
    fontWeight: fonts.weight.semi,
    marginBottom: dimensions.Height / 55,
  },
  registerTextContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },

  buttonContainer: {
    width: '100%',
    marginTop: dimensions.Height / 50,
  },

  socialButtonsContainer: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  radioContainer: {
    width: '100%',
  },
});

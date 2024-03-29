import {StyleSheet} from 'react-native';

import colors from '../../../../utils/styles/themes/colors';
import fonts from '../../../../utils/styles/themes/fonts';
import dimensions from '../../../../utils/styles/themes/dimensions';

export default StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1,
  },

  forgotText: {
    fontSize: fonts.size.font14,
    fontWeight: fonts.weight.semi,
    textAlign: 'right',
  },

  textContainer: {
    justifyContent: 'center',
    paddingHorizontal: dimensions.Width / 30,
    width: '100%',
    // marginVertical: dimensions.Height / 150,
  },
  socialButtonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  socialButton: {
    width: '40%',
    height: dimensions.Height / 15,
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

  socialButtonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  socialButton: {
    width: '40%',
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

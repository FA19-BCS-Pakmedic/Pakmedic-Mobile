import {Dimensions, StyleSheet} from 'react-native';
import COLOR from './Color';

import dimensions from '../../../../utils/styles/themes/dimensions';
import colors from '../../../../utils/styles/themes/colors';
import fonts from '../../../../utils/styles/themes/fonts';

export default StyleSheet.create({
  incomingCallText: {
    fontSize: fonts.size.font24,
    fontWeight: fonts.weight.bold,
    width: '100%',
    textAlign: 'center',
    position: 'absolute',
    top: dimensions.Height / 3,
    paddingVertical: dimensions.Height / 30,
  },
  incomingCallState: {
    fontSize: fonts.size.font16,
    fontWeight: fonts.weight.semi,
    color: colors.accent1,
    width: '100%',
    textAlign: 'center',
    position: 'absolute',
    top: dimensions.Height / 2.4,
  },

  incomingCallButtons: {
    position: 'absolute',
    flexDirection: 'row',
    width: '100%',
    top: dimensions.Height / 1.2,
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  button: {
    width: dimensions.Width / 6,
    height: dimensions.Width / 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: dimensions.Width,
  },

  callBtnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  btnLabel: {
    fontSize: fonts.size.font16,
    fontWeight: fonts.weight.semi,
  },
});

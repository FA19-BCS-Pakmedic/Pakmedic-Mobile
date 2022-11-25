import {StyleSheet} from 'react-native';

import colors from '../../../utils/styles/themes/colors';
import fonts from '../../../utils/styles/themes/fonts';

export const DividerStyles = StyleSheet.create({
  divider: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },

  halfDivider: {
    height: 5,
    flex: 1,
    borderRadius: 20,
  },

  content: {
    fontSize: fonts.size.font14,
    fontWeight: fonts.weight.semi,
    marginHorizontal: 20,
  },
});

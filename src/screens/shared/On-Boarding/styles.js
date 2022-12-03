import {StyleSheet} from 'react-native';

import colors from '../../../utils/styles/themes/colors';
import fonts from '../../../utils/styles/themes/fonts';
import dimensions from '../../../utils/styles/themes/dimensions';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    height: dimensions.Height,
    width: dimensions.Width,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },

  heading: {
    width: dimensions.Width / 1.4,
    fontSize: fonts.size.font20,
    fontWeight: fonts.weight.bold,
    textAlign: 'center',
  },

  overlay: {
    padding: 20,
    height: dimensions.Height / 2.4,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
  },
});

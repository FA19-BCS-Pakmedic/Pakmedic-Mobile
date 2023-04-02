import {StyleSheet} from 'react-native';

import colors from '../../../../utils/styles/themes/colors';
import fonts from '../../../../utils/styles/themes/fonts';
import dimensions from '../../../../utils/styles/themes/dimensions';

export const styles = StyleSheet.create({
  container: {
    marginTop: dimensions.Height / 25,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: dimensions.Height / 1.33,
  },
});

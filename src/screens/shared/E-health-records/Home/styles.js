import {StyleSheet} from 'react-native';

import colors from '@/utils/styles/themes/colors';
import fonts from '@/utils/styles/themes/fonts';
import dimensions from '@/utils/styles/themes/dimensions';

export default styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
  },

  section: {
    width: '100%',
    marginVertical: dimensions.Height / 100,
  },
});

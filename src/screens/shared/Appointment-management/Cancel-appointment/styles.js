import {StyleSheet} from 'react-native';

import colors from '../../../../utils/styles/themes/colors';
import fonts from '../../../../utils/styles/themes/fonts';
import dimensions from '../../../../utils/styles/themes/dimensions';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: fonts.size.font20,
    fontWeight: fonts.weight.semi,
  },

  vectorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: dimensions.Height / 20,
  },

  warning: {
    fontSize: fonts.size.font14,
    fontWeight: fonts.weight.semi,
    maxWidth: dimensions.Width / 1.5,
  }

});

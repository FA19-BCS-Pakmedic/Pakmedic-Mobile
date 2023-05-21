import {StyleSheet} from 'react-native';

import colors from '../../../../utils/styles/themes/colors';
import fonts from '../../../../utils/styles/themes/fonts';
import dimensions from '../../../../utils/styles/themes/dimensions';

export const styles = StyleSheet.create({
  flatList: {
    marginTop: dimensions.Height / 50,
    width: dimensions.Width,
    height: dimensions.Height,
  },
  image: {
    resizeMode: 'cover',
    borderRadius: 10,
    borderColor: colors.secondary3,
    borderWidth: 2,
    width: dimensions.Width / 5,
    height: dimensions.Height / 13,
  },
});

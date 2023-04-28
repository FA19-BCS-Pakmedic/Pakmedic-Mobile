import {StyleSheet} from 'react-native';

import colors from '../../../../utils/styles/themes/colors';
import fonts from '../../../../utils/styles/themes/fonts';
import dimensions from '../../../../utils/styles/themes/dimensions';

export const styles = StyleSheet.create({
  container: {
    marginTop: dimensions.Height / 25,
    justifyContent: 'space-between',
    flexDirection: 'column',
    alignItems: 'center',
  },
  fileContainer: {
    justifyContent: 'space-evenly',
    width: dimensions.Width / 1.1,
    height: dimensions.Height / 1.5,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

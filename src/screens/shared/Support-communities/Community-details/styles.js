import {StyleSheet} from 'react-native';

import colors from '../../../../utils/styles/themes/colors';
import fonts from '../../../../utils/styles/themes/fonts';
import dimensions from '../../../../utils/styles/themes/dimensions';

export const styles = StyleSheet.create({
  root: {},

  container: {
    flex: 1,
  },
  dropDownContainer: {
    borderRadius: 10,
    borderWidth: 0,
    backgroundColor: 'white',
  },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: dimensions.Width / 100,
    paddingBottom: dimensions.Height / 50,
  },
  dropDown: {
    minHeight: dimensions.Height / 23,
    width: dimensions.Width / 2.7,
    backgroundColor: colors.secondaryMonoChrome100,
    borderRadius: 10,
    borderColor: colors.secondaryMonoChrome100,
  },
});

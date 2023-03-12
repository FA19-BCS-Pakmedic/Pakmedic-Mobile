import {StyleSheet} from 'react-native';

import colors from '../../../../utils/styles/themes/colors';
import fonts from '../../../../utils/styles/themes/fonts';
import dimensions from '../../../../utils/styles/themes/dimensions';

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    maxHeight: dimensions.Height / 1.25,
  },
  view: {
    alignSelf: 'flex-start',
  },
  autocompleteContainer: {
    padding: 10,
    borderWidth: 2,
    borderColor: colors.primary1,
    borderRadius: 10,
    height: dimensions.Height / 4,
  },
  flatListStyle: {
    maxHeight: 194,
  },
  text: {
    fontSize: fonts.size.font14,
    color: colors.secondaryMonoChrome900,
    fontWeight: fonts.weight.bold,
  },
  text2: {
    fontSize: fonts.size.font12,
    color: colors.secondaryMonoChrome700,
    fontWeight: fonts.weight.semi,
    paddingVertical: 2,
    paddingHorizontal: 10,
  },
  flatListContainerStyle: {
    height: 100,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

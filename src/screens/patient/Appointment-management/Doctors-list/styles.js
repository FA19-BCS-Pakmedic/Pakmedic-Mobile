import {StyleSheet} from 'react-native';

import colors from '@/utils/styles/themes/colors';
import fonts from '@/utils/styles/themes/fonts';
import dimensions from '@/utils/styles/themes/dimensions';

export default styles = StyleSheet.create({
  modalContainer: {
    width: '100%',
    paddingHorizontal: dimensions.Width / 20,
    paddingVertical: dimensions.Height / 100,
  },
  modalHeader: {
    width: '100%',
    textAlign: 'center',
    fontSize: fonts.size.font24,
    fontWeight: fonts.weight.bold,
  },
  itemContainer: {
    height: dimensions.Height / 20,
    borderBottomWidth: 2,
    borderColor: colors.primary1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemText: {
    fontSize: fonts.size.font16,
    fontWeight: fonts.weight.bold,
  },

  iconContainer: {
    transform: [{rotate: '180deg'}],
  },

  scrollContainer: {
    width: '100%',
  },

  content: {
    width: '100%',
    paddingVertical: dimensions.Height / 10,
    position: 'relative',
  },
  notFoundContainer: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: dimensions.Width / 20,
  },
});

import {StyleSheet} from 'react-native';

import colors from '../../../../utils/styles/themes/colors';
import fonts from '../../../../utils/styles/themes/fonts';
import dimensions from '../../../../utils/styles/themes/dimensions';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: dimensions.Width / 100,
    paddingVertical: dimensions.Height / 50,
  },
  dropDown: {
    minHeight: dimensions.Height / 23,
    width: dimensions.Width / 2.7,
    backgroundColor: colors.secondaryLight,
    borderRadius: 10,
    borderColor: colors.secondaryLight,
  },
  dropDownContainer: {
    borderBottomWidth: 0.5,
    borderWidth: 0,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    backgroundColor: 'white',
  },
  line: {
    borderBottomWidth: 3,
    width: dimensions.Width / 7,
    marginLeft: dimensions.Width / 100,
    borderColor: colors.primary1,
  },
  communityContainer: {
    flex: 1,
    paddingVertical: dimensions.Height / 50,
    justifyContent: 'space-evenly',
  },
  joinedCommunity: {
    height: dimensions.Height / 3,
    backgroundColor: colors.secondaryLight,
  },
  otherCommunity: {
    height: dimensions.Height / 3,
    backgroundColor: colors.secondaryLight,
  },
  communityText: {
    fontSize: fonts.size.font16,
    fontWeight: 'bold',
    color: colors.secondary1,
  },
  community: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

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
    paddingBottom: dimensions.Height / 50,
  },
  dropDown: {
    minHeight: dimensions.Height / 23,
    width: dimensions.Width / 2.7,
    backgroundColor: colors.secondaryMonoChrome100,
    borderRadius: 10,
    borderColor: colors.secondaryMonoChrome100,
  },
  dropDownContainer: {
    borderRadius: 10,
    borderWidth: 0,
    backgroundColor: 'white',
  },
  line: {
    borderBottomWidth: 3,
    width: dimensions.Width / 7,
    marginLeft: dimensions.Width / 25,
    borderColor: colors.primary1,
    marginBottom: dimensions.Height / 100,
    marginVertical: dimensions.Height / 100,
  },
  communityContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
    borderRadius: 10,
    backgroundColor: '#F0F8FF',
  },
  joinedCommunity: {
    height: dimensions.Height / 3,
    backgroundColor: colors.secondaryMonoChrome100,
  },
  otherCommunity: {
    height: dimensions.Height / 3,
    backgroundColor: colors.secondaryMonoChrome100,
  },
  communityText: {
    fontSize: fonts.size.font16,
    fontWeight: 'bold',
    color: colors.secondary1,
    marginHorizontal: dimensions.Height / 100,
  },
  community: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1.5,
    marginVertical: dimensions.Width / 50,
    marginHorizontal: dimensions.Width / 30,
    borderColor: colors.primary1,
    borderRadius: 10,
  },
  communitydetail: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: dimensions.Width / 2.5,
    marginHorizontal: dimensions.Width / 50,
    marginVertical: dimensions.Width / 50,
  },
  communityName: {
    fontSize: fonts.size.font16,
    fontWeight: 'bold',
    color: colors.secondary1,
  },
  communityMembers: {
    fontSize: fonts.size.font12,
    color: colors.secondary1,
  },
  communityButton: {
    height: dimensions.Height / 25,
    width: dimensions.Width / 4,
    backgroundColor: colors.primary1,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    margin: dimensions.Width / 50,
  },
  communityButtonText: {
    fontSize: fonts.size.font14,
    color: colors.secondary1,
    fontWeight: 'bold',
  },
});

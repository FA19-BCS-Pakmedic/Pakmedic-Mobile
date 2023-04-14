import {StyleSheet} from 'react-native';

import colors from '../../../../utils/styles/themes/colors';
import fonts from '../../../../utils/styles/themes/fonts';
import dimensions from '../../../../utils/styles/themes/dimensions';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
  },

  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  title: {
    fontSize: fonts.size.font20,
    fontWeight: fonts.weight.semi,
  },
  dates: {
    marginVertical: dimensions.Height / 100,
  },

  times: {
    marginTop: dimensions.Height / 100,
  },

  date: {
    paddingVertical: dimensions.Height / 100,
    paddingHorizontal: dimensions.Width / 30,
    marginHorizontal: dimensions.Height / 100,
    borderRadius: dimensions.Width / 50,
    backgroundColor: colors.primaryMonoChrome300,
  },

  time: {
    paddingVertical: dimensions.Height / 100,
    paddingHorizontal: dimensions.Width / 30,
    marginHorizontal: dimensions.Height / 100,
    borderRadius: dimensions.Width / 50,
    backgroundColor: colors.primaryMonoChrome300,
  },
  text: {
    fontSize: fonts.size.font14,
    fontWeight: fonts.weight.semi,
  },
  subTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subTitle: {
    fontSize: fonts.size.font14,
    fontWeight: fonts.weight.semi,
    color: colors.primary1,
    marginLeft: dimensions.Width / 100,
  },

  dateTimeContainer: {
    marginVertical: dimensions.Height / 80,
  },

  timesContainer: {
    marginVertical: dimensions.Height / 100,
  },

  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

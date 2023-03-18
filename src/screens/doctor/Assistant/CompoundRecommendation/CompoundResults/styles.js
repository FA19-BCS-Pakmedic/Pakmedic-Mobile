import {StyleSheet} from 'react-native';

import colors from '../../../../../utils/styles/themes/colors';
import fonts from '../../../../../utils/styles/themes/fonts';
import dimensions from '../../../../../utils/styles/themes/dimensions';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginBottom: dimensions.Height / 13,
  },
  item: {
    backgroundColor: colors.primaryMonoChrome300,
    borderRadius: 10,
    paddingVertical: dimensions.Height / 50,
    paddingHorizontal: dimensions.Width / 40,
    marginVertical: 8,
  },
  category: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 3,
    color: colors.secondaryMonoChrome1000,
  },
  medicine: {
    fontSize: 16,
    marginBottom: 5,
    marginLeft: 10,
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

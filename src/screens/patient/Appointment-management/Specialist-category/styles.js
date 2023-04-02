import {StyleSheet} from 'react-native';
import colors from '../../../../utils/styles/themes/colors';
import dimensions from '../../../../utils/styles/themes/dimensions';

// import colors from '../../../utils/styles/themes/colors';
// import fonts from '../../../utils/styles/themes/fonts';
// import dimensions from '../../../utils/styles/themes/dimensions';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },

  specialistsContainer: {
    flex: 1,
    width: '100%',
    paddingVertical: dimensions.Height / 50,
  },

  specialistContainer: {
    width: '100%',
    height: dimensions.Height / 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 2,
    borderBottomColor: colors.primary1,
  },

  specialistInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  logoContainer: {
    width: dimensions.Width / 8,
    height: dimensions.Width / 8,
    marginRight: dimensions.Width / 100,
    borderWidth: 1,
    borderColor: colors.primary1,
    borderRadius: dimensions.Width,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    width: dimensions.Width / 12,
    height: dimensions.Width / 12,
  },

  iconContainer: {
    transform: [{rotate: '180deg'}],
  },
});

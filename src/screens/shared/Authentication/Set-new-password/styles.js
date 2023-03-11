import {StyleSheet} from 'react-native';

import colors from '../../../../utils/styles/themes/colors';
import fonts from '../../../../utils/styles/themes/fonts';
import dimensions from '../../../../utils/styles/themes/dimensions';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',

    marginVertical: dimensions.Height / 50,
  },

  textContainer: {
    width: '100%',
    paddingBottom: dimensions.Height / 50,
  },

  text: {
    fontSize: fonts.size.font20,
    fontWeight: fonts.weight.semi,
  },

  fieldsContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: dimensions.Height / 20,
  },

  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
});

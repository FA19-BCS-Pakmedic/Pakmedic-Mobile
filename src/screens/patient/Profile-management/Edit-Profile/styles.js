import {StyleSheet} from 'react-native';

import colors from '../../../../utils/styles/themes/colors';
import dimensions from '../../../../utils/styles/themes/dimensions';
import fonts from '../../../../utils/styles/themes/fonts';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarContainer: {
    position: 'relative',
    width: '100%',
    height: dimensions.Height / 5,
    marginBottom: dimensions.Height / 50,
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatar: {
    width: dimensions.Width / 3,
    height: dimensions.Width / 3,
    borderRadius: dimensions.Width / 5,
    borderWidth: 2,
    borderColor: colors.primaryMonoChrome700,
  },

  iconContainer: {
    position: 'absolute',
    padding: dimensions.Width / 30,
    backgroundColor: colors.accent1,
    borderRadius: dimensions.Width / 20,
    bottom: '5%',
    right: '32%',
  },

  label: {
    fontSize: fonts.size.font14,
    fontWeight: fonts.weight.semi,
  },

  modalContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  headingContainer: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  heading: {
    fontSize: fonts.size.font20,
    fontWeight: fonts.weight.bold,
  },

  optionContainer: {
    width: '100%',
    flex: 1,
  },

  option: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  optionText: {
    fontSize: fonts.size.font16,
    fontWeight: fonts.weight.semi,
  },
});

export default styles;

import {StyleSheet} from 'react-native';

import colors from '../../../utils/styles/themes/colors';
import fonts from '../../../utils/styles/themes/fonts';
import dimensions from '../../../utils/styles/themes/dimensions';

export const styles = StyleSheet.create({
  flex: {
    flexDirection: 'row',
    alignItems: 'center',

    borderWidth: 2,
    borderColor: colors.primary1,
    borderRadius: 20,
    width: dimensions.Width / 1.1,
    height: dimensions.Height / 9,
    marginBottom: dimensions.Height / 50,
    paddingHorizontal: dimensions.Width / 100,
    scaleY: -1,
  },
  flexVertical: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  text: {
    fontSize: fonts.size.font16,
    fontWeight: 'bold',
    color: colors.secondary1,
    maxWidth: dimensions.Width / 1.5,
    //width: dimensions.Width / 1.075,
  },
  text2: {
    fontSize: fonts.size.font14,
    color: colors.secondary1,
    maxwidth: dimensions.Width / 1.6,
  },
  flatList: {
    marginTop: dimensions.Height / 50,
    width: dimensions.Width,
    height: dimensions.Height,
  },
  image: {
    resizeMode: 'cover',
    borderRadius: 10,
    borderColor: colors.secondary3,
    borderWidth: 2,
    width: dimensions.Width / 5,
    height: dimensions.Height / 13,
  },

  notFoundContainer: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  notFoundContainer: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
});

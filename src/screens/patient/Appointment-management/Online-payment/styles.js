import {StyleSheet} from 'react-native';
import colors from '../../../../utils/styles/themes/colors';
import dimensions from '../../../../utils/styles/themes/dimensions';
import fonts from '../../../../utils/styles/themes/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
  },

  controls: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  contentContainer: {
    flex: 0.7,
    width: '100%',
    justifyContent: 'flex-end',
    backgroundColor: colors.primaryMonoChrome100,
    // borderTopLeftRadius: dimensions.Width / 10,
    // borderTopRightRadius: dimensions.Width / 10,
    paddingHorizontal: dimensions.Width / 15,
    position: 'relative',
  },

  card: {
    width: '100%',
    top: -(dimensions.Height / 6),
    left: dimensions.Width / 15,

    height: dimensions.Height / 4,
    position: 'absolute',
    borderRadius: dimensions.Width / 20,
    paddingHorizontal: dimensions.Width / 10,
    paddingVertical: dimensions.Height / 40,
    elevation: 4,
  },

  highlightTextContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: dimensions.Height / 50,
    alignItems: 'flex-end',
    // borderWidth: 1,
    height: dimensions.Height / 15,
  },

  name: {
    fontWeight: fonts.weight.bold,
    fontSize: fonts.size.font24,
    maxWidth: dimensions.Width / 1.3,
  },

  expDate: {
    fontWeight: fonts.weight.bold,
    fontSize: fonts.size.font20,
  },

  cardNumberContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: dimensions.Height / 20,
  },

  text: {
    fontWeight: fonts.weight.bold,
    fontSize: fonts.size.font18,
  },
});

export default styles;

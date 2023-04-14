import {StyleSheet} from 'react-native';
import colors from '../../../../utils/styles/themes/colors';
import dimensions from '../../../../utils/styles/themes/dimensions';
import fonts from '../../../../utils/styles/themes/fonts';

const styles = StyleSheet.create({
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

  errorText: {
    fontSize: fonts.size.font12,
    fontWeight: fonts.weight.semi,
    color: colors.invalid,
  },

  subTitle: {
    fontSize: fonts.size.font14,
    fontWeight: fonts.weight.semi,
    color: colors.primary1,
    marginLeft: dimensions.Width / 100,
  },
  subTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  dateTimeContainer: {
    marginVertical: dimensions.Height / 80,
  },

  timesContainer: {
    marginVertical: dimensions.Height / 100,
  },

  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  checkbox: {
    marginRight: dimensions.Width / 50,
    width: dimensions.Width / 15,
    height: dimensions.Width / 15,
    justifyContent: 'center',
    alignItems: 'center',
  },

  terms: {
    fontSize: fonts.size.font14,
    fontWeight: fonts.weight.semi,
  },
  control: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  // modal styling
  modalContainer: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
  },

  textContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  heading: {
    fontSize: fonts.size.font24,
    fontWeight: fonts.weight.bold,
    maxWidth: dimensions.Width / 1.5,
  },

  subHeading: {
    fontSize: fonts.size.font16,
    fontWeight: fonts.weight.semi,
    maxWidth: dimensions.Width / 1.5,
    color: colors.secondary2,
    textAlign: 'center',
    marginTop: dimensions.Height / 90,
  },

  controls: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  modalControl: {
    width: '100%',
    height: dimensions.Height / 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: dimensions.Height / 20,
  },

  option: {
    width: dimensions.Width / 1.2,
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    backgroundColor: colors.white,
    borderWidth: 3,
    borderColor: colors.primary1,

    borderRadius: dimensions.Width / 50,
  },

  optionText: {
    // color: colors.white,
    fontSize: fonts.size.font20,
    fontWeight: fonts.weight.semi,
    marginLeft: dimensions.Width / 50,
  },

  imagesContainer: {
    position: 'absolute',
    left: dimensions.Width / 50,
    width: dimensions.Width / 20,
    borderWidth: 1,
  },
});

export default styles;

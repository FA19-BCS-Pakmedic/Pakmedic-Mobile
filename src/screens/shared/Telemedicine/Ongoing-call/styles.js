import {StyleSheet} from 'react-native';
import colors from '../../../../utils/styles/themes/colors';
import dimensions from '../../../../utils/styles/themes/dimensions';
import fonts from '../../../../utils/styles/themes/fonts';
import COLOR from './Color';

// export default StyleSheet.create({
//   safearea: {
//     flex: 1,
//     backgroundColor: COLOR.WHITE,
//   },
//   container: {
//     flex: 1,
//     width: '100%',
//     position: 'relative',
//   },

//   videoPanel: {
//     flex: 1,
//     width: '100%',
//     position: 'absolute',
//   },

//   remotevideo: {
//     flex: 1,
//     width: '100%',
//     position: 'relative',
//   },

//   selfview: {
//     position: 'absolute',
//     width: dimensions.Width / 4,
//     height: dimensions.Width / 4,
//     right: dimensions.Width / 20,
//     top: dimensions.Height / 20,
//     borderRadius: dimensions.Width / 30,
//     borderWidth: 2,
//     borderColor: colors.secondary1,
//   },

//   outgoingPanel: {
//     position: 'absolute',
//     width: '100%',
//     justifyContent: 'center',
//     alignItems: 'center',
//     top: dimensions.Height / 3,
//   },

//   userName: {
//     fontSize: fonts.size.font24,
//     fontWeight: fonts.weight.bold,
//     marginBottom: dimensions.Height / 100,
//   },

//   state: {
//     fontSize: fonts.size.font16,
//     fontWeight: fonts.weight.semi,
//     color: colors.accent1,
//   },

//   callControlsVideo: {
//     position: 'absolute',
//     flexDirection: 'row',
//     width: '100%',
//     top: dimensions.Height / 1.2,
//     justifyContent: 'space-around',
//     alignItems: 'center',
//   },

//   button: {
//     width: dimensions.Width / 6,
//     height: dimensions.Width / 6,
//     backgroundColor: colors.invalid,
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: dimensions.Width,
//   },

//   featureBtn: {
//     width: dimensions.Width / 8,
//     height: dimensions.Width / 8,
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: dimensions.Width,
//     backgroundColor: colors.primaryMonoChrome300,
//   },
// });

export default StyleSheet.create({
  safearea: {
    flex: 1,
    backgroundColor: colors.primaryMonoChrome100,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    paddingHorizontal: 20,
  },

  outgoingPanel: {
    position: 'absolute',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    top: dimensions.Height / 3,
  },

  userName: {
    fontSize: fonts.size.font24,
    fontWeight: fonts.weight.bold,
    marginBottom: dimensions.Height / 100,
  },

  state: {
    fontSize: fonts.size.font16,
    fontWeight: fonts.weight.semi,
    color: colors.accent1,
  },

  callControlsVideo: {
    position: 'absolute',
    flexDirection: 'row',
    width: '100%',
    top: dimensions.Height / 1.17,
    paddingVertical: dimensions.Height / 100,
    backgroundColor: colors.primaryMonoChrome100,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopEndRadius: dimensions.Width / 10,
    borderTopStartRadius: dimensions.Width / 10,
  },

  featureBtn: {
    width: dimensions.Width / 8,
    height: dimensions.Width / 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: dimensions.Width,
    backgroundColor: colors.primaryMonoChrome300,
  },

  button: {
    width: dimensions.Width / 6,
    height: dimensions.Width / 6,
    backgroundColor: colors.invalid,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: dimensions.Width,
  },
  selfview: {
    position: 'absolute',
    right: dimensions.Width / 20,
    top: dimensions.Width / 20,
    width: 100,
    height: 120,
  },
  remotevideo: {
    flex: 1,
  },
  videoPanel: {
    flex: 1,
    position: 'relative',
  },
});

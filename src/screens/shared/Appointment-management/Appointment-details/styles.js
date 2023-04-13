import {StyleSheet} from 'react-native';
import colors from '../../../../utils/styles/themes/colors';
import dimensions from '../../../../utils/styles/themes/dimensions';
import fonts from '../../../../utils/styles/themes/fonts';

const styles = StyleSheet.create({
  mapContainer: {
    // ...StyleSheet.absoluteFillObject,
    height: 200,
    width: dimensions.Width / 1.2,
    borderRadius: dimensions.Width / 2,

    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    zIndex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    position: 'absolute',
    zIndex: -1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    // position: 'absolute',
    background: '#000',
    zIndex: 999,
    opacity: 0.5,
  },

  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  appointmentInfoContainer: {
    width: '100%',
    flex: 1,
  },

  profileCard: {
    width: '100%',
    borderWidth: 1,
    borderColor: colors.primary1,
    borderRadius: 10,
    padding: dimensions.Width / 20,
    flexDirection: 'row',
    alignItems: 'center',
  },

  info: {
    marginLeft: dimensions.Width / 20,
  },

  name: {
    fontSize: fonts.size.font24,
    fontWeight: fonts.weight.semi,
  },

  appointmentInfo: {
    marginTop: dimensions.Height / 20,
  },

  heading: {
    fontSize: fonts.size.font20,
    fontWeight: fonts.weight.bold,
  },

  appointmentInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: dimensions.Height / 50,
  },

  appointmentInfoText: {
    fontSize: fonts.size.font14,
    fontWeight: fonts.weight.semi,
    marginLeft: dimensions.Width / 100,
  },

  iconContainer: {
    width: dimensions.Width / 10,
    height: dimensions.Width / 10,
    borderRadius: dimensions.Width / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },

  controls: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  text: {
    fontSize: fonts.size.font16,
    fontWeight: fonts.weight.semi,
  },
});

export default styles;

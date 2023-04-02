import {StyleSheet} from 'react-native';

import colors from '../../../../utils/styles/themes/colors';
import fonts from '../../../../utils/styles/themes/fonts';
import dimensions from '../../../../utils/styles/themes/dimensions';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
  },

  filterSearchContainer: {
    width: '100%',
  },

  scrollContainer: {
    width: '100%',
    flex: 1,
  },

  scrollContainerContent: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: dimensions.Width / 20,
  },

  appointmentsContainer: {
    width: '100%',
    paddingVertical: dimensions.Height / 100,
    marginBottom: dimensions.Height / 13,
  },

  appointmentContainer: {
    width: '100%',
    paddingVertical: dimensions.Height / 100,
  },
});

export default styles;

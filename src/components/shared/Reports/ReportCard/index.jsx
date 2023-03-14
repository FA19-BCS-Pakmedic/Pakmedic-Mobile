import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import dimensions from '../../../../utils/styles/themes/dimensions';
import colors from '../../../../utils/styles/themes/colors';
import fonts from '../../../../utils/styles/themes/colors';

const ReportCard = ({report, onPressViewReport, setSelectedReport}) => {
  return (
    <View>
      <Text>ReportCard</Text>
    </View>
  );
};

export default ReportCard;

const styles = StyleSheet.create({
  container: {
    width: dimensions.Width / 2.4,
    height: dimensions.Height / 3.2,
    borderWidth: 1,
    borderColor: colors.primary1,
    borderRadius: dimensions.Width / 30,
  },
  imageContainer: {
    width: '100%',
    height: dimensions.Height / 6.5,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    borderTopRightRadius: dimensions.Width / 30,
    borderTopLeftRadius: dimensions.Width / 30,
  },
  overlay: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: colors.black,
    opacity: 0.4,
    borderTopRightRadius: dimensions.Width / 30,
    borderTopLeftRadius: dimensions.Width / 30,
  },
  infoContainer: {
    width: '100%',
    paddingHorizontal: dimensions.Width / 30,
    paddingVertical: dimensions.Height / 100,
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: dimensions.Height / 500,
  },
  control: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});

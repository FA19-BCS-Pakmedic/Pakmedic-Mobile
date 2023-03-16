import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import Button from '../../../../components/shared/Button';

import dimensions from '../../../../utils/styles/themes/dimensions';
import colors from '../../../../utils/styles/themes/colors';
import fonts from '../../../../utils/styles/themes/fonts';

import Icon from '../../../../assets/svgs/ReportIcon.svg';

import {getDate} from '@/utils/helpers/getDate';

const ReportCard = ({report, setOpenOptions, setSelectedReport}) => {
  return (
    <View style={styles().container}>
      <View style={styles().iconContainer}>
        <Icon width={dimensions.Width / 10} height={dimensions.Width / 10} />
      </View>
      <View style={styles().infoContainer}>
        <View style={styles().info}>
          <Text style={styles().label}>Title</Text>
          <Text style={styles().value}>
            {report ? report?.title : 'Bone marrow scan'}
          </Text>
        </View>

        <View style={styles().info}>
          <Text style={styles().label}>Symptom</Text>
          <Text style={styles().value}>
            {report
              ? `${report?.symptoms.slice(0, 13)}${
                  report?.symptoms.length > 13 ? '...' : ''
                }`
              : 'Sneeze'}
          </Text>
        </View>

        <View style={styles().info}>
          <Text style={styles().label}>Test Lab</Text>
          <Text style={styles().value}>
            {report ? report?.lab : 'Chughtai Lab'}
          </Text>
        </View>

        <View style={styles().info}>
          <Text style={styles().label}>Date</Text>
          <Text style={styles().value}>
            {report ? getDate(report?.date) : '12/12/2022'}
          </Text>
        </View>
      </View>
      <View style={styles().control}>
        <Button
          height={dimensions.Height / 20}
          width={dimensions.Width / 2.6}
          label="More options"
          type="filled"
          onPress={() => {
            setSelectedReport(report);
            setOpenOptions(true);
          }}
        />
      </View>
    </View>
  );
};

export default ReportCard;

const styles = () =>
  StyleSheet.create({
    container: {
      width: dimensions.Width / 2.3,
      height: dimensions.Height / 3.2,
      borderWidth: 1,
      borderColor: colors.primary1,
      borderRadius: dimensions.Width / 30,
    },
    iconContainer: {
      width: dimensions.Width / 6,
      height: dimensions.Width / 6,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      marginVertical: dimensions.Height / 80,
      borderWidth: 1,
      borderColor: colors.primary1,
      borderRadius: dimensions.Width,
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

    label: {
      fontWeight: fonts.weight.semi,
    },

    value: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  });

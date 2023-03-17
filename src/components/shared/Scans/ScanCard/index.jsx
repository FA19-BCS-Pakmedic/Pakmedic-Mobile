import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

import dimensions from '@/utils/styles/themes/dimensions';
import colors from '@/utils/styles/themes/colors';

import Button from '../../../../components/shared/Button';

import {getDate} from '@/utils/helpers/getDate';
import fonts from '../../../../utils/styles/themes/fonts';
import {apiEndpoint} from '../../../../utils/constants/APIendpoint';

const ScanCard = ({scan, setOpenOptions, setSelectedScan}) => {
  const imageURI = `${apiEndpoint}/files/${scan.image}`; //TODO: replace the link with a variable that fetches images from the backend

  return (
    <View style={styles().container}>
      <View style={styles().imageContainer}>
        <Image
          source={{
            uri: imageURI,
          }}
          // style={}
          style={[styles().image, {width: '100%', height: '100%'}]}
        />
        <View style={styles().overlay}></View>
      </View>
      <View style={styles().infoContainer}>
        <View style={styles().info}>
          <Text style={styles().label}>Date</Text>
          <Text style={styles().value}>
            {scan ? getDate(scan?.date) : '12/12/2022'}
          </Text>
        </View>
        <View style={styles().info}>
          <Text style={styles().label}>Title</Text>
          <Text style={styles().value}>
            {scan ? scan?.title : 'Bone marrow scan'}
          </Text>
        </View>
      </View>
      <View style={styles().control}>
        <Button
          height={dimensions.Height / 20}
          width={dimensions.Width / 3}
          label="More options"
          type="filled"
          onPress={() => {
            setSelectedScan(scan);
            setOpenOptions(true);
          }}
        />
      </View>
    </View>
  );
};

export default ScanCard;

const styles = () =>
  StyleSheet.create({
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

    label: {
      fontWeight: fonts.weight.semi,
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

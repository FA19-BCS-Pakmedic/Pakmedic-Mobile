import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import Button from '../../../shared/Button';

import dimensions from '../../../../utils/styles/themes/dimensions';
import colors from '../../../../utils/styles/themes/colors';
import fonts from '../../../../utils/styles/themes/fonts';
import ConfirmationAlert from '../../../shared/ConfirmationAlert';

export default function GeneticCard({disease, onEdit, onDelete, index, isViewing}) {
  const [visible, setVisible] = useState(false);

  const openConfirmationalModal = () => {
    return (
      <ConfirmationAlert
        alertText={'Are you sure you want to delete this service?'}
        cancelControl={{
          width: dimensions.Width / 3,
          onPress: () => {
            setVisible(false);
          },
        }}
        confirmControl={{
          width: dimensions.Width / 3,
          onPress: () => {
            onDelete(index);
            setVisible(false);
          },
        }}
        height={dimensions.Height / 5}
        width={dimensions.Width / 1.2}
        isModalVisible={visible}
        setModalVisible={setVisible}
        type="center"
      />
    );
  };

  return (
    <View style={styles().container}>
      {openConfirmationalModal()}
      <Text style={styles().label}>{disease}</Text>
      {!isViewing && 
      <View style={styles().controls}>
        <Button
          type={'outlined'}
          label={'Edit'}
          width={dimensions.Width / 4}
          height={dimensions.Height / 20}
          borderColor={colors.primary1}
          onPress={() => {
            onEdit(index);
          }}
        />
        <Button
          type={'filled'}
          label={'Delete'}
          width={dimensions.Width / 4}
          height={dimensions.Height / 20}
          borderColor={colors.primary1}
          onPress={() => {
            setVisible(true);
          }}
        />
      </View>}
    </View>
  );
}

const styles = () =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: dimensions.Height / 300,
      paddingHorizontal: dimensions.Width / 50,
      marginBottom: dimensions.Height / 50,
      backgroundColor: colors.primaryMonoChrome100,
      borderRadius: dimensions.Height / 100,
      minHeight: dimensions.Height / 11,
    },

    label: {
      maxWidth: '35%',
      width: '35%',
      fontSize: fonts.size.font14,
      fontWeight: fonts.weight.semi,
    },

    controls: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 0,
      width: '60%',
    },
  });

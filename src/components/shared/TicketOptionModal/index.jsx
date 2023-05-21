import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

import ModalContainer from '../../../containers/ModalContainer';

import dimensions from '../../../utils/styles/themes/dimensions';
import colors from '../../../utils/styles/themes/colors';
import fonts from '../../../utils/styles/themes/fonts';

import {useNavigation} from '@react-navigation/native';

import {deleteComplaint} from '../../../services/complaintServices';

const TicketOptionModal = props => {
  const {Visible, setModalVisible, navigation, item, onEdit} = props;
  //console.log(item);
  return (
    <ModalContainer
      isModalVisible={Visible}
      setModalVisible={setModalVisible}
      height={
        item?.status === 'Pending'
          ? dimensions.Height / 3.5
          : dimensions.Height / 5
      }
      width={dimensions.Width}
      borderColor={colors.primary1}
      type="bottom"
      backDropOpacity={0.5}
      padding={dimensions.Height * 0.035}
      bgColor={colors.white}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate('Complaint', {data: item._id});
            setModalVisible(false);
          }}>
          <Text style={styles.text}>View Details</Text>
        </TouchableOpacity>
        <View style={styles.line} />
        {item?.status === 'Pending' && (
          <>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setModalVisible(false);
                onEdit(true);
              }}>
              <Text style={styles.text}>Edit</Text>
            </TouchableOpacity>

            <View style={styles.line} />
          </>
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (item.status === 'Pending') {
              deleteComplaint(item._id);
            } else {
              alert('You can not delete this complaint');
            }
            setModalVisible(false);
          }}>
          <Text style={styles.text}>Delete</Text>
        </TouchableOpacity>
      </View>
    </ModalContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    //backgroundColor: colors.secondaryMonoChrome100,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: colors.primary1,
  },
  text: {
    fontSize: fonts.size.font16,
    color: colors.secondary1,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  line: {
    width: dimensions.Width,
    height: dimensions.Height * 0.0025,
    backgroundColor: colors.primary1,
  },
});

export default TicketOptionModal;

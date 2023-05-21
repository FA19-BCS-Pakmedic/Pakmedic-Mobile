import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';

import OptionsIcon from '../../../../assets/svgs/Options.svg';

import colors from '../../../../utils/styles/themes/colors';
import dimensions from '../../../../utils/styles/themes/dimensions';
import fonts from '../../../../utils/styles/themes/fonts';

import {getDate} from '../../../../utils/helpers/getDate';
import MenuDropDown from '../../../shared/MenuDropdown';
import ConfirmationAlert from '../../../shared/ConfirmationAlert';

const ExperienceCard = ({experience, onEdit, onDelete, isViewing}) => {
  const [visible, setVisible] = useState(false);

  const menuDropDownOptions = [
    {text: 'Edit', onSelect: () => onEdit(experience._id)},
    {text: 'Delete', onSelect: () => setVisible(true)},
  ];

  const openConfirmationalModal = () => {
    return (
      <ConfirmationAlert
        alertText={'Are you sure you want to delete this experience?'}
        cancelControl={{
          width: dimensions.Width / 3,
          onPress: () => {
            setVisible(false);
          },
        }}
        confirmControl={{
          width: dimensions.Width / 3,
          onPress: () => {
            onDelete(experience._id);
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
      <View style={styles().headerContainer}>
        <Text style={styles().headerText}>{experience.title}</Text>
        
        {!isViewing && <MenuDropDown options={menuDropDownOptions}>
          <View style={styles().optionsIconContainer}>
            <OptionsIcon />
          </View>
        </MenuDropDown>}
      </View>

      <View style={styles().contentContainer}>
        <Text style={styles().text}>
          {`${experience.hospital.name}, (${experience.hospital.address.address}, ${experience.hospital.address.city})`}
        </Text>
        <Text style={styles().subText}>{`${getDate(experience.from)}-${getDate(
          experience.to,
        )}`}</Text>
      </View>
    </View>
  );
};

export default ExperienceCard;

const styles = () =>
  StyleSheet.create({
    container: {
      borderRadius: dimensions.Width / 50,
      padding: dimensions.Width / 20,
      marginBottom: dimensions.Height / 40,
      borderWidth: 2,
      borderColor: colors.primary1,
    },

    optionsIconContainer: {
      height: dimensions.Width / 10,
      width: dimensions.Width / 10,
      justifyContent: 'center',
      alignItems: 'center',
    },

    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },

    headerText: {
      fontSize: fonts.size.font24,
      fontWeight: fonts.weight.bold,
    },

    contentContainer: {
      marginTop: dimensions.Height / 50,
    },

    text: {
      fontSize: fonts.size.font16,
      fontWeight: fonts.weight.regular,
    },
    subText: {
      fontSize: fonts.size.font14,
      fontWeight: fonts.weight.semi,
      color: colors.secondary2,
    },
  });

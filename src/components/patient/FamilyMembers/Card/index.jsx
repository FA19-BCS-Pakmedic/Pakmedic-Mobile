import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import SonIcon from '../../../../assets/svgs/son-icon.svg';
import DaughterIcon from '../../../../assets/svgs/daughter-icon.svg';
import Button from '../../../shared/Button';
import dimensions from '../../../../utils/styles/themes/dimensions';
import colors from '../../../../utils/styles/themes/colors';

const FamilyMemberCard = ({
  familyMember,
  setOpenOptions,
  setSelectedMember,
}) => {
  const icons = {
    Son: <SonIcon />,
    Daughter: <DaughterIcon />,
  };

  return (
    <View style={styles.container}>
      <View>{icons[familyMember.relation]}</View>
      <View style={styles.infoContainer}>
        <View style={styles.info}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>
            {familyMember ? familyMember.name : 'N/A'}
          </Text>
        </View>

        <View style={styles.info}>
          <Text style={styles.label}>Age:</Text>
          <Text style={styles.value}>
            {familyMember ? familyMember.age : 'N/A'} years
          </Text>
        </View>

        <View style={styles.info}>
          <Text style={styles.label}>Blood group:</Text>
          <Text style={styles.value}>
            {familyMember ? familyMember.bio.bloodGroup : 'N/A'}
          </Text>
        </View>

        <View style={styles.info}>
          <Text style={styles.label}>Weight:</Text>
          <Text style={styles.value}>
            {familyMember ? familyMember.bio.weight : 'N/A'} KG
          </Text>
        </View>

        <View style={styles.info}>
          <Text style={styles.label}>Height:</Text>
          <Text style={styles.value}>
            {familyMember ? familyMember.bio.height : 'N/A'} CM
          </Text>
        </View>
      </View>

      <Button
        height={dimensions.Height / 20}
        width={dimensions.Width / 3}
        label="More options"
        type="filled"
        onPress={() => {
          setSelectedMember(familyMember);
          setOpenOptions(true);
        }}
      />
    </View>
  );
};

export default FamilyMemberCard;

const styles = StyleSheet.create({
  container: {
    width: dimensions.Width / 2.2,
    alignItems: 'center',
    backgroundColor: colors.primaryMonoChrome100,
    paddingTop: dimensions.Height / 100,
    paddingHorizontal: dimensions.Width / 50,
    borderRadius: dimensions.Width / 30,
  },

  infoContainer: {
    width: '100%',
  },

  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: dimensions.Height / 100,
  },
});

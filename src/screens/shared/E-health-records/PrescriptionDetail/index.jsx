import {View, Text, StyleSheet, FlatList, Image} from 'react-native';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';

import dimensions from '../../../../utils/styles/themes/dimensions';
import fonts from '../../../../utils/styles/themes/fonts';
import colors from '../../../../utils/styles/themes/colors';
//import {styles} from './styles';

import Tablet from '../../../../assets/svgs/tabletIcon.svg';
import Capsule from '../../../../assets/svgs/capsuleIcon.svg';
import Syringe from '../../../../assets/svgs/syringeIcon.svg';
import Syrup from '../../../../assets/svgs/syrupIcon.svg';

import StaticContainer from '../../../../containers/StaticContainer';
import Button from '../../../../components/shared/Button';

import {useNavigation} from '@react-navigation/native';

const PrescriptionDetail = props => {
  const navigation = useNavigation();
  const [items, setItems] = useState(props.route.params.item.medicines);
  const doctor = props.route.params.item.doctor;

  return (
    <StaticContainer
      customHeaderEnable
      customHeaderName="Prescription Detail"
      isBack
      isHorizontalPadding={false}>
      <View style={styles.container}>
        <View style={styles.complaineeContainer}>
          <Text style={styles.Heading}>Prescribed by:</Text>
          <View style={styles.complaineeCard}>
            <View style={styles.cardLeft}>
              <View style={styles.detailLeft}>
                <Image
                  style={styles.img}
                  source={require('../../../../assets/images/default-avatar.png')}
                />
              </View>
              <View style={styles.detailRight}>
                <Text style={styles.text}>{doctor.name}</Text>
                <Text style={styles.text}>{doctor.phone}</Text>
              </View>
            </View>
            <View style={styles.cardRight}>
              <Button
                label={'View Profile'}
                type={'filled'}
                width={dimensions.Width * 0.3}
                height={dimensions.Height * 0.04}
                fontSize={fonts.size.font12}
                color={colors.primary1}
                onPress={() => {}}
              />
            </View>
          </View>
        </View>
        <View style={styles.body}>
          <FlatList
            data={items}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => {
              return (
                <View style={styles.itemContainer}>
                  <View style={styles.icon}>
                    {item.dosage_form === 'tablet' && <Tablet />}
                    {item.dosage_form === 'capsule' && <Capsule />}
                    {item.dosage_form === 'syringe' && <Syringe />}
                    {item.dosage_form === 'Syrup' && <Syrup />}
                  </View>

                  <View style={styles.itemBody}>
                    <View style={styles.itemHeader}>
                      <Text style={styles.itemHeading}>{item.name}</Text>
                    </View>

                    <View style={styles.itemRow}>
                      <Text style={styles.itemTitle}>Dosage Size:</Text>
                      <Text style={styles.itemText}>
                        {item.dosage_size} mg/ml
                      </Text>
                    </View>
                    <View style={styles.itemRow}>
                      <Text style={styles.itemTitle}>Dosage Frequency:</Text>
                      <Text style={styles.itemText}>
                        {item.dosage_frequency} times a day
                      </Text>
                    </View>
                    <View style={styles.itemRow}>
                      <Text style={styles.itemTitle}>Dosage Duration:</Text>
                      <Text style={styles.itemText}>{item.days} days</Text>
                    </View>
                    {item.addDays > 0 && (
                      <View style={styles.itemRow}>
                        <Text style={styles.itemTitle}>Additional Days:</Text>
                        <Text style={styles.itemText}>
                          {item.additional_days} days
                        </Text>
                      </View>
                    )}
                    <View style={styles.itemRow}>
                      <Text style={styles.itemTitle}>Details:</Text>
                      <Text
                        style={[
                          styles.itemText,
                          {
                            maxWidth: dimensions.Width * 0.5,
                            textAlign: 'right',
                          },
                        ]}>
                        {item.precautionary_details}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            }}
          />
        </View>
      </View>
    </StaticContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  complaineeContainer: {
    marginVertical: dimensions.Height * 0.01,
  },
  Heading: {
    marginLeft: dimensions.Width * 0.03,
    fontSize: fonts.size.font16,
    fontWeight: 'bold',
    color: colors.secondary1,
    maxWidth: dimensions.Width * 0.5,
    marginBottom: dimensions.Height * 0.01,
  },
  complaineeCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: dimensions.Width * 0.95,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: colors.primary1,
    padding: dimensions.Width * 0.02,
    borderRadius: 10,
  },

  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailLeft: {
    marginRight: dimensions.Width * 0.02,
  },
  detailRight: {
    alignItems: 'flex-start',
  },
  img: {
    width: dimensions.Width * 0.1,
    height: dimensions.Width * 0.1,
    borderRadius: 100,
  },

  body: {
    height: dimensions.Height * 0.66,
    marginHorizontal: dimensions.Width * 0.03,
    marginTop: dimensions.Height * 0.02,
    borderRadius: dimensions.Width * 0.02,
    borderWidth: 1,
    borderColor: colors.primary1,
  },
  itemContainer: {
    flexDirection: 'row',
    //justifyContent: 'space-between',
    //alignItems: 'center',
    height: dimensions.Height * 0.18,

    paddingVertical: dimensions.Height * 0.01,
    backgroundColor: colors.primaryMonoChrome100,
    borderRadius: dimensions.Width * 0.02,
    margin: dimensions.Height * 0.01,
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: dimensions.Width * 0.02,
  },
  itemHeader: {
    paddingVertical: dimensions.Width * 0.01,
  },

  itemHeading: {
    alignSelf: 'center',
    //underline
    textDecorationLine: 'underline',
    textDecorationColor: colors.primary1,
    //marginLeft: dimensions.Width * 0.01,
    fontSize: fonts.size.font18,
    fontWeight: fonts.weight.bold,
  },

  itemBody: {
    width: dimensions.Width * 0.65,
    paddingHorizontal: dimensions.Width * 0.015,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: dimensions.Width * 0.005,
  },
  itemText: {
    fontSize: fonts.size.font12,
  },
  itemTitle: {
    fontSize: fonts.size.font12,
    fontWeight: fonts.weight.bold,
  },
});

export default PrescriptionDetail;

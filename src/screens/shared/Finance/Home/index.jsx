import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

import StaticContainer from '../../../../containers/StaticContainer';

import dimensions from '../../../../utils/styles/themes/dimensions';
import colors from '../../../../utils/styles/themes/colors';
import fonts from '../../../../utils/styles/themes/fonts';

import Options from '../../../../assets/svgs/Options.svg';

//import {styles} from './styles';

const Home = () => {
  const data = [
    {
      id: 1,
      name: 'John Doe',
      amount: 'PKR 100,000',
      date: '12-12-2020',
    },
    {
      id: 2,
      name: 'John Doe',
      amount: 'PKR 100,000',
      date: '12-12-2020',
    },
    {
      id: 3,
      name: 'John Doe',
      amount: 'PKR 100,000',

      date: '12-12-2020',
    },
    {
      id: 4,
      name: 'John Doe',
      amount: 'PKR 100,000',
      date: '12-12-2020',
    },
  ];
  return (
    <StaticContainer isBack customHeaderEnable isHorizontalPadding>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Good Day,</Text>
          <Text style={styles.Text}>John Doe</Text>
        </View>
        <View style={styles.cardContainer}>
          <View style={styles.cardRow}>
            <View style={styles.cardItem}>
              <Text style={styles.cardTitleText}>Total Balance</Text>
              <Text style={styles.cardItemText}>PKR 100,000</Text>
            </View>
            <View style={styles.cardItem}>
              <TouchableOpacity>
                <Options
                  width={dimensions.Width * 0.05}
                  height={dimensions.Width * 0.05}
                  style={{transform: [{rotate: '90deg'}]}}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.cardRow}>
            <View style={styles.cardItem}>
              <Text style={styles.cardTitleText}>Earned this month</Text>
              <Text style={styles.cardItemText}>PKR 19,000</Text>
            </View>
            <View style={styles.cardItem}>
              <Text style={styles.cardTitleText}>Average Earning</Text>
              <Text style={styles.cardItemText}>PKR 12,000</Text>
            </View>
          </View>
        </View>
        <View style={styles.historyContainer}>
          <Text style={styles.histText}>Transaction History</Text>
          <FlatList
            data={data}
            renderItem={({item}) => (
              <View style={styles.historyItem}>
                <View style={styles.historyItemRow}>
                  <View style={styles.imgContainer}>
                    <Image
                      source={require('../../../../assets/images/default-avatar.png')}
                      style={styles.Image}
                    />
                  </View>
                  <View style={styles.historyDetails}>
                    <Text style={styles.historyItemName}>{item.name}</Text>
                    <Text style={styles.historyItemDate}>{item.date}</Text>
                  </View>
                </View>
                <View style={styles.historyItemRow}>
                  <Text style={styles.historyItemValue}>{item.amount}</Text>
                </View>
              </View>
            )}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
    </StaticContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginLeft: dimensions.Height * 0.02,
  },
  headerText: {
    fontSize: fonts.size.font20,
    fontWeight: fonts.weight.bold,
    color: colors.secondary1,
  },
  Text: {
    marginLeft: dimensions.Height * 0.02,
    fontSize: fonts.size.font18,
    //fontWeight: fonts.weight.semi,
    color: colors.secondary1,
  },
  cardContainer: {
    marginTop: dimensions.Height * 0.02,
    paddingHorizontal: dimensions.Width * 0.05,
    paddingVertical: dimensions.Height * 0.01,
    borderWidth: 1,
    borderColor: colors.primary1,
    borderRadius: 10,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: dimensions.Height * 0.01,
  },
  cardItem: {},

  cardTitleText: {
    fontSize: fonts.size.font16,
    fontWeight: fonts.weight.semi,
    color: colors.secondary1,
  },
  cardItemText: {
    fontSize: fonts.size.font18,
    fontWeight: fonts.weight.bold,
    color: colors.primary1,
  },
  historyContainer: {
    marginTop: dimensions.Height * 0.02,
    height: dimensions.Height * 0.55,
  },
  historyItem: {
    borderColor: colors.primary1,
    paddingVertical: dimensions.Height * 0.01,
    borderWidth: 1,
    backgroundColor: colors.white,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: dimensions.Width * 0.02,
    marginBottom: dimensions.Height * 0.01,
  },
  historyItemRow: {
    //borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    //marginBottom: dimensions.Height * 0.02,
  },
  historyDetails: {
    //borderWidth: 1,
    marginLeft: dimensions.Width * 0.03,
  },
  histText: {
    //borderWidth: 1,
    marginBottom: dimensions.Height * 0.02,
    fontSize: fonts.size.font16,
    fontWeight: fonts.weight.bold,
    color: colors.secondary1,
  },
  historyItemName: {
    //borderWidth: 1,
    fontSize: fonts.size.font16,
    fontWeight: fonts.weight.bold,
    color: colors.secondary1,
  },
  historyItemDate: {
    //borderWidth: 1,
    fontSize: fonts.size.font14,
    //fontWeight: fonts.weight.semi,
    color: colors.secondary1,
  },
  historyItemValue: {
    //borderWidth: 1,
    fontSize: fonts.size.font14,
    fontWeight: fonts.weight.semi,
    color: colors.accent1,
  },
  imgContainer: {
    width: dimensions.Width * 0.1,
    height: dimensions.Width * 0.1,

    //borderRadius: 10,
    overflow: 'hidden',
  },
  Image: {
    width: dimensions.Width * 0.1,
    height: dimensions.Width * 0.1,
  },
});

export default Home;

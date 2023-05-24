import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import React, {useEffect} from 'react';
import StaticContainer from '../../../../containers/StaticContainer';

import Xray from '../../../../assets/svgs/Xray.svg';
import BrainMri from '../../../../assets/svgs/BrainMri.svg';
import Retinopathy from '../../../../assets/svgs/Retinopathy.svg';
import RiskOfDeath from '../../../../assets/svgs/RiskOfDeath.svg';
import RecommendCompound from '../../../../assets/svgs/Recommend-Compound.svg';
import Backicon from '../../../../assets/svgs/Backicon.svg';

import {styles} from './styles';
import dimensions from '../../../../utils/styles/themes/dimensions';

const elements = [
  {
    name: 'X-Ray',
    description: 'Get Analysis of Edema Cardiomegaly Mass Pneumothorax',
    icon: <Xray width={dimensions.Width / 5} height={dimensions.Height / 7} />,
    screen: 'PatientList',
  },
  {
    name: 'Brain MRI',
    description: 'Get Analysis of Enhancing Non Enhancing Tumour and Edema',
    icon: (
      <BrainMri width={dimensions.Width / 5} height={dimensions.Height / 7} />
    ),
    screen: 'PatientList',
  },
  {
    name: 'Retinopathy',
    description: 'Get Analysis of Diabetic Retinopathy',
    icon: (
      <Retinopathy
        width={dimensions.Width / 5}
        height={dimensions.Height / 7}
      />
    ),
    screen: 'Retinopathy',
  },
  {
    name: 'Risk of Death',
    description: 'Get Analysis of Risk of Death',
    icon: (
      <RiskOfDeath
        width={dimensions.Width / 5}
        height={dimensions.Height / 7}
      />
    ),
    screen: 'RiskOfDeath',
  },
  {
    name: 'Recommend Compound',
    description: 'Gain Compound Recommendation for a Disease',
    icon: (
      <RecommendCompound
        width={dimensions.Width / 5}
        height={dimensions.Height / 7}
      />
    ),
    screen: 'CompoundRecommendation',
  },
];

const renderItem = ({item}, navigation) => (
  <TouchableOpacity
    style={styles.flex}
    onPress={() => {
      navigation.navigate('App', {
        screen: item.screen,
        params: {data: item.name},
      });
    }}>
    {item.icon}
    <View style={styles.flexVertical}>
      <Text style={styles.text}>{item.name}</Text>
      <Text style={styles.text2}>{item.description}</Text>
    </View>
    <Backicon
      width={dimensions.Width / 35}
      height={dimensions.Height / 35}
      style={[
        {
          transform: [{rotate: '180deg'}],
        },
      ]}
    />
  </TouchableOpacity>
);

const AssistantHome = ({navigation}) => {
  return (
    <StaticContainer>
      <View>
        <Text style={styles.heading}>Choose a Diagnosis or Prognosis Task</Text>
        <FlatList
          data={elements}
          renderItem={item => renderItem(item, navigation)}
          keyExtractor={item => item.name}
          style={styles.flatList}
        />
      </View>
    </StaticContainer>
  );
};

export default AssistantHome;

import {View, Text, Dimensions, FlatList, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import colors from '../../../../utils/styles/themes/colors';
import dimensions from '../../../../utils/styles/themes/dimensions';
import StaticContainer from '../../../../containers/StaticContainer';
import BackHeader from '../../../../components/shared/BackHeader';
import Search from '../../../../components/shared/CommunitySearch';
import Logo from '../../../../assets/svgs/community-logo';

import DropDownPicker from 'react-native-dropdown-picker';
DropDownPicker.setListMode('SCROLLVIEW');

import {styles} from './styles';

const Home = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'C/Dermatologist', value: 'home'},
    {label: 'C/Dermatologist', value: 'haris'},
    {label: 'C/Dermatologist', value: 'moeed'},
    {label: 'C/Dermatologist', value: 'ali'},
  ]);

  const [community, setCommunity] = useState([
    {id: 1, label: 'C/Dermatologist', members: 200},
    {id: 2, label: 'C/Dermatologist', members: 200},
    {id: 3, label: 'C/Dermatologist', members: 200},
    {id: 4, label: 'C/Dermatologist', members: 200},
    {id: 5, label: 'C/Dermatologist', members: 200},
    {id: 6, label: 'C/Dermatologist', members: 200},
    {id: 7, label: 'C/Dermatologist', members: 200},
    {id: 8, label: 'C/Dermatologist', members: 200},
    {id: 9, label: 'C/Dermatologist', members: 200},
  ]);
  return (
    <StaticContainer
      customHeaderEnable={true}
      customHeaderName={'Support Community'}>
      <View style={styles.container}>
        <View style={styles.search}>
          <View>
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              style={styles.dropDown}
              dropDownContainerStyle={styles.dropDownContainer}
              placeholder="Home"
              textStyle={{
                fontSize: 12,
              }}
              maxHeight={dimensions.Height * 0.15}
            />
          </View>
          <Search />
        </View>
        <View style={styles.communityContainer}>
          <View style={styles.joinedCommunity}>
            <Text style={styles.communityText}>Joined Communities</Text>
            <View style={styles.line} />
            <FlatList
              data={community}
              renderItem={({item}) => (
                <View style={styles.community}>
                  <View style={styles.communitydetail}>
                    <Logo
                      width={dimensions.Width / 12}
                      height={dimensions.Height / 18}
                    />
                    <View style={{marginLeft: dimensions.Width / 40}}>
                      <Text style={styles.communityName}>{item.label}</Text>
                      <Text style={styles.communityMembers}>
                        Members: {item.members}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity style={styles.communityButton}>
                    <Text style={styles.communityButtonText}>Leave</Text>
                  </TouchableOpacity>
                </View>
              )}
              keyExtractor={item => item.id}
            />
          </View>
          <View style={styles.otherCommunity}>
            <Text style={styles.communityText}>Other Communities</Text>
            <View style={styles.line} />
            <FlatList
              data={community}
              renderItem={({item}) => (
                <View style={styles.community}>
                  <View style={styles.communitydetail}>
                    <Logo
                      width={dimensions.Width / 12}
                      height={dimensions.Height / 18}
                    />
                    <View style={{marginLeft: dimensions.Width / 40}}>
                      <Text style={styles.communityName}>{item.label}</Text>
                      <Text style={styles.communityMembers}>
                        Members: {item.members}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity style={styles.communityButton}>
                    <Text style={styles.communityButtonText}>Join</Text>
                  </TouchableOpacity>
                </View>
              )}
              keyExtractor={item => item.id}
            />
          </View>
        </View>
      </View>
    </StaticContainer>
  );
};

export default Home;

import {
  View,
  Text,
  Dimensions,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import colors from '../../../../utils/styles/themes/colors';
import dimensions from '../../../../utils/styles/themes/dimensions';
import StaticContainer from '../../../../containers/StaticContainer';
import Search from '../../../../components/shared/CommunitySearch';
import Logo from '../../../../assets/svgs/community-logo';
import Loader from '../../../../components/shared/Loader';

import DropDownPicker from 'react-native-dropdown-picker';
DropDownPicker.setListMode('SCROLLVIEW');

import {styles} from './styles';
import {useSelector, useDispatch} from 'react-redux';

import {
  getCommunity,
  joinCommunity,
  leaveCommunity,
} from '../../../../services/communityServices';
import {useEffect} from 'react';
import {authUpdate} from '../../../../setup/redux/slices/auth.slice';
import ROLES from '../../../../utils/constants/ROLES';

import {useIsFocused} from '@react-navigation/native';

const Home = ({navigation}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  //refresh on Focus
  const isFocused = useIsFocused();

  const [jcommunities, setjCommunities] = useState([]);
  const [communities, setCommunities] = useState([]);

  //user
  const [user, setUser] = useState(useSelector(state => state.auth.user));
  const userCommunities = user.communities;

  const role = useSelector(state => state.role.role);

  const dispatch = useDispatch();

  //get joined and all communities
  const getCommunities = async () => {
    setLoading(true);
    const res = await getCommunity();
    //join communities
    const joinedCommunities = res.data.data.data.filter(community => {
      return userCommunities.includes(community._id);
    });
    setjCommunities(joinedCommunities);
    //add Home and all joined communities to dropdown
    const dropdownItems = [
      {label: 'Home', value: 'home'},
      ...joinedCommunities.map(community => {
        return {label: community.name, value: community._id};
      }),
    ];
    setItems(dropdownItems);
    setValue('home');

    //all communities
    const allCommunities = res.data.data.data.filter(community => {
      return !userCommunities.includes(community._id);
    });
    setCommunities(allCommunities);
    setLoading(false);
  };

  useEffect(() => {
    getCommunities();
  }, [user, isFocused]);

  getNoCommunityItem = title => {
    return (
      <View style={styles.noCommunityContainer}>
        <Text style={styles.noCommunity}>{title}</Text>
      </View>
    );
  };

  if (loading) return <Loader title={'Loading Communities...'} />;

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
              onChangeValue={value => {
                if (value === 'home') {
                  navigation.navigate('Support Communities');
                  return;
                }
                navigation.navigate('CommunityDetails', {
                  item: jcommunities.find(community => community._id === value),
                });
                //setRefresh(!refresh);
              }}
              style={[
                styles.dropDown,
                {
                  backgroundColor:
                    role === ROLES.doctor
                      ? colors.secondaryMonoChrome100
                      : colors.primaryMonoChrome100,
                },
              ]}
              dropDownContainerStyle={[styles.dropDownContainer]}
              placeholder="Home"
              textStyle={{
                fontSize: 12,
              }}
              maxHeight={dimensions.Height * 0.15}
            />
          </View>
          <Search />
        </View>
        <View
          style={[
            styles.communityContainer,
            {
              backgroundColor:
                role === ROLES.doctor
                  ? colors.secondaryMonoChrome100
                  : colors.primaryMonoChrome100,
            },
          ]}>
          <View
            style={[
              styles.joinedCommunity,
              {
                backgroundColor:
                  role === ROLES.doctor
                    ? colors.secondaryMonoChrome100
                    : colors.primaryMonoChrome100,
              },
            ]}>
            <Text style={styles.communityText}>Joined Communities</Text>
            <View style={styles.line} />
            {!jcommunities.length ? (
              getNoCommunityItem('No Joined Communities')
            ) : (
              <FlatList
                data={jcommunities}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={styles.community}
                    onPress={() => {
                      navigation.navigate('CommunityDetails', {item});
                    }}>
                    <View style={styles.communitydetail}>
                      <Logo
                        width={dimensions.Width / 12}
                        height={dimensions.Height / 18}
                      />
                      <View style={{marginLeft: dimensions.Width / 40}}>
                        <Text style={styles.communityName}>{item.name}</Text>
                        <Text style={styles.communityMembers}>
                          Members: {item.totalMember}
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity
                      style={styles.communityButton}
                      onPress={async () => {
                        const res = await leaveCommunity(item._id);
                        setUser(res.data.data.user);
                        dispatch(
                          authUpdate({
                            user: res.data.data.user,
                          }),
                        );
                      }}>
                      <Text style={styles.communityButtonText}>Leave</Text>
                    </TouchableOpacity>
                  </TouchableOpacity>
                )}
                keyExtractor={item => item._id}
              />
            )}
          </View>
          <View
            style={[
              styles.otherCommunity,
              {
                backgroundColor:
                  role === ROLES.doctor
                    ? colors.secondaryMonoChrome100
                    : colors.primaryMonoChrome100,
              },
            ]}>
            <Text style={styles.communityText}>Other Communities</Text>
            <View style={styles.line} />
            {!communities.length ? (
              getNoCommunityItem('No Other Communities')
            ) : (
              <FlatList
                data={communities}
                renderItem={({item}) => (
                  <View style={styles.community}>
                    <View style={styles.communitydetail}>
                      <Logo
                        width={dimensions.Width / 12}
                        height={dimensions.Height / 18}
                      />
                      <View style={{marginLeft: dimensions.Width / 40}}>
                        <Text style={styles.communityName}>{item.name}</Text>
                        <Text style={styles.communityMembers}>
                          Members: {item.totalMember}
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity
                      style={styles.communityButton}
                      onPress={async () => {
                        const res = await joinCommunity(item._id);
                        setUser(res.data.data.user);
                        dispatch(
                          authUpdate({
                            user: res.data.data.user,
                          }),
                        );
                      }}>
                      <Text style={styles.communityButtonText}>Join</Text>
                    </TouchableOpacity>
                  </View>
                )}
                keyExtractor={item => item._id}
              />
            )}
          </View>
        </View>
      </View>
    </StaticContainer>
  );
};

export default Home;

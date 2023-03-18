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
import BackHeader from '../../../../components/shared/BackHeader';
import Search from '../../../../components/shared/CommunitySearch';
import Logo from '../../../../assets/svgs/community-logo';

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

const Home = ({navigation}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const [jcommunities, setjCommunities] = useState([]);
  const [communities, setCommunities] = useState([]);

  //user
  const [user, setUser] = useState(useSelector(state => state.auth.user));
  const userCommunities = user.communities;

  const dispatch = useDispatch();

  //get joined and all communities
  const getCommunities = async () => {
    setLoading(true);
    const res = await getCommunity();
    console.log('res', res.data.data.data);
    //join communities
    const joinedCommunities = res.data.data.data.filter(community => {
      return userCommunities.includes(community._id);
    });
    setjCommunities(joinedCommunities);

    //all communities
    const allCommunities = res.data.data.data.filter(community => {
      return !userCommunities.includes(community._id);
    });
    setCommunities(allCommunities);
    setLoading(false);
  };

  useEffect(() => {
    getCommunities();
  }, [user]);

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
            {loading ? (
              <ActivityIndicator
                size="large"
                color={colors.primary1}
                style={{
                  flex: 1,
                }}
              />
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
          <View style={styles.otherCommunity}>
            <Text style={styles.communityText}>Other Communities</Text>
            <View style={styles.line} />
            {loading ? (
              <ActivityIndicator
                size="large"
                color={colors.primary1}
                style={{
                  flex: 1,
                }}
              />
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

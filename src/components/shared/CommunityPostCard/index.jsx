import {TouchableOpacity, Text, StyleSheet, View, Image} from 'react-native';

import fonts from '../../../utils/styles/themes/fonts';
import colors from '../../../utils/styles/themes/colors';
import dimensions from '../../../utils/styles/themes/dimensions';
import Logo from '../../../assets/svgs/community-logo';
import CommunityPostImage from '../../../assets/images/CommunityPostImage.png';
import {apiEndpoint} from '../../../utils/constants/APIendpoint';
import Button from '../../../components/shared/Button';

import {deletePost} from '../../../services/communityServices';

import {useNavigation} from '@react-navigation/native';

import {formatDate} from '../../../utils/helpers/formatDate';
import {useSelector} from 'react-redux';

export default CommunityPostCard = props => {
  const navigation = useNavigation();
  const {item, Delete, setDelete} = props;
  const user = useSelector(state => state.auth.user);

  console.log(item);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('Post', item)}>
      <View style={[styles.flexRow, {width: dimensions.Width / 1.2}]}>
        <View style={[styles.flexRow, {width: 'auto'}]}>
          <Logo width={dimensions.Width / 10} height={dimensions.Height / 16} />
          <View style={{marginLeft: dimensions.Width / 100}}>
            <Text
              style={styles.communityName}>{`C/${item.community.name}`}</Text>
            <Text style={styles.communityMembers}>{`u/${
              item.isAnonymous ? 'Anonymous' : item.author.name
            }`}</Text>
          </View>
        </View>
      </View>
      <Image
        source={
          item.file?.length > 0
            ? {uri: `${apiEndpoint}files/${item.file}`}
            : CommunityPostImage
        }
        style={styles.image}
        width={dimensions.Width / 2.6}
        height={dimensions.Height / 8.1}
      />
      <Text style={[styles.communityName, styles.text]}>{item.title}</Text>
      <Text style={[styles.communityMembers, styles.text, {width: 'auto'}]}>
        {item.content}
      </Text>
      <Text
        style={[
          styles.communityMembers,
          styles.text,
          {
            width: 'auto',
            paddingVertical: dimensions.Height / 200,
            color: colors.accent1,
            alignSelf: 'flex-start',
          },
        ]}>
        {formatDate(item.date)}
      </Text>
      <View
        style={[
          styles.flexRow,
          {
            width: dimensions.Width / 1.6,
            height: dimensions.Height / 15,
          },
        ]}>
        {user._id === item.author._id ? (
          <Button
            label="Delete"
            type="empty"
            width={dimensions.Width / 4}
            height={dimensions.Height / 20}
            onPress={() => {
              const res = deletePost(item._id);
              setDelete(!Delete);
            }}
          />
        ) : (
          <Button
            label="Report"
            type="empty"
            width={dimensions.Width / 4}
            height={dimensions.Height / 20}
            onPress={() => {}}
          />
        )}
        <Button
          label="View"
          type="filled"
          width={dimensions.Width / 4}
          height={dimensions.Height / 20}
          onPress={() => navigation.navigate('Post', item)}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: dimensions.Height / 100,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 'auto',
    borderWidth: 2,
    borderColor: colors.primary1,
    borderRadius: 10,
    paddingVertical: 10,
  },
  flexRow: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    width: dimensions.Width / 2,
    alignSelf: 'flex-start',
    paddingHorizontal: dimensions.Width / 20,
    paddingVertical: dimensions.Height / 200,
  },
  communityName: {
    width: dimensions.Width / 3.5,
    fontSize: fonts.size.font16,
    fontWeight: 'bold',
    color: colors.secondary1,
  },

  communityMembers: {
    fontSize: fonts.size.font12,
    color: colors.secondary1,
  },
  image: {
    position: 'absolute',
    top: dimensions.Height / 100,
    right: dimensions.Width / 30,
    borderRadius: 5,
  },
});

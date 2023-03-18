import {TouchableOpacity, Text, StyleSheet, View, Image} from 'react-native';

import fonts from '../../../utils/styles/themes/fonts';
import colors from '../../../utils/styles/themes/colors';
import dimensions from '../../../utils/styles/themes/dimensions';
import Logo from '../../../assets/svgs/community-logo';
import CommunityPostImage from '../../../assets/images/CommunityPostImage.png';
import Button from '../../../components/shared/Button';

import {useNavigation} from '@react-navigation/native';

export default CommunityPostCard = props => {
  const navigation = useNavigation();
  const item = props.item;
  console.log('post', item);

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
            <Text
              style={styles.communityMembers}>{`u/${item.author.name}`}</Text>
          </View>
        </View>
      </View>
      <Image source={CommunityPostImage} style={styles.image} />
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
        {item.date}
      </Text>
      <View
        style={[
          styles.flexRow,
          {
            width: dimensions.Width / 1.6,
            height: dimensions.Height / 15,
          },
        ]}>
        <Button
          label="Delete"
          type="empty"
          width={dimensions.Width / 4}
          height={dimensions.Height / 20}
        />
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
    right: dimensions.Width / 20,
  },
});

import {StyleSheet} from 'react-native';

import dimensions from '../../../../utils/styles/themes/dimensions';
import colors from '../../../../utils/styles/themes/colors';
import fonts from '../../../../utils/styles/themes/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  communityName: {
    fontSize: fonts.size.font14,
    fontWeight: 'bold',
    color: colors.secondary1,
  },
  communityMembers: {
    fontSize: fonts.size.font12,
    color: colors.secondary1,
  },
  body: {
    paddingHorizontal: dimensions.Width * 0.02,
    marginBottom: dimensions.Height * 0.02,
  },
  title: {
    fontSize: fonts.size.font14,
    fontWeight: 'bold',
    color: colors.secondary1,
  },
  image: {
    width: dimensions.Width * 0.9,
    height: dimensions.Height / 3,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  description: {
    fontSize: fonts.size.font14,
    color: colors.secondary1,
    textAlign: 'justify',
    paddingHorizontal: dimensions.Width * 0.02,
  },
  footer: {
    //padding: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: dimensions.Width * 0.02,
  },
  comments: {
    //marginVertical: 10,
  },
  comment: {
    //marginVertical: 10,
  },
  commentContainer: {
    borderWidth: 1,
    borderColor: colors.primary1,
    paddingHorizontal: dimensions.Width * 0.02,
    paddingTop: dimensions.Height * 0.02,
    marginVertical: dimensions.Height * 0.02,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: dimensions.Width * 0.02,
  },
  commentUser: {
    fontSize: fonts.size.font14,
    fontWeight: 'bold',
    color: colors.secondary1,
  },
  commentTime: {
    fontSize: fonts.size.font12,
    color: colors.accent1,
  },
  commentText: {
    fontSize: fonts.size.font14,
    color: colors.secondary1,
    textAlign: 'justify',
    padding: dimensions.Width * 0.02,
  },
  commentFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reply: {
    borderColor: colors.primary1,
    borderWidth: 1,
    paddingHorizontal: dimensions.Width * 0.02,
    paddingTop: dimensions.Height * 0.01,
    marginVertical: dimensions.Height * 0.01,
    width: dimensions.Width * 0.85,
    alignSelf: 'center',
  },
  replyHeader: {
    paddingLeft: dimensions.Width * 0.02,
  },
  replyUser: {
    fontSize: fonts.size.font12,
    fontWeight: fonts.weight.normal,
    color: colors.secondary2,
  },
  replyTime: {
    fontSize: fonts.size.font12,
    color: colors.accent1,
  },
  replyText: {
    fontSize: fonts.size.font14,
    color: colors.secondary1,
    textAlign: 'justify',
    paddingLeft: dimensions.Width * 0.01,
  },
  replyFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

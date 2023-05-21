import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
} from 'react-native';

import {styles} from './styles';

import ScrollContainer from '../../../../containers/ScrollContainer';
import Logo from '../../../../assets/svgs/community-logo';
import Button from '../../../../components/shared/Button';
import {ValidateInputField} from '../../../../components/shared/Input';
import CommunityPostImage from '../../../../assets/images/CommunityPostImage.png';
import {apiEndpoint} from '../../../../utils/constants/APIendpoint';

import {set, useForm} from 'react-hook-form';

import {addComment, getPostById} from '../../../../services/communityServices';

import {formatDate} from '../../../../utils/helpers/formatDate';

import dimensions from '../../../../utils/styles/themes/dimensions';
import colors from '../../../../utils/styles/themes/colors';
import fonts from '../../../../utils/styles/themes/fonts';
import {useSelector} from 'react-redux';

import {deletePost} from '../../../../services/communityServices';

import {createComplaint} from '../../../../services/complaintServices';

const Post = props => {
  const {control, handleSubmit, watch, resetField} = useForm({
    mode: 'onChange',
    defaultValues: {
      content: '',
    },
  });

  const user = useSelector(state => state.auth.user);
  const [reply, isReply] = React.useState(false);
  const [cid, setCid] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const [comments, setComments] = React.useState([]);

  const [AddModalVisible, setAddVisible] = React.useState(false);

  const item = props.route.params;

  //json containing comments and replies
  // const comment = [
  //   {
  //     id: 1,
  //     user: 'jane',
  //     comment: 'This is a great post!',
  //     time: '5 hours ago',
  //     replies: [
  //       {
  //         id: 1,
  //         reply: 'Thanks for your comment!',
  //         time: '4 hours ago',
  //         user: 'john',
  //       },
  //       {
  //         id: 2,
  //         reply: 'I agree, this post is amazing!',
  //         time: '3 hours ago',
  //         user: 'sarah',
  //       },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     user: 'joe',
  //     comment: "I don't really understand this topic",
  //     time: '1 hour ago',
  //     replies: [],
  //   },
  //   {
  //     id: 3,
  //     user: 'kate',
  //     comment: 'Can you provide more examples?',
  //     time: '3 hours ago',
  //     replies: [
  //       {
  //         id: 1,
  //         reply: 'Sure, here are a few examples...',
  //         time: '2 hours ago',
  //         user: 'tim',
  //       },
  //     ],
  //   },
  //   {
  //     id: 4,
  //     user: 'dave',
  //     comment: 'I disagree with your conclusion',
  //     time: '4 hours ago',
  //     replies: [
  //       {
  //         id: 1,
  //         reply: 'Can you explain why?',
  //         time: '3 hours ago',
  //         user: 'lisa',
  //       },
  //       {
  //         id: 2,
  //         reply: "I'm interested in hearing your perspective",
  //         time: '2 hours ago',
  //         user: 'paul',
  //       },
  //       {
  //         id: 3,
  //         reply: 'I respectfully disagree',
  //         time: '1 hour ago',
  //         user: 'alice',
  //       },
  //     ],
  //   },
  //   {
  //     id: 5,
  //     user: 'sam',
  //     comment: 'This post is very informative',
  //     time: '6 hours ago',
  //     replies: [
  //       {
  //         id: 1,
  //         reply: 'Glad you found it helpful!',
  //         time: '5 hours ago',
  //         user: 'jim',
  //       },
  //     ],
  //   },
  // ];

  const inputRef = React.useRef(null);

  const handleFocus = () => {
    inputRef.current.focus();
  };

  const getPost = async () => {
    try {
      const response = await getPostById(item._id);

      setComments(response.data.data.data.comments);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getPost();
  }, [loading]);

  const onSubmit = data => {
    setLoading(true);
    Comment({
      content: data?.content,
      isReply: reply,
    });
  };

  const Comment = async data => {
    try {
      await addComment(item._id, cid, data);
      setLoading(false);
      isReply(false);
      resetField('content');
    } catch (error) {
      console.log(error);
      setLoading(false);
      isReply(false);
    } finally {
    }
  };

  return (
    <ScrollContainer
      customHeaderEnable
      customHeaderName={item.title}
      nestedScrollEnabled>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.heading}>
            <Logo
              width={dimensions.Width / 8}
              height={dimensions.Height / 16}
            />
            <View style={{marginLeft: dimensions.Width * 0.02}}>
              <Text
                style={styles.communityName}>{`C/${item.community.name}`}</Text>
              <Text style={styles.communityMembers}>{`u/${
                item.isAnonymous ? 'Anonymous' : item.author?.name
              }`}</Text>
            </View>
          </View>
          {item.author?._id === user._id ? (
            <Button
              label="Delete Post"
              type="filled"
              width={dimensions.Width / 4}
              height={dimensions.Height / 20}
              fontSize={fonts.size.font12}
              onPress={() => {
                try {
                  const res = deletePost(item._id);

                  props.navigation.goBack();
                } catch (error) {
                  console.log(error);
                }
              }}
            />
          ) : (
            <Button
              label="Report Post"
              type="filled"
              width={dimensions.Width / 4}
              height={dimensions.Height / 20}
              fontSize={fonts.size.font12}
              onPress={() => {
                setAddVisible(true);
              }}
            />
          )}
        </View>
        <View style={styles.body}>
          <Text style={styles.title}>{item.title}</Text>
          <Image
            source={
              item.file?.length > 0
                ? {uri: `${apiEndpoint}files/${item.file}`}
                : CommunityPostImage
            }
            style={styles.image}
            width={dimensions.Width * 0.8}
            height={dimensions.Height / 3}
          />
          <Text style={styles.description}>{item.content}</Text>
        </View>
        <View style={styles.footer}>
          <ValidateInputField
            placeholder={`Write your ${reply ? 'reply' : 'comment'}`}
            placeholderTextColor={colors.secondary1}
            control={control}
            name="content"
            rules={{
              required: {
                value: true,
                message: `${reply ? 'Reply' : 'Comment'} cannot be empty`,
              },
            }}
            containerWidth={dimensions.Width * 0.9}
            fontSize={fonts.size.font14}
            multiline={true}
            inputHeight={dimensions.Height / 10}
            type="outlined"
            useRef={inputRef}
            isFlexStart={true}
            text={watch('content')}
          />

          <View style={styles.buttonContainer}>
            <View>
              {reply && (
                <Button
                  label="Cancel"
                  type="outlined"
                  width={dimensions.Width / 5}
                  height={dimensions.Height / 20}
                  fontSize={fonts.size.font12}
                  borderColor={colors.white}
                  onPress={() => isReply(false)}
                />
              )}
            </View>
            {reply ? (
              <Button
                label="Reply to comment"
                type="outlined"
                width={dimensions.Width / 2.5}
                height={dimensions.Height / 20}
                fontSize={fonts.size.font12}
                isLoading={loading}
                isDisabled={loading}
                onPress={handleSubmit(onSubmit)}
              />
            ) : (
              <Button
                label="Post your comment"
                type="outlined"
                width={dimensions.Width / 2.5}
                height={dimensions.Height / 20}
                fontSize={fonts.size.font12}
                isLoading={loading}
                isDisabled={loading}
                onPress={handleSubmit(onSubmit)}
              />
            )}
          </View>
          <View style={styles.comments}>
            {comments.map((item, index) => {
              if (item.isReply) {
                return null;
              }
              return (
                <View key={index} style={styles.comment}>
                  <View style={styles.commentContainer}>
                    <View style={styles.commentHeader}>
                      <Text style={styles.commentUser}>
                        {item.author?.name}
                      </Text>
                      <Text style={styles.commentTime}>
                        {formatDate(item.date)}
                      </Text>
                    </View>
                    {item.authorType === 'Doctor' && (
                      <View style={styles.doctorBadge}>
                        <Text style={styles.doctorBadgeText}>
                          {item.author?.speciality}
                        </Text>
                      </View>
                    )}
                    <Text style={styles.commentText}>{item.content}</Text>
                    <View style={styles.commentFooter}>
                      <Button
                        label="Reply"
                        type="filled"
                        width={dimensions.Width / 5}
                        height={dimensions.Height / 30}
                        fontSize={fonts.size.font12}
                        onPress={() => {
                          setCid(item._id);
                          handleFocus();
                          isReply(true);
                        }}
                      />

                      {item.author?._id === user._id ? (
                        <Button
                          label="Delete"
                          type="outlined"
                          width={dimensions.Width / 5}
                          height={dimensions.Height / 30}
                          fontSize={fonts.size.font12}
                        />
                      ) : (
                        <Button
                          label="Report"
                          type="outlined"
                          width={dimensions.Width / 5}
                          height={dimensions.Height / 30}
                          fontSize={fonts.size.font12}
                        />
                      )}
                    </View>
                  </View>
                  {item.replies.map((item, index) => {
                    return (
                      <View key={index} style={styles.reply}>
                        <Text style={styles.replyText}>{item.content}</Text>
                        <View style={styles.replyFooter}>
                          <View style={styles.replyHeader}>
                            <Text style={styles.replyUser}>
                              {item.author?.name}
                            </Text>
                            <Text style={styles.replyTime}>
                              {formatDate(item.date)}
                            </Text>
                          </View>
                          <Button
                            label="Report reply"
                            type="outlined"
                            width={dimensions.Width / 5}
                            height={dimensions.Height / 30}
                            fontSize={fonts.size.font12}
                            borderColor={colors.white}
                          />
                        </View>
                      </View>
                    );
                  })}
                </View>
              );
            })}
          </View>
        </View>
      </View>
      <TicketAddModal
        Visible={AddModalVisible}
        setModalVisible={setAddVisible}
        edit={false}
        report={'Post'}
        userData={{
          complainee: item.author?._id,
          complaineeType: item.author?.role,
        }}
      />
    </ScrollContainer>
  );
};

export default Post;

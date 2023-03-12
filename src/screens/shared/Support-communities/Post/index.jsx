import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

import {styles} from './styles';

import ScrollContainer from '../../../../containers/ScrollContainer';
import Logo from '../../../../assets/svgs/community-logo';
import Button from '../../../../components/shared/Button';
import {ValidateInputField} from '../../../../components/shared/Input';
import CommunityPostImage from '../../../../assets/images/CommunityPostImage.png';

import {useForm} from 'react-hook-form';

import dimensions from '../../../../utils/styles/themes/dimensions';
import colors from '../../../../utils/styles/themes/colors';
import fonts from '../../../../utils/styles/themes/fonts';

const Post = props => {
  const {control, handleSubmit, watch} = useForm({
    mode: 'onChange',
    initialValues: {
      title: '',
      post: '',
    },
  });
  item = props.route.params;
  console.log(item);

  //json containing comments and replies
  const comment = [
    {
      id: 1,
      user: 'jane',
      comment: 'This is a great post!',
      time: '5 hours ago',
      replies: [
        {
          id: 1,
          reply: 'Thanks for your comment!',
          time: '4 hours ago',
          user: 'john',
        },
        {
          id: 2,
          reply: 'I agree, this post is amazing!',
          time: '3 hours ago',
          user: 'sarah',
        },
      ],
    },
    {
      id: 2,
      user: 'joe',
      comment: "I don't really understand this topic",
      time: '1 hour ago',
      replies: [],
    },
    {
      id: 3,
      user: 'kate',
      comment: 'Can you provide more examples?',
      time: '3 hours ago',
      replies: [
        {
          id: 1,
          reply: 'Sure, here are a few examples...',
          time: '2 hours ago',
          user: 'tim',
        },
      ],
    },
    {
      id: 4,
      user: 'dave',
      comment: 'I disagree with your conclusion',
      time: '4 hours ago',
      replies: [
        {
          id: 1,
          reply: 'Can you explain why?',
          time: '3 hours ago',
          user: 'lisa',
        },
        {
          id: 2,
          reply: "I'm interested in hearing your perspective",
          time: '2 hours ago',
          user: 'paul',
        },
        {
          id: 3,
          reply: 'I respectfully disagree',
          time: '1 hour ago',
          user: 'alice',
        },
      ],
    },
    {
      id: 5,
      user: 'sam',
      comment: 'This post is very informative',
      time: '6 hours ago',
      replies: [
        {
          id: 1,
          reply: 'Glad you found it helpful!',
          time: '5 hours ago',
          user: 'jim',
        },
      ],
    },
  ];

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
              <Text
                style={styles.communityMembers}>{`u/${item.author.name}`}</Text>
            </View>
          </View>
          <Button
            label="Report Post"
            type="filled"
            width={dimensions.Width / 4}
            height={dimensions.Height / 20}
            fontSize={fonts.size.font12}
          />
        </View>
        <View style={styles.body}>
          <Text style={styles.title}>{item.title}</Text>
          <Image
            source={CommunityPostImage}
            style={styles.image}
            width={dimensions.Width * 0.9}
            height={dimensions.Height / 3}
          />
          <Text style={styles.description}>{item.content}</Text>
        </View>
        <View style={styles.footer}>
          <ValidateInputField
            placeholder="Write your comment"
            placeholderTextColor={colors.secondary1}
            control={control}
            name="post"
            rules={{
              required: {
                value: true,
                message: 'Comment cannot be empty',
              },
            }}
            containerWidth={dimensions.Width * 0.9}
            fontSize={fonts.size.font14}
            multiline={true}
            inputHeight={dimensions.Height / 10}
            type="outlined"
          />
          <View style={styles.buttonContainer}>
            <Button
              label="Attach a file"
              type="filled"
              width={dimensions.Width / 3}
              height={dimensions.Height / 20}
              fontSize={fonts.size.font12}
            />

            <Button
              label="Post yout comment"
              type="outlined"
              width={dimensions.Width / 2.5}
              height={dimensions.Height / 20}
              fontSize={fonts.size.font12}
            />
          </View>
          <View style={styles.comments}>
            {comment.map((item, index) => {
              return (
                <View key={index} style={styles.comment}>
                  <View style={styles.commentContainer}>
                    <View style={styles.commentHeader}>
                      <Text style={styles.commentUser}>{item.user}</Text>
                      <Text style={styles.commentTime}>{item.time}</Text>
                    </View>
                    <Text style={styles.commentText}>{item.comment}</Text>
                    <View style={styles.commentFooter}>
                      <Button
                        label="Reply"
                        type="filled"
                        width={dimensions.Width / 5}
                        height={dimensions.Height / 30}
                        fontSize={fonts.size.font12}
                      />

                      <Button
                        label="Report"
                        type="outlined"
                        width={dimensions.Width / 5}
                        height={dimensions.Height / 30}
                        fontSize={fonts.size.font12}
                      />
                    </View>
                  </View>
                  {item.replies.map((item, index) => {
                    return (
                      <View key={index} style={styles.reply}>
                        <Text style={styles.replyText}>{item.reply}</Text>
                        <View style={styles.replyFooter}>
                          <View style={styles.replyHeader}>
                            <Text style={styles.replyUser}>{item.user}</Text>
                            <Text style={styles.replyTime}>{item.time}</Text>
                          </View>
                          <Button
                            label="Report reply"
                            type="outlined"
                            width={dimensions.Width / 5}
                            height={dimensions.Height / 30}
                            fontSize={fonts.size.font10}
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
    </ScrollContainer>
  );
};

export default Post;

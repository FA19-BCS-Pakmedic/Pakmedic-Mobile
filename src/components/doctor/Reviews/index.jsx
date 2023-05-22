import React, {useState} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';

import colors from '../../../utils/styles/themes/colors';
import dimensions from '../../../utils/styles/themes/dimensions';
import fonts from '../../../utils/styles/themes/fonts';

import ReviewCard from './Card';

import {getAllReviews} from '../../../services/reviewServices';

import NotFound from '../../shared/NotFound';

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const id = useSelector(state => state.auth.user._id);

  const getReviews = async () => {
    try {
      setIsLoading(true);
      query = `doctor=${id}`;
      const response = await getAllReviews(query);
      setReviews(response.data.data.data);
      //console.log(response.data.data.data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    getReviews();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color={colors.primary1} />
      ) : reviews.length > 0 ? (
        <>
          <View style={styles.reviewCountContainer}>
            <Text
              style={styles.reviewCount}>{`${reviews.length} Reviews`}</Text>
          </View>
          <ScrollView
            style={styles.contentContainer}
            showsVerticalScrollIndicator={false}>
            {reviews.map((review, index) => {
              return <ReviewCard key={index} review={review} />;
            })}
          </ScrollView>
        </>
      ) : (
        <NotFound text="No reviews found" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight: dimensions.Height / 1.8,
    flex: 1,
  },

  reviewCountContainer: {
    width: '100%',
  },

  reviewCount: {
    fontSize: fonts.size.font24,
    fontWeight: fonts.weight.bold,
  },

  btnContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: dimensions.Height / 20,
  },

  contentContainer: {
    width: '100%',
    paddingBottom: dimensions.Height / 10,
    paddingTop: dimensions.Height / 40,
  },

  modalContainer: {
    width: '100%',
    paddingVertical: dimensions.Height / 50,
    paddingHorizontal: dimensions.Width / 50,
  },

  infoContainer: {
    width: '100%',
    marginVertical: dimensions.Height / 250,
  },

  headingContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: dimensions.Height / 50,
  },

  heading: {
    fontSize: fonts.size.font24,
    fontWeight: fonts.weight.bold,
  },

  inputContainer: {
    width: '100%',
  },
  controls: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  dropdownContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

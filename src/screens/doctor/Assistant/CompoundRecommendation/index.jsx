import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {React, useState} from 'react';
import StaticContainer from '../../../../containers/StaticContainer';

import ScrollContainer from '../../../../containers/ScrollContainer';

import {styles} from './styles';
import dimensions from '../../../../utils/styles/themes/dimensions';

import AutocompleteTags from 'react-native-autocomplete-tags';
import {conditions} from './conditions';
import Tag from './Tag';
import Button from '../../../../components/shared/Button';

import Robot from '../../../../assets/svgs/Robot.svg';
import Ellipse from '../../../../assets/svgs/Ellipse.svg';
import fonts from '../../../../utils/styles/themes/fonts';

import {RecommendCompounds} from '../../../../services/doctorServices';

import {useNavigation} from '@react-navigation/native';

const CompoundRecommendationScreen = () => {
  const navigation = useNavigation();

  const [suggestions, setSuggestions] = useState([...conditions]);
  const [isLoading, setIsLoading] = useState(false);

  const [tags, setTags] = useState([]);

  const handleTagPress = tag => {
    setTags(tags.filter(item => item !== tag));
    setSuggestions([tag, ...suggestions]);
  };

  const renderTagComponent = tag => {
    const onPress = () => handleTagPress(tag);

    return (
      <Tag
        label={labelExtractor(tag)}
        key={labelExtractor(tag)}
        onPress={onPress}
      />
    );
  };

  const labelExtractor = tag => tag;

  const onSuggestionPress = suggestion => {
    // If the suggestion is not already in the tags array, add it
    if (!tags.includes(suggestion)) {
      setTags([...tags, suggestion]);
      setSuggestions(suggestions.filter(item => item !== suggestion));
    }
  };

  const handleKeyDown = e => {
    if (e.keyCode === 8) {
      // 8 is the keycode for backspace
      e.preventDefault();
    }
  };

  const onSubmit = async data => {
    setIsLoading(true);
    const response = await RecommendCompounds(tags);
    setIsLoading(false);

    navigation.navigate('App', {
      screen: 'CompoundResults',
      params: {results: response?.data?.data?.result},
    });
  };

  const VirtualizedList = ({children}) => {
    return (
      <FlatList
        keyboardShouldPersistTaps="handled"
        style={{marginBottom: 20}}
        data={[]}
        keyExtractor={() => 'key'}
        renderItem={null}
        ListHeaderComponent={<>{children}</>}
      />
    );
  };

  return (
    <KeyboardAvoidingView
      behavior="position"
      style={{backgroundColor: 'white', flex: 1}}>
      <StaticContainer
        customHeaderEnable={true}
        customHeaderName="Recommend Compound">
        <View style={styles.container}>
          <Robot width={dimensions.Width / 3} height={dimensions.Height / 5} />
          <View style={styles.view}>
            <Text style={[styles.text, {fontSize: fonts.size.font16}]}>
              How to Use?
            </Text>
            <View style={styles.flexRow}>
              <Ellipse
                width={dimensions.Width / 45}
                height={dimensions.Height / 45}
              />
              <Text style={styles.text2}>Press on the Tag to delete it</Text>
            </View>
            <View style={styles.flexRow}>
              <Ellipse
                width={dimensions.Width / 45}
                height={dimensions.Height / 45}
              />
              <Text style={styles.text2}>
                You will suggested for tags so you can select from dropdown
              </Text>
            </View>
          </View>

          <Text style={styles.text}>
            Disclaimer: The result from the AI recommendation system may not be
            100% accurate
          </Text>
          <VirtualizedList>
            <AutocompleteTags
              tags={tags}
              suggestions={suggestions}
              onChangeTags={setTags}
              labelExtractor={labelExtractor}
              containerStyle={styles.autocompleteContainer}
              allowCustomTags={false}
              onSuggestionPress={onSuggestionPress}
              inputProps={{
                onKeyPress: handleKeyDown,
                placeholder: 'Write the patient’s condition',
                multiline: true,
              }}
              flatListStyle={styles.flatListStyle}
              flatListContainerStyle={styles.flatListContainerStyle}
              renderTag={renderTagComponent}
              flatListProps={{scrollEnabled: true}}
            />
          </VirtualizedList>

          <Button
            onPress={onSubmit}
            label="Get Recommendation"
            type="filled"
            width="100%"
            isLoading={isLoading}
          />
        </View>
      </StaticContainer>
    </KeyboardAvoidingView>
  );
};

export default CompoundRecommendationScreen;

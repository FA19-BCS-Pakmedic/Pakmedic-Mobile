import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import colors from '../../../../utils/styles/themes/colors';
import dimensions from '../../../../utils/styles/themes/dimensions';
import {View, ScrollView} from 'react-native';

const PostLoader = () => {
  return (
    <ScrollView>
      <View
        style={{
          borderWidth: 2,
          borderRadius: 10,
          padding: 20,
          borderColor: colors.primary1,
        }}>
        <SkeletonPlaceholder borderRadius={4}>
          <SkeletonPlaceholder.Item flexDirection="row" alignItems="flex-start">
            <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
              <SkeletonPlaceholder.Item
                width={dimensions.Width / 8}
                height={dimensions.Width / 8}
                borderRadius={50}
              />
              <SkeletonPlaceholder.Item marginLeft={10}>
                <SkeletonPlaceholder.Item
                  width={dimensions.Width / 4.5}
                  height={dimensions.Width / 25}
                />
                <SkeletonPlaceholder.Item
                  marginTop={6}
                  width={dimensions.Width / 6}
                  height={dimensions.Width / 25}
                />
              </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item
              marginLeft={10}
              width={dimensions.Width / 2.55}
              height={dimensions.Width / 3}
              borderRadius={10}
            />
          </SkeletonPlaceholder.Item>
          <SkeletonPlaceholder.Item
            width={120}
            height={15}
            marginTop={-dimensions.Width / 9}
          />
          <SkeletonPlaceholder.Item marginTop={6} width={80} height={15} />
          <SkeletonPlaceholder.Item
            marginTop={dimensions.Width / 10}
            width={dimensions.Width / 1.27}
            height={10}
          />
          <SkeletonPlaceholder.Item
            marginTop={10}
            width={dimensions.Width / 1.27}
            height={10}
          />
          <SkeletonPlaceholder.Item
            marginTop={10}
            width={dimensions.Width / 1.27}
            height={10}
          />
          <SkeletonPlaceholder.Item
            marginTop={10}
            width={dimensions.Width / 1.27}
            height={10}
          />
        </SkeletonPlaceholder>
      </View>
    </ScrollView>
  );
};

export default PostLoader;

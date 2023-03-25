import {View, Text, TouchableOpacity, FlatList, Image} from 'react-native';
import React from 'react';
import StaticContainer from '../../../../containers/StaticContainer';

import {styles} from './styles';
import dimensions from '../../../../utils/styles/themes/dimensions';

import {useRoute} from '@react-navigation/native';
import {useEffect} from 'react';
import {apiEndpoint} from '../../../../utils/constants/APIendpoint';

import ReactNativeZoomableView from '@openspacelabs/react-native-zoomable-view/src/ReactNativeZoomableView';

const ResultsScreen = () => {
  const route = useRoute();
  const [file, setFile] = React.useState(null);
  useEffect(() => {
    setFile(route.params?.image);
  }, []);

  return (
    <StaticContainer
      customHeaderEnable={true}
      customHeaderName="Diagnosis Results">
      <View style={styles.container}>
        <View style={styles.fileContainer}>
          <ReactNativeZoomableView
            maxZoom={5}
            minZoom={1}
            zoomStep={0.5}
            initialZoom={1}
            bindToBorders={true}
            onZoomAfter={this.logOutZoomState}
            style={{
              backgroundColor: 'white',
            }}>
            <Image
              source={
                file != null ? {uri: `${apiEndpoint}files/${file}`} : null
              }
              style={styles.image}
              width={dimensions.Width / 1.1}
              height={dimensions.Height / 2.2}
            />
          </ReactNativeZoomableView>
        </View>
      </View>
    </StaticContainer>
  );
};

export default ResultsScreen;

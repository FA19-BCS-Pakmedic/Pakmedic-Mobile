import RNFetchBlob from 'rn-fetch-blob';
import {Platform, PermissionsAndroid} from 'react-native';

export const downloadFile = async (url, fileName) => {
  const {config, fs} = RNFetchBlob;
  const downloadsDir =
    Platform.OS === 'ios' ? fs.dirs.DocumentDir : fs.dirs.DownloadDir;
  const fileLocation = `${downloadsDir}/${fileName}`;

  try {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'App needs access to storage to download the file',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Storage permission denied');
        return null;
      }
    }

    const response = await config({
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path: fileLocation,
        description: 'File download',
        mime: 'application/octet-stream',
        mediaScannable: true,
        title: fileName,
      },
    }).fetch('GET', url);

    return response.path();
  } catch (error) {
    console.error(error);
    return null;
  }
};

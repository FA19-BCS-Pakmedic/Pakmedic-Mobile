import AsyncStorage from '@react-native-async-storage/async-storage';

const deviceStorage = {
  //save or update an item
  async saveItem(key, value) {
    try {
      const storeValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, storeValue);
    } catch (error) {
      console.log('AsyncStorage Error: ' + error.message);
    }
  },

  //load item from async storage
  async loadItem(key) {
    try {
      const value = await AsyncStorage.getItem(key);
      return value != null ? JSON.parse(value) : null;
    } catch (error) {
      console.log('AsyncStorage Error: ' + error.message);
    }
  },

  //delete item from async storage
  async deleteItem(key) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.log('AsyncStorage Error: ' + error.message);
    }
  },

  //function to get all the stored keys
  async fetchAllKeys() {
    try {
      const keys = await AsyncStorage.getAllKeys();
      return keys;
    } catch (error) {
      console.log('AsyncStorage Error: ' + error.message);
    }
  },
};

export default deviceStorage;

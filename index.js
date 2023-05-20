/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import {EventEmitter} from 'eventemitter3';

import messaging from '@react-native-firebase/messaging';
import notifee, {EventType, AndroidImportance} from '@notifee/react-native';

import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import {notificationService} from './NotificationService';

export const eventEmitter = new EventEmitter();

const onMessageReceived = async message => {
  notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });
  await notifee.displayNotification(JSON.parse(message.data.notifee));
};

messaging().setBackgroundMessageHandler(onMessageReceived);
messaging().onMessage(onMessageReceived);

notifee.onBackgroundEvent(async ({type, detail}) => {
  const {notification, pressAction} = detail;

  // Check if the user pressed the "Mark as read" action

  console.log('Inside onBackgroundEvent');
  if (type === EventType.PRESS) {
    // Update external API
    console.log('Pressed Notification');

    eventEmitter.emit('notificationReceived', notification);

    // Remove the notification
    await notifee.cancelNotification(notification.id);
  }
});

notifee.onForegroundEvent(async ({type, detail}) => {
  const {notification, pressAction} = detail;

  if (type === EventType.PRESS) {
    eventEmitter.emit('notificationReceived', notification);

    await notifee.cancelNotification(notification.id);
  }
});

AppRegistry.registerComponent(appName, () => App);

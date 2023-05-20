import notifee, {AndroidStyle, AuthorizationStatus, EventDetail, IOSNotificationCategory, NotificationSettings} from '@notifee/react-native';
import {FirebaseMessagingTypes} from '@react-native-firebase/messaging';

export enum ETechNotifications {
  NEW_ROUTED_JOB = 'new_routed_job',
  NEW_ASSIGNED_JOB = 'new_assigned_job',
  NEW_UPDATE_IN_WO = 'new_update_in_wo',
  MESSAGE_FROM_CLIENT = 'message_from_client',
  INCOMPLETE_STATUS = 'incomplete_status',
  CONFIRMATION_BUTTON_AVAILABLE = 'confirmation_button_available',
}

class NotificationService {
  async hasPermission() {
    try {
      const settings: NotificationSettings = await notifee.getNotificationSettings();

      if (settings.authorizationStatus == AuthorizationStatus.AUTHORIZED) {
        return true;
      } else if (settings.authorizationStatus == AuthorizationStatus.DENIED) {
        return false;
      }
      return false;
    } catch (error: any) {
      throw new Error(error);
    }
  }
  async requestPermission() {
    try {
      const settings: NotificationSettings = await notifee.requestPermission();
      if (settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED) {
        return true;
      } else {
        return false;
      }
    } catch (e: any) {
      throw new Error(e);
    }
  }

  onMessageReceived = async (message: FirebaseMessagingTypes.RemoteMessage) => {
    try {
      await this.setNotificationCategories(message.notification?.title as string);
      await this.showNotification(message);
    } catch (error: any) {
      throw new Error(error);
    }
  };

  setNotificationCategories = async (notificationType: string | ETechNotifications) => {
    let categoryType: IOSNotificationCategory = {
      id: notificationType,
    };
    switch (notificationType) {
      case ETechNotifications.CONFIRMATION_BUTTON_AVAILABLE:
        // await this.confirmationButton(workOrder, this.notification.action)
        // await this.setNotificationCategories();
        categoryType.actions = [
          {
            id: notificationType,
            title: 'Confirm!',
          },
        ];
        break;

      default:
        return;
    }
    try {
      await notifee.setNotificationCategories([categoryType]);
    } catch (error: any) {
      throw new Error(error);
    }
  };

  async createChannel() {
    let channelId = 'default';
    try {
      channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
      });
    } catch (e) {
      console.log('Unable to create a channel: ', JSON.stringify(e));
    }
    return channelId;
  }

  showNotification = async (message: FirebaseMessagingTypes.RemoteMessage) => {
    try {
      const channelId = await this.createChannel();
      notifee.displayNotification({
        title: message.notification?.title,
        body: message.notification?.body,
        android: this.buildAndroidNotification(message.notification?.title as string, channelId, message),
        ios: this.buildIOSNotification(message.notification?.title),
      });
    } catch (error: any) {
      throw new Error(error);
    }
  };

  buildAndroidNotification = (notificationType: string | ETechNotifications, channelId: string, message: any) => {
    return {
      channelId,
      style: {type: AndroidStyle.BIGTEXT as any, text: message.notification?.body as string},
      actions: [
        {
          title: 'Confirm!',
          pressAction: {
            id: notificationType,
          },
        },
      ],
    };
  };

  buildIOSNotification = (notificationType: string | ETechNotifications = '') => {
    return {
      ...(notificationType && {categoryId: notificationType}),
      critical: true,
      foregroundPresentationOptions: {
        alert: true,
        badge: true,
        sound: true,
      },
    };
  };

  handleEvent = async (type: any, detail: EventDetail) => {
    if (type === 2 && detail.pressAction?.id === ETechNotifications.CONFIRMATION_BUTTON_AVAILABLE) {
      console.log('User pressed the "confirmation_button_available" action.<=======================');
    }
    if (detail.notification?.id) {
      await notifee.cancelNotification(detail.notification?.id as string);
    }
    // Input actions enter a pending state once sent, therefore we must cancel or update the notification once the action has completed.
  };
}
export const notificationService = new NotificationService();

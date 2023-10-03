import Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

async function registerForPushNotificationsAsync() {
  let token;

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (
      await Notifications.getExpoPushTokenAsync({
        projectId:
          Constants.expoConfig?.extra?.eas.projectId || '27fbfd5c-40c0-4d79-b969-a8cffb07bc21',
      })
    ).data;
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
      lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
    });
  }

  return token;
}

export async function scheduledLocalNotification(title: string, body: string, taskDate: Date) {
  const deadline = new Date(taskDate.getTime() - 30 * 60000);

  await Notifications.scheduleNotificationAsync({
    content: {
      title: `Your task is due in 30 minutes!`,
      subtitle: title,
      body: body,
    },
    trigger: { date: deadline, seconds: 0 },
  });
}

export default function Notification() {
  const [_, setExpoPushToken] = useState<string>('');
  // const [notification, setNotification] = useState<Notifications.Notification | null>(null);
  // const notificationListener = useRef<Notifications.Subscription | null>(null);
  // const notificationResponse = useRef<Notifications.Subscription | null>(null);

  useEffect(() => {
    // Notifications.getExpoPushTokenAsync({
    //   projectId:
    //     Constants.expoConfig?.extra?.eas.projectId || '1b51b49d-5e70-4210-89a6-f3f1b022d8f5',
    // }).then((pushTokenData) => {
    //   console.log(pushTokenData);
    // });

    registerForPushNotificationsAsync().then((token) => setExpoPushToken(token as string));

    // notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
    //   console.log('NOTIFICATION ADDED');
    //   setNotification(notification);
    // });

    // notificationResponse.current = Notifications.addNotificationResponseReceivedListener(
    //   (response) => {
    //     console.log('NOTIFICATION RESPONSE');
    //     console.log(response);
    //   }
    // );

    // return () => {
    //   Notifications.removeNotificationSubscription(
    //     notificationListener.current as Notifications.Subscription
    //   );
    //   Notifications.removeNotificationSubscription(
    //     notificationResponse.current as Notifications.Subscription
    //   );
    // };
  }, []);

  return null;
}

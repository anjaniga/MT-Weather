import React, { useEffect } from 'react';
import Wheather from './src/screens/home';
import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';
import PushNotification from 'react-native-push-notification';
import { requestPermission } from './src/config';

const App = () => {
  
  useEffect(() => {
    Permissions();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
       PushNotification.localNotification({
        message: remoteMessage?.data.event,
        title: remoteMessage.messageType,
      });
    });

    return unsubscribe;
  }, []);

  PushNotification.createChannel(
    {
      channelId: "test123", // (required)
      channelName: "My_channel", // (required)
     },
    (created: any) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
  );

  const Permissions = async() => {
        await requestPermission();
  }
  
  return (
    <Wheather />
  );
};

export default App;



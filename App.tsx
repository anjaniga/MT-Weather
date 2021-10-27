import React, { useEffect } from 'react';
import Wheather from './src/screens/home';
import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';

const App = () => {
  requestUserPermission()
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
        messaging().getToken().then((res) => {
        // console.log('res: ', res);

        const registrationToken = res;

        const message = {
          data: {
            score: '850',
            time: '2:45'
          },
          token: registrationToken
        };

        // Send a message to the device corresponding to the provided
        // registration token.
        messaging().sendMessage(message)
          .then((response) => {
            // Response is a message ID string.
            console.log('Successfully sent message:', response);
          })
          .catch((error) => {
            console.log('Error sending message:', error);
          });

      })
    }
  }
  return (
    <Wheather />
  );
};

export default App;



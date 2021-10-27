import messaging from '@react-native-firebase/messaging';

const getTodaysData = async function (city: string) {
    try {
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3a18e434347fa185902c7904718169c3`,
      );
      const json = await response.json();
      return json;
    } catch (error) {
      console.error(error);
    }
  }


  const getFiveDaysData = async function (city: string) {
    try {
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=3a18e434347fa185902c7904718169c3`,
      );
      const json = await response.json();
      return json
    } catch (error) {
      console.error(error);
    }
  };

const getToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
        return fcmToken;
    } else {
        console.error('Failed', 'Token not found');
    }
}
const requestPermission = async () => {
    const authorizationStatus = await messaging().requestPermission();
    const enabled =
        authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        console.log('Authorization status:', authorizationStatus);
        let registrationToken = await getToken();

        const message = {
            data: {
                score: '850',
                time: '2:45',
            },
            token: registrationToken
        };

        messaging().sendMessage(message)
            .then((response) => {
                console.log('Successfully sent message:', response);
            })
            .catch((error) => {
                console.log('Error sending message:', error);
            });
    }
};

export {getTodaysData, getFiveDaysData,  getToken, requestPermission }

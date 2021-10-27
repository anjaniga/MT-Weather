import React, {useState, useEffect, FC} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
  ScrollView,
  StyleSheet,
} from 'react-native';
const { height, width } = Dimensions.get('window');

interface Props {
}

const images = {
  cloud: require('../../assets/image/cloud.jpg'),
  cloudrain: require('../../assets/image/cloudrain.jpg'),
  sunrise: require('../../assets/image/sunrise.jpg'),
  ice: require('../../assets/image/ice.jpg'),
}

const Wheather = ({}: Props) => {
  const [isLoading, setLoading] = useState<boolean>(true)
  const [city, setCity] = useState<string>('London');
  const [data, setData] = useState<[]>([]);
  const [today, setToday] = useState<[]>([]);

  const getTodaysData = async function (val: number) {
    try {
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3a18e434347fa185902c7904718169c3`,
      );
      const json = await response.json();
      setToday(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const getFiveDaysData = async function (val: number) {
    getTodaysData(1);
    try {
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=3a18e434347fa185902c7904718169c3`,
      );
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTodaysData(1);
    getFiveDaysData(1);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.viewSearchBox}>
        <TextInput
          placeholder="Search by city"
          style={styles.inputSearch}
          onChangeText={val => setCity(val)}
        />
        <TouchableOpacity onPress={() => getFiveDaysData(1)} style={styles.btnGo}>
          <Text style={styles.textGo}>Go</Text>
        </TouchableOpacity>
      </View>
      {data && data?.list && today ? (
        <View>
          {isLoading ? (
            <ActivityIndicator size="large" style={styles.loader} />
          ) : (
            <View style={styles.viewFullPage}>
              <View style={styles.viewTodayDetails}>
                {today?.weather[0].main == 'Rain' ? (
                  <Image
                    source={images.cloudrain}
                    style={styles.imgTodayDetails}
                  />
                ) : null}
    
                {today?.weather[0].main == 'Fog' ? (
                  <Image
                    source={images.ice}
                    style={styles.imgTodayDetails}
                  />
                ) : null}
    
                {today?.weather[0].main == 'Clear' ? (
                  <Image
                    source={images.sunrise}
                    style={styles.imgTodayDetails}
                  />
                ) : null}
    
                {today?.weather[0].main == 'Haze' ||
                  today?.weather[0].main == 'Clouds' ? (
                  <Image
                    source={images.cloud}
                    style={styles.imgTodayDetails}
                  />
                ) : null}
    
                <View style={styles.viewTodayTexts}>
                  <Text style={styles.textToday}>{today?.sys?.country}</Text>
                  <Text style={styles.textToday}>{today?.name}</Text>
                  <Text style={styles.textToday}>{today?.main?.temp} K</Text>
                </View>
              </View>
    
              <View style={styles.viewList}>
                {data?.list.map((item, index) => (
                  <TouchableOpacity key={index}>
                    {item.dt_txt.split(' ')[1] === '00:00:00' ? (
                      <View key={item.dt_txt} style={styles.viewListItem}>
                        <View style={styles.viewLeftDetails}>
                          {item.weather[0].main == 'Rain' ? (
                            <Image
                              source={images.cloudrain}
                              style={styles.imgMoreDays}
                            />
                          ) : null}
    
                          {item.weather[0].main == 'Fog' ? (
                            <Image
                              source={images.ice}
                              style={styles.imgMoreDays}
                            />
                          ) : null}
    
                          {item.weather[0].main == 'Clear' ? (
                            <Image
                              source={images.sunrise}
                              style={styles.imgMoreDays}
                            />
                          ) : null}
    
                          {item.weather[0].main == 'Haze' ||
                            item.weather[0].main == 'Clouds' ? (
                            <Image
                              source={images.cloud}
                              style={styles.imgMoreDays}
                            />
                          ) : null}
    
                          <Text>
                            {item.dt_txt.split(' ')[0].split('2021-')}
                          </Text>
                        </View>
                        <View style={styles.viewRightDetails}>
                          <View style={styles.viewSellMessage}>
                            <Text>{item.weather[0].main}</Text>
                            {item.weather[0].main == 'Rain' ? (
                              <Text>Best day to sell: Umbrella</Text>
                            ) : null}
    
                            {item.weather[0].main == 'Fog' ? (
                              <Text>Best day to sell: Jacket</Text>
                            ) : null}
    
                            {item.weather[0].main == 'Clear' ? (
                              <Text>Best day to wear: Hat</Text>
                            ) : null}
    
                            {item.weather[0].main == 'Haze' ||
                              item.weather[0].main == 'Clouds' ? (
                              <Text>Best day to: Enjoy</Text>
                            ) : null}
                          </View>
                          <Text>{item.main.temp} K</Text>
                          <View style={{ flexDirection: 'row' }}>
                            <View>
                              <Text>Wind Speed</Text>
                              <Text>{item.wind.speed} mph</Text>
                            </View>
                            <View style={styles.viewHumidity}>
                              <Text>Humidity</Text>
                              <Text>{item.main.humidity} %</Text>
                            </View>
                            <View>
                              <Text>Pressure</Text>
                              <Text>{item.main.pressure} mb</Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    ) : null}
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
        </View>
      ) : (
        <Text>No Data Found</Text>
      )}
    </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 10 },
  viewSearchBox: { flexDirection: 'row', marginTop: height * 0.02 },
  inputSearch: {
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    marginBottom: 10,
    width: width / 1.2,
  },
  btnGo: {
    height: height * 0.068,
    borderRadius: 5,
    borderColor: 'white',
    borderWidth: 1,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    backgroundColor: '#01dffc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textGo: { paddingHorizontal: width * 0.03 },
  loader: { marginTop: height / 2.5 },
  viewFullPage: { paddingBottom: 10 },
  viewTodayDetails: {
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    height: height / 3,
    backgroundColor: '#01dffc',
    borderRadius: 10,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  imgTodayDetails: {
    borderRadius: 10,
    height: 100,
    width: 100,
    resizeMode: 'contain',
  },
  viewTodayTexts: { flexDirection: 'column' },
  textToday: { paddingRight: 10, fontSize: 30, textAlign: 'right' },
  viewList: {
    borderRadius: 10,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderColor: 'white',
    borderWidth: 1,
  },
  viewListItem: {
    flexDirection: 'row',
    paddingVertical: 20,
    borderBottomColor: 'white',
    borderWidth: 1,
  },
  viewLeftDetails: {
    paddingLeft: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgMoreDays: { borderRadius: 10, height: 25, width: 25, resizeMode: 'contain' },
  viewRightDetails: { flexDirection: 'column', marginLeft: 20 },
  viewSellMessage: { flexDirection: 'row', justifyContent: 'space-between' },
  viewHumidity: { paddingHorizontal: 20 },
});

export default Wheather;



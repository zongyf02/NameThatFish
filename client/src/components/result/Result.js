import { Entypo } from '@expo/vector-icons';
import { memo } from 'react';
import {
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import fishData from './fish.json';

const FishInformation = ({ fish }) => {
  const otherPictures = [{ id: 1 }, { id: 2 }, { id: 3 }];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: 16 }}>
        <Text style={styles.name}>{fish.name}</Text>
        <Text style={styles.scientificName}>{fish.scientificName}</Text>

        <View style={styles.imageContainer}>
          <View style={styles.otherImageContainer}>
            {otherPictures.map((otherPicture) => {
              return (
                <Image
                  key={otherPicture.id}
                  fadeDuration={1000}
                  style={styles.otherImage}
                  resizeMode="contain"
                  source={require('../../../assets/fish.png')}
                />
              );
            })}
          </View>
          <Image
            fadeDuration={1000}
            style={styles.image}
            resizeMode="contain"
            source={require('../../../assets/fish.png')}
          />
        </View>

        <Text style={styles.subTitle}>Overview</Text>
        <Text style={styles.description}>{fish.description}</Text>

        <Text style={styles.subTitle}>Habitat</Text>
        <Text style={styles.description}>{fish.habitat}</Text>

        <Text style={styles.subTitle}>Diet</Text>
        <Text style={styles.description}>{fish.diet}</Text>

        <Text style={styles.subTitle}>Life Cycle</Text>
        <Text style={styles.description}>{fish.lifecycle}</Text>

        <Text style={styles.subTitle}>Reference</Text>
        {fish.references.map((reference) => (
          <Text
            key={reference}
            style={styles.description}
            onPress={() => Linking.openURL(reference)}
          >
            {reference}
          </Text>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const Drawer = createDrawerNavigator();

const Result = () => {
  return (
    <Drawer.Navigator
      initialRouteName={fishData[0].name}
      screenOptions={({ navigation }) => ({
        drawerPosition: 'right',
        headerLeft: false,
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Entypo style={{marginRight: 12}} name="list" size={24} color="#686868" />
          </TouchableOpacity>
        ),
      })}
    >
      {fishData.map((fish) => (
        <Drawer.Screen
          key={fish.name}
          name={fish.name}
          component={memo(() => (
            <FishInformation fish={fish} />
          ))}
        />
      ))}
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: '#FFFFFF',
  },
  description: {
    color: '#52647A',
    fontSize: 16,
    lineHeight: 24,
  },
  image: {
    width: 350,
    height: 300,
    alignSelf: 'center',
    marginLeft: 36,
    transform: [{ scaleX: -1 }],
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    color: '#011936',
    fontSize: 36,
    fontWeight: '600',
    paddingVertical: 12,
  },
  otherImage: {
    height: 100,
    width: 100,
    backgroundColor: '#DAE0E6',
    borderRadius: 12,
    marginTop: 5,
    marginBottom: 5,
  },
  otherImageContainer: {
    flexDirection: 'column',
  },
  scientificName: {
    color: '#00000087',
    fontSize: 20,
    paddingBottom: 20,
  },
  subTitle: {
    color: '#00000087',
    fontSize: 24,
    fontWeight: '500',
    paddingVertical: 12,
  },
});

export default Result;

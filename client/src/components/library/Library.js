import { Entypo } from '@expo/vector-icons';
import { memo, useState, useEffect, useRef } from 'react';
import {
  Image,
  Linking,
  ScrollView,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';

import fishData from './fish.json';
import importFish from './importFish';
import styles from './style';

const useSafeLoad = () => {
  const safeLoad = useRef(false);

  useEffect(() => {
    safeLoad.current = true;

    return () => (safeLoad.current = false);
  }, []);

  return safeLoad;
};

const FishInformation = ({ fish, navigation }) => {
  const safeLoad = useSafeLoad();
  const [images, setImages] = useState({
    large: null,
    small: {
      small1: null,
      small2: null,
      small3: null,
    },
  });

  useEffect(() => {
    importFish(fish.name)
      .then((data) => {
        if (safeLoad.current) {
          setImages(data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: 16 }}>
        <View style={styles.header}>
          <Text style={styles.name}>{fish.name}</Text>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Entypo name="list" size={28} color="#686868" />
          </TouchableOpacity>
        </View>
        <Text style={styles.scientificName}>{fish.scientificName}</Text>

        <View style={styles.imageContainer}>
          <View style={styles.otherImageContainer}>
            {Object.entries(images.small).map(([size, image]) => (
              <Image
                key={size}
                fadeDuration={1000}
                style={styles.otherImage}
                resizeMode="stretch"
                source={image?.default}
              />
            ))}
          </View>
          <Image
            fadeDuration={1000}
            style={styles.image}
            resizeMode="contain"
            source={images?.large?.default}
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

const Library = ({ route }) => {
  const navigation = useNavigation();

  useEffect(() => {
    const name = route?.params?.name;
    if (name) navigation.navigate(name);
  }, [route?.params?.name]);

  return (
    <Drawer.Navigator
      initialRouteName={fishData[0].name}
      screenOptions={{
        drawerPosition: 'right',
        headerShown: false,
      }}
    >
      {fishData.map((fish) => (
        <Drawer.Screen
          key={fish.name}
          name={fish.name}
          component={memo((props) => (
            <FishInformation fish={fish} {...props} />
          ))}
        />
      ))}
    </Drawer.Navigator>
  );
};

export default Library;

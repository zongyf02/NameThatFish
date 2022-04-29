import { AntDesign, Entypo } from '@expo/vector-icons';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const Header = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        paddingVertical: 12,
      }}
    >
      <TouchableOpacity>
        <AntDesign name="left" size={24} color="#686868" />
      </TouchableOpacity>
      <TouchableOpacity>
        <Entypo name="dots-three-vertical" size={24} color="#686868" />
      </TouchableOpacity>
    </View>
  );
};

const Result = () => {
  const otherPictures = [{ id: 1 }, { id: 2 }, { id: 3 }];

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: 16 }}>
        <Text style={styles.name}>Fighting Fish</Text>
        <Text style={styles.scientificName}>Betta splendens</Text>

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
        <Text style={styles.description}>
          Qui amet proident ad pariatur eu velit non cillum sint ea deserunt ad. Quis ipsum occaecat
          dolor non proident aliquip ipsum nisi irure consequat ad adipisicing excepteur ex. Dolore
          enim esse elit labore pariatur voluptate ut. Nisi magna esse dolor aliquip velit do
          voluptate enim qui et. Aliquip dolor ex nostrud exercitation mollit laboris pariatur amet
          laboris quis enim occaecat deserunt velit. Pariatur sit veniam sit ad nostrud duis
          proident quis eiusmod incididunt veniam adipisicing cillum. Voluptate cupidatat anim culpa
          deserunt ea eu duis labore. Do irure id occaecat nisi eiusmod culpa laboris ad mollit
          nulla. Aliquip occaecat nulla in consectetur Lorem id ullamco. Fugiat veniam officia
          pariatur voluptate. Minim laborum ea duis fugiat ex velit do.
        </Text>

        <Text style={styles.subTitle}>Need to know</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

// TouchableHighlight, Button, Alert, ImageBackground, TouchableOpacity, Modal

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

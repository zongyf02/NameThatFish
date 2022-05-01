// Libraries
// import style from './style';
import React, { useRef, useState, useEffect } from 'react';

// Components
import {
  View,
  Text,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Platform,
  StatusBar,
  FlatList,
} from 'react-native';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

// Flux
import { useDispatch, useSelector } from 'react-redux';
import * as imagesTypes from '../../redux/reducers/images/actionTypes';
import * as imagesSelectors from '../../redux/reducers/images/reducer';
import { Card } from '../card';

const { width: screenWidth } = Dimensions.get('window');

const Gallery = () => {
  const { width: screenWidth } = Dimensions.get('window');
  const [isListView, setListView] = useState(false);
  const carouselRef = useRef(null);

  // dispatchers
  const dispatch = useDispatch();
  const addPhotos = () => {
    dispatch({ type: imagesTypes.ADD_PHOTOS_REQUESTED, photo: null });
  };
  const clearPhotos = () => {
    dispatch({ type: imagesTypes.CLEAR_PHOTOS });
  };

  // selectors
  const photos = useSelector(imagesSelectors.getPhotos);

  const onPressPhoto = (item) => {
    if (item.title === 'upload more') {
      addPhotos();
    } else {
      // selectItems([...selectedItems, item.id]);
    }
  };

  const renderPhotos = ({ item }) => {
    return <Card item={item} pressAction={onPressPhoto} />;
  };

  const renderItem = ({ item, index }, parallaxProps) => {
    return (
      <TouchableOpacity
        onLongPress={() => {
          onPressPhoto(item);
        }}
      >
        <View style={styles.item}>
          <ParallaxImage
            source={{ uri: item.photo }}
            containerStyle={styles.imageContainer}
            style={styles.image}
            parallaxFactor={0.4}
            {...parallaxProps}
          />
          <Text style={styles.itemLabel} numberOfLines={2}>
            {item.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const switchGalleryView = () => {
    setListView(!isListView);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginHorizontal: 20,
          marginVertical: 16,
        }}
      >
        <Text style={styles.galleryTitle}>NameThatFish</Text>
        <TouchableOpacity onPress={switchGalleryView}>
          {isListView ? (
            <MaterialIcons name='view-carousel' size={32} style={styles.galleryIcon}/>
          ) : (
            <AntDesign name='appstore1' size={28} style={styles.galleryIcon} />
          )}
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        {isListView ? (
          <FlatList
            vertical
            showsVerticalScrollIndicator={false}
            numColumns={2}
            data={photos}
            renderItem={renderPhotos}
            keyExtractor={(item) => `${item.id}`}
          />
        ) : (
          <View>
            <Carousel
              ref={carouselRef}
              sliderWidth={screenWidth}
              sliderHeight={screenWidth}
              itemWidth={screenWidth - 120}
              data={photos}
              renderItem={renderItem}
              hasParallaxImages={true}
              loop={true}
              enableMomentum={true}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Gallery;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  item: {
    width: screenWidth - 125,
    height: screenWidth,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 15,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'contain',
  },
  itemLabel: {
    color: 'grey',
    opacity: 0.35,
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 10,
  },
  galleryTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#00a4e6',
    opacity: 0.7,
  },
  galleryIcon: {
    color: 'black',
    opacity: 0.5,
  },
});

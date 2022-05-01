// Libraries
// import style from './style';
import React, { useRef, useState, useEffect } from 'react';

// Components
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform,
  FlatList,
} from 'react-native';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import { Ionicons } from '@expo/vector-icons';

// Flux
import { useDispatch, useSelector } from 'react-redux';
import * as imagesTypes from '../../redux/reducers/images/actionTypes';
import * as imagesSelectors from '../../redux/reducers/images/reducer';
import { Card } from '../card';

const { width: screenWidth } = Dimensions.get('window');

const Gallery = () => {
  const { width: screenWidth } = Dimensions.get('window');
  const [isListView, setListView] = useState(false);
  const [galleryIcon, setGalleryIcon] = useState('contract');
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
    setGalleryIcon(galleryIcon == 'contract' ? 'expand' : 'contract');
  };

  return (
    <View style={{ flex: 1, paddingTop: 20 }}>
      <View
        style={{
          flexDirection: 'row',
          borderColor: 'red',
          borderRadius: 3,
        }}
      >
        <Text style={styles.galleryTitle}>NameThatFish</Text>
        <TouchableOpacity onPress={switchGalleryView}>
          <Ionicons name={galleryIcon} size={28} style={styles.galleryIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
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
        )}
      </View>
    </View>
  );
};

export default Gallery;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: screenWidth / 7,
    marginBottom: 5,
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
    marginTop: 30,
    marginLeft: 20,
  },
  galleryIcon: {
    color: 'black',
    opacity: 0.5,
    flex: 1,
    marginTop: 40,
    marginLeft: screenWidth / 5,
  },
});

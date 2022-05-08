// Libraries
import styles from './style';
import React, { useEffect, useRef, useState } from 'react';

// Components
import {
  View,
  Text,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import { AntDesign, Feather, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Card } from '../card';

// Flux
import { useDispatch, useSelector } from 'react-redux';
import * as imagesTypes from '../../redux/reducers/images/actionTypes';
import * as imagesSelectors from '../../redux/reducers/images/reducer';
import * as modelTypes from '../../redux/reducers/model/actionTypes';
import * as modelSelectors from '../../redux/reducers/model/reducer';

const { width: screenWidth } = Dimensions.get('window');

const Gallery = ({ navigation }) => {
  // state
  const [isListView, setListView] = useState(false);
  const carouselRef = useRef(null);

  // selectors
  const photos = useSelector(imagesSelectors.getPhotos);
  const result = useSelector(modelSelectors.getResults);

  // dispatchers
  const dispatch = useDispatch();
  const addPhotos = () => {
    dispatch({ type: imagesTypes.ADD_PHOTOS_REQUESTED, photo: null });
  };
  const clearPhotos = () => {
    dispatch({ type: imagesTypes.CLEAR_PHOTOS });
    dispatch({ type: modelTypes.CLEAR_RESULTS });
  };

  // if result is cached use result, otherwise fetch from api
  const getResult = (item) => {
    dispatch({ type: modelTypes.GET_RESULT_REQUESTED, photo: item.photo, id: item.id });
  };

  useEffect(() => {
    if (result) {
      const name = result.result.prediction;
      if (name == 'Not Recognized') {
        Alert.alert(
          'Not recognized',
          'There is no fish that matches with your image. Please try agin with a different image.',
          [{ text: 'OK' }]
        );
      } else {
        navigation.navigate('Library', { name });
      }
    }
  }, [result]);

  const onPressPhoto = (item) => {
    // adds more images to gallery
    if (item.title === 'upload more') {
      addPhotos();
    }
    // sends selected image to be processed for result
    else {
      getResult(item);
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
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={clearPhotos} style={{ marginRight: 12 }}>
            <FontAwesome name="remove" size={26} style={styles.galleryIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={switchGalleryView}>
            {isListView ? (
              <MaterialIcons name="view-carousel" size={32} style={styles.galleryIcon} />
            ) : (
              <AntDesign name="appstore1" size={28} style={styles.galleryIcon} />
            )}
          </TouchableOpacity>
        </View>
      </View>
      {!isListView && (
        <View style={styles.infoContainer}>
          <Feather name="info" size={20} color="white" />
          <Text style={styles.infoText}>Press the image long to upload or predict an image.</Text>
        </View>
      )}
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

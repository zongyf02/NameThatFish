// Libraries
import style from './style';

// Components
import { View, FlatList, useState } from 'react-native';

// Flux
import { useDispatch, useSelector } from 'react-redux';
import * as imagesTypes from '../../redux/reducers/images/actionTypes';
import * as imagesSelectors from '../../redux/reducers/images/reducer';
import { Card } from '../card';

const ImgUploader = () => {
  // state
  // const [selectedItems, selectItems] = useState();

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

  return (
    <View>
      <FlatList
        vertical
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={photos}
        renderItem={renderPhotos}
        keyExtractor={(item) => `${item.id}`}
      />
    </View>
  );
};

export default ImgUploader;

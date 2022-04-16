// Libraries
import style from './style';

// Components
import { Text, View, Image, TouchableOpacity } from 'react-native';

/*
  Card is a reusable component that contains an image and 
  performs an action when pressed. 
*/
const Card = ({ item, pressAction }) => {
  return (
    <TouchableOpacity onPress={() => pressAction(item)}>
      <View style={style.container}>
        <Image style={style.photo} source={{ uri: item.photo }} />
        {item.showText && (
          <>
            <Text style={style.title}>{item.title}</Text>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default Card;

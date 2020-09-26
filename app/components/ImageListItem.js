import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

function ImageListItem(props) {
  const {imageItem, imageClick, numColumns} = props;

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {height: Dimensions.get('window').width / numColumns},
      ]}
      onPress={() => imageClick(imageItem)}>
      <View style={styles.innerContainer}>
        <Image
          style={styles.image}
          source={{
            uri: numColumns === 1 ? imageItem.url : imageItem.thumbnailUrl,
          }}
        />
        <Text style={{color: '#fff'}} numberOfLines={1}>
          {imageItem.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#37474f',
    margin: 2,
    padding: 5,
    borderRadius: 5,
    elevation: 10,
    alignItems: 'stretch',
    justifyContent: 'center',
    flex: 1,
  },
  innerContainer: {
    alignItems: 'stretch',
    justifyContent: 'center',
    flex: 1,
  },
  image: {
    flex: 1,
    borderRadius: 10,
  },
});

export default ImageListItem;

import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Modal,
  Dimensions,
} from 'react-native';
import {connect} from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {getImageList} from '../actions/imageActions';
import ImageListItem from './ImageListItem';
import ImageModal from './ImageModal';

function MainScreen(props) {
  const {isLoading, imageList, error, loadImages} = props;

  const [isGridLayout, setIsGridLayout] = useState(true);
  const [numColumns, setNumColumns] = useState(3);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState();

  useEffect(() => {
    loadImages();
  }, []);

  useEffect(() => {
    // Update num columns when gridLayout value changes
    setNumColumns(isGridLayout ? 3 : 1);
  }, [isGridLayout]);

  useEffect(() => {}, [imageList]);

  const imageClickHandler = (imageItem) => {
    console.log('Image clicked:', imageItem);
    setSelectedImage(imageItem);
    setModalVisible(true);
  };

  const closeModalHandler = () => {
    setModalVisible(false);
    setSelectedImage(null);
  };

  const renderItem = ({item}) => {
    if (item.empty === true) {
      //   Return invisible view to fill up blank items in last row
      return <View style={[styles.item, styles.itemInvisible]} />;
    } else {
      return (
        <ImageListItem
          imageItem={item}
          imageClick={imageClickHandler}
          numColumns={numColumns}
        />
      );
    }
  };

  const formatData = (data) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);

    let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
    while (
      numberOfElementsLastRow !== numColumns &&
      numberOfElementsLastRow !== 0
    ) {
      data.push({Name: `blank-${numberOfElementsLastRow}`, empty: true});
      numberOfElementsLastRow++;
    }

    return data;
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator style={{flex: 1}} size="large" color="#263238" />
      ) : (
        <>
          {/* Toggle view container */}
          <View style={styles.toggleContainer}>
            <TouchableOpacity
              style={styles.toggleButton}
              onPress={() => setIsGridLayout(!isGridLayout)}>
              <View style={styles.toggleButtonContainer}>
                {/* Grid layout button */}
                <View
                  style={[
                    styles.gridLayoutButton,
                    isGridLayout ? styles.buttonEnabled : styles.buttonDisabled,
                  ]}>
                  <MaterialCommunityIcons
                    name="grid"
                    size={24}
                    color={isGridLayout ? '#fff' : '#999'}
                  />
                </View>
                {/* List layout button */}
                <View
                  style={[
                    styles.listLayoutButton,
                    !isGridLayout
                      ? styles.buttonEnabled
                      : styles.buttonDisabled,
                  ]}>
                  <MaterialCommunityIcons
                    name="format-list-bulleted"
                    size={24}
                    color={!isGridLayout ? '#fff' : '#999'}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <FlatList
            key={numColumns}
            data={formatData(imageList)}
            renderItem={renderItem}
            keyExtractor={(item) => (item.id ? item.id.toString() : null)}
            numColumns={numColumns}
          />
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(false);
              setSelectedImage(null);
            }}>
            <ImageModal image={selectedImage} closeModal={closeModalHandler} />
          </Modal>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#cfd8dc',
  },
  toggleContainer: {
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#263238',
    flexDirection: 'row',
  },
  toggleButtonContainer: {
    flexDirection: 'row',
  },
  gridLayoutButton: {
    paddingLeft: 12,
    paddingRight: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    marginRight: 2,
    paddingVertical: 5,
    backgroundColor: '#000',
  },
  listLayoutButton: {
    paddingLeft: 10,
    paddingRight: 12,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    paddingVertical: 5,
  },
  buttonEnabled: {
    backgroundColor: '#607d8b',
  },
  buttonDisabled: {
    backgroundColor: '#37474f',
  },
  item: {
    margin: 2,
    padding: 5,
    flex: 1,
    height: Dimensions.get('window').width / 3, // approximate a square
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
});

const mapStateToProps = (state) => {
  return {...state};
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadImages: () => dispatch(getImageList()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);

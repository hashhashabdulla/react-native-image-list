import React from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {
  gestureHandlerRootHOC,
  PinchGestureHandler,
  State,
} from 'react-native-gesture-handler';

const ImageModal = gestureHandlerRootHOC((props) => {
  const {image, closeModal} = props;

  let _scale = new Animated.Value(1);

  const pinchHandler = Animated.event([{nativeEvent: {scale: _scale}}], {
    useNativeDriver: true,
  });

  const pinchHandlerStateChange = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      Animated.spring(_scale, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={styles.modalOverlay}></View>
      </TouchableWithoutFeedback>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View>
            <PinchGestureHandler
              onGestureEvent={pinchHandler}
              onHandlerStateChange={pinchHandlerStateChange}>
              <Animated.Image
                style={[styles.image, {transform: [{scale: _scale}]}]}
                source={{
                  uri: image.url,
                }}
              />
            </PinchGestureHandler>
          </View>
          <Text style={styles.titleText} numberOfLines={1}>
            {image.title}
          </Text>
        </View>
      </View>
    </>
  );
});

const styles = StyleSheet.create({
  modalOverlay: {
    backgroundColor: '#000000',
    opacity: 0.5,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    position: 'absolute',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    borderRadius: 5,
    height: Dimensions.get('window').width - 60,
    zIndex: 2,
  },
  titleText: {
    color: '#000',
    alignSelf: 'center',
    marginTop: 5,
    zIndex: 1,
  },
});

export default ImageModal;

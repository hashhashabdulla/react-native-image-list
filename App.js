import React from 'react';
import {SafeAreaView, StyleSheet, Text, StatusBar} from 'react-native';
import {Provider} from 'react-redux';

import store from './app/store';
import MainScreen from './app/components/MainScreen';

function App() {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        <Provider store={store}>
          <MainScreen />
        </Provider>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;

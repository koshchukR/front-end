import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';

import Header from './src/header/header';
import Languages from './src/main-page/languages';

const App = (): JSX.Element => {
  return (
    <SafeAreaView>
      <ScrollView style={styles.main}>
        <Header />
        <Languages />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#F3F3F3',
    height: '100%',
    paddingHorizontal: '5%',
  },
});

export default App;

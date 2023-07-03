import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import TranslationIcon from '../assets/translations';

const Header = (): JSX.Element => {
  return (
    <SafeAreaView>
      <View style={[styles.header, styles.rowContainer]}>
        <Text style={styles.mainText}>Main Page /</Text>
        <Text style={styles.text}> Translations</Text>
      </View>
      <View style={[styles.header, styles.rowContainer]}>
        <Text style={styles.text}>Translations</Text>
        <TranslationIcon />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#FFF',
    marginVertical: 10,
    padding: 15,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginRight: 10,
    flex: 1,
  },
  icon: {
    width: 15,
    height: 14,
  },
  mainText: {
    color: '#858585',
  },
});

export default Header;

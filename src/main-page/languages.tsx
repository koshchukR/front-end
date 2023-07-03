import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Line from './line';
import GermanyIcon from '../assets/germany';
import UnitedKingdomIcon from '../assets/uk';
import SpainIcon from '../assets/spain';
import FranceIcon from '../assets/france';
import ItalyIcon from '../assets/italy';
import LithuaniaIcon from '../assets/lithuania';
import LatviaIcon from '../assets/latvia';
import NetherlandsIcon from '../assets/netherlands';
import PolandIcon from '../assets/poland';
import PortugalIcon from '../assets/portugal';
import SlovakiaIcon from '../assets/slovakia';
import Translation from './translation';

const Languages = (): JSX.Element => {
  const [activeCircle, setActiveCircle] = useState('');
  const [languages, setLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('');

  useEffect(() => {
    fetchLanguages();
  }, []);

  const fetchLanguages = async () => {
    try {
      const response = await fetch('http://localhost:3000/languages');
      const data = await response.json();
      setLanguages(data);
      if (data.length > 0) {
        setSelectedLanguage(data[0].lang_short);
      }
    } catch (error) {
      console.log('Error fetching languages:', error);
    }
  };

  const handleCirclePress = (circleValue: string) => {
    setActiveCircle(circleValue);
    setSelectedLanguage(circleValue);
  };

  const renderCircle = (circleValue: string) => {
    const isActive = activeCircle === circleValue;
    const circleStyle = isActive
      ? [styles.circle, styles.activeCircle]
      : styles.circle;
    return (
      <TouchableOpacity
        style={circleStyle}
        onPress={() => handleCirclePress(circleValue)}
        activeOpacity={0.8}
      />
    );
  };

  return (
    <View style={styles.main}>
      <View style={styles.rowContainer}>
        <Text>Country</Text>
        <Text style={styles.text}>Description</Text>
        <Text style={styles.text}>Translations field</Text>
      </View>
      <View style={styles.line}>
        <Line />
      </View>
      {languages.map(language => (
        <React.Fragment key={language._id}>
          <View style={styles.rowContainerCountry}>
            {getLanguageIcon(language.lang_short)}
            <Text style={[styles.text, styles.description]}>
              {language.lang_short}
            </Text>
            <View style={styles.rowContainer}>
              <Text style={styles.text}>
                {language.items}/{language.total}
              </Text>
              {renderCircle(language.lang_short)}
            </View>
          </View>
          <View style={styles.line}>
            <Line />
          </View>
        </React.Fragment>
      ))}
      <Translation activeLanguage={selectedLanguage} />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#FFF',
    marginVertical: 10,
    padding: 15,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowContainerCountry: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    paddingLeft: 10,
  },
  text: {
    marginRight: 10,
  },
  line: {
    marginTop: 15,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#D6D6D6',
  },
  activeCircle: {
    backgroundColor: '#3DB498',
  },
  description: {
    position: 'absolute',
    left: 90,
  },
});

const getLanguageIcon = (langShort: string) => {
  switch (langShort) {
    case 'GE':
      return <GermanyIcon />;
    case 'ge_GE':
      return <GermanyIcon />;
    case 'EN':
      return <UnitedKingdomIcon />;
    case 'en_EN':
      return <UnitedKingdomIcon />;
    case 'ES':
      return <SpainIcon />;
    case 'es_ES':
      return <SpainIcon />;
    case 'FR':
      return <FranceIcon />;
    case 'fr_FR':
      return <FranceIcon />;
    case 'IT':
      return <ItalyIcon />;
    case 'it_IT':
      return <ItalyIcon />;
    case 'LT':
      return <LithuaniaIcon />;
    case 'lt_LT':
      return <LithuaniaIcon />;
    case 'LV':
      return <LatviaIcon />;
    case 'lv_LV':
      return <LatviaIcon />;
    case 'NL':
      return <NetherlandsIcon />;
    case 'nl_NL':
      return <NetherlandsIcon />;
    case 'PL':
      return <PolandIcon />;
    case 'pl_PL':
      return <PolandIcon />;
    case 'PT':
      return <PortugalIcon />;
    case 'pt_PT':
      return <PortugalIcon />;
    case 'SK':
      return <SlovakiaIcon />;
    case 'sk_SK':
      return <SlovakiaIcon />;
    default:
      return 'Country';
  }
};

export default Languages;

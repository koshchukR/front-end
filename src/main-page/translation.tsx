import React, {useEffect, useState} from 'react';
import {
  Linking,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';

const Translation = ({
  activeLanguage,
}: {
  activeLanguage: string;
}): JSX.Element => {
  const [languages, setLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState(activeLanguage);
  const [modalVisible, setModalVisible] = useState(false);
  const [newLanguage, setNewLanguage] = useState('');
  const [newLanguageTranslation, setNewLanguageTranslation] = useState('');
  const [importModalVisible, setImportModalVisible] = useState(false);
  const [importFileName, setImportFileName] = useState('');

  useEffect(() => {
    fetchLanguages();
  }, []);

  useEffect(() => {
    setSelectedLanguage(activeLanguage);
  }, [activeLanguage]);

  const fetchLanguages = async () => {
    try {
      const response = await fetch('http://localhost:3000/languages');
      const data = await response.json();
      setLanguages(data);
    } catch (error) {
      console.log('Error fetching languages:', error);
    }
  };

  const handleAddLanguage = () => {
    setModalVisible(true);
  };

  const handleModalSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3000/languages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          language: newLanguage,
          lang_short: newLanguageTranslation,
        }),
      });
      if (response.ok) {
        console.log('Language updated successfully');
      } else {
        console.log('Error updating language:', response.status);
      }
    } catch (error) {
      console.log('Error updating language:', error);
    }
    setModalVisible(false);
    setNewLanguage('');
    setNewLanguageTranslation('');
  };
  const handleCloseModal = () => {
    setModalVisible(false);
    setNewLanguage('');
    setNewLanguageTranslation('');
  };

  const handleImportModalOpen = () => {
    setImportModalVisible(true);
  };

  const handleImportModalSubmit = async () => {
    if (
      importFileName.endsWith('.json') ||
      importFileName.endsWith('.yaml') ||
      importFileName.endsWith('.xlsx')
    ) {
      const endpoint = `http://localhost:3000/locales/${selectedLanguage}/${importFileName}`;
      try {
        const response = await fetch(endpoint);
        console.log('endpoint', endpoint);
        if (response.ok) {
          const fileData = await response.text();
          console.log('File data:', fileData);
          await Linking.openURL(endpoint);
        } else {
          console.log('Error fetching file:', response.status);
        }
      } catch (error) {
        console.log('Error fetching file:', error);
      }
    } else {
      console.log('Invalid file extension. Please use .json, .yaml, or .xlsx');
    }
    setImportModalVisible(false);
    setImportFileName('');
  };

  const handleImportModalClose = () => {
    setImportModalVisible(false);
    setImportFileName('');
  };

  const handleExport = async () => {
    try {
      const res = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
        type: [DocumentPicker.types.allFiles],
        allowMultiSelection: false,
      }).then(value => value[0]);
      const fileUri = res.uri;
      const fileName = res.name;

      const endpoint = `http://localhost:3000/locales/add/${selectedLanguage}/${fileName}`;
      const formData = new FormData();
      formData.append('file', {
        uri: fileUri,
        type: res.type,
        name: fileName,
      });

      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('File uploaded successfully');
      } else {
        console.log('Error uploading file:', response.status);
      }
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        console.log('File selection cancelled');
      } else {
        console.log('Error selecting file:', error);
      }
    }
  };

  return (
    <View style={styles.main}>
      <View style={styles.rowAlign}>
        <TouchableOpacity onPress={handleExport}>
          <Text style={styles.exportButtonText}>Export</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.rowAlign}>
        <TouchableOpacity
          style={styles.addLanguageButton}
          onPress={handleAddLanguage}>
          <Text style={styles.addButtonText}>Add language</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleImportModalOpen}>
          <Text style={styles.exportButtonText}>Import</Text>
        </TouchableOpacity>
      </View>
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCloseModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Language</Text>
            <TextInput
              style={styles.modalTextInput}
              placeholder="Enter new language"
              value={newLanguage}
              onChangeText={setNewLanguage}
            />
            <TextInput
              style={styles.modalTextInput}
              placeholder="Enter short name of language"
              value={newLanguageTranslation}
              onChangeText={setNewLanguageTranslation}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleCloseModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleModalSubmit}>
              <Text style={styles.modalButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        visible={importModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleImportModalClose}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Import File</Text>
            <TextInput
              style={styles.modalTextInput}
              placeholder="Enter file name with extension (.json, .yaml, .xlsx)"
              value={importFileName}
              onChangeText={setImportFileName}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleImportModalClose}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleImportModalSubmit}>
              <Text style={styles.modalButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#FFF',
    marginVertical: 10,
    padding: 15,
  },
  column30: {
    width: '25%',
    marginLeft: 5,
  },
  column65: {
    width: '60%',
    marginLeft: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  columnsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 15,
  },
  closeButton: {
    backgroundColor: '#D9D9D9',
    padding: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  closeButtonText: {
    color: '#616161',
    fontSize: 15,
    fontWeight: '400',
  },
  refreshButton: {
    backgroundColor: '#3DB498',
    padding: 10,
    alignItems: 'center',
    width: 100,
  },
  refreshButtonText: {
    fontSize: 15,
    fontWeight: '400',
    color: '#FFF',
  },
  keyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4F4F4',
    padding: 10,
    width: '30%',
  },
  keyButtonText: {
    fontSize: 15,
    fontWeight: '400',
    marginRight: 15,
  },
  languageButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#F4F4F4',
    padding: 10,
    alignItems: 'center',
    width: '65%',
  },
  iconArrowLeftContainer: {
    marginRight: 50,
    justifyContent: 'flex-start',
  },
  iconArrowRightContainer: {
    marginLeft: 50,
    justifyContent: 'flex-end',
  },
  addLanguageButton: {
    backgroundColor: '#F4F4F4',
    padding: 10,
    alignItems: 'center',
    width: 120,
  },
  addKeyButton: {
    backgroundColor: '#F4F4F4',
    padding: 10,
    alignItems: 'center',
    width: 90,
  },
  addButtonText: {
    fontSize: 15,
    fontWeight: '400',
  },
  rowAlign: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  exportButtonText: {
    color: '#658BA5',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalTextInput: {
    backgroundColor: '#F4F4F4',
    padding: 10,
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: '#3DB498',
    padding: 10,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '400',
  },
});

export default Translation;

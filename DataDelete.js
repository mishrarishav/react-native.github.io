import React, { useState, useEffect } from 'react';
import { View, Button, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { deleteData, getData, deleteRow ,initializeDatabase,} from './databaseHandler';
import { Picker } from '@react-native-picker/picker';

function DataDelete({ setCurrentPage, onLogout }) {
  const [selectedPage, setSelectedPage] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [selectedPage]);

  const fetchData = async () => {
    try {
      await initializeDatabase(); // Ensure the database is initialized
      if (selectedPage) {
        const dataFromDb = await getData(selectedPage);
        setData(dataFromDb);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleDelete = async () => {
    if (selectedPage === 'InputHandler') {
      await deleteData(selectedPage, startDate, endDate);
      fetchData();
    }
  };

  const handleDeleteRow = async (id) => {
    Alert.alert(
      "Delete Row",
      "Are you sure you want to delete this row?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "OK", onPress: async () => {
          await deleteRow(selectedPage, id);
          fetchData();
        }}
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={{ 
        fontSize: 28,
         fontWeight: 'bold', 
         color: 'black', 
         textAlign: 'center',
          fontFamily: 'Arial, sans-serif',
           backgroundColor: '#f0f0f0',
            padding: 10
             }}>Delete Page</Text>
        <Image source={require('./photo/rsb.png')} style={{
        bottom: 12,
        height: 140,
        width: 300,
      }}></Image>

<View style={{width:76 ,left:260, bottom:385}}>     
<Button title="log out" color="red"  onPress={onLogout} />
</View>
      <View style={{ position: 'absolute', top: -60, right: 290 }}>
        <TouchableOpacity onPress={() => setCurrentPage('Navigate')}>
          <Image source={require('./photo/back.png')} style={{}} />
        </TouchableOpacity>
      </View>
      <View style={styles.pickerContainer}>
      <Picker
        style={{ borderWidth: 1, borderRadius: 20, marginBottom: 10 }}
        selectedValue={selectedPage}
        onValueChange={(itemValue) => setSelectedPage(itemValue)}
      >
        <Picker.Item label="Select page" value="" />
        <Picker.Item label="Part" value="PartCreate" />
        <Picker.Item label="User" value="UserPage" />
        <Picker.Item label="Scanning" value="InputHandler" />
      </Picker>
      </View>
      {selectedPage === 'InputHandler' && (
        <>
          <TextInput
            value={startDate}
            onChangeText={setStartDate}
            placeholder="Enter start date (YYYY-MM-DD)"
          />

          <TextInput
            value={endDate}
            onChangeText={setEndDate}
            placeholder="Enter end date (YYYY-MM-DD)"
          />

          <Button title="Delete Data" onPress={handleDelete} color="red"/>
        </>
      )}

{selectedPage === 'PartCreate' && (
      <>
        <Text style={styles.listHeader}>Part</Text>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleDeleteRow(item.id)}>
              <View style={styles.listItem}>
                <Text>{item.part}</Text>
                <Text>{item.created_on}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </>
    )}
   {selectedPage === 'UserPage' && (
      <>
        <Text style={styles.listHeader}>User</Text>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleDeleteRow(item.id)}>
              <View style={styles.listItem}>
                <Text>{item.username}</Text>
                <Text>{item.role}</Text>
                <Text>{item.password}</Text>
                <Text>{item.created_on}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </>
    )}

 {selectedPage === 'InputHandler' && (
      <>
        <Text style={styles.listHeader}>Scanning</Text>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleDeleteRow(item.id)}>
              <View style={styles.listItem}>
                <Text>{item.scan_detail}</Text>
                <Text>{item.vendor}</Text>
                <Text>{item.part}</Text>
                <Text>{item.serial_no}</Text>
                <Text>{item.created_on}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </>
    )}
  </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    position:"relative"
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#f0f0f0',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  pickerContainer: {
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',


  },
});

export default DataDelete;
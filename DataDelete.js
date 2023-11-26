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
      <View style={{ position: 'absolute', top: -60, right: 290 }}>
        <TouchableOpacity onPress={() => setCurrentPage('Navigate')}>
          <Image source={require('./photo/back.png')} style={{}} />
        </TouchableOpacity>
      </View>
      <Picker
        style={{ borderWidth: 1, borderRadius: 20, marginBottom: 10 }}
        selectedValue={selectedPage}
        onValueChange={(itemValue) => setSelectedPage(itemValue)}
      >
        <Picker.Item label="Select page" value="" />
        <Picker.Item label="PartCreate" value="PartCreate" />
        <Picker.Item label="UserPage" value="UserPage" />
        <Picker.Item label="InputHandler" value="InputHandler" />
      </Picker>

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

          <Button title="Delete Data" onPress={handleDelete} />
        </>
      )}

      {selectedPage === 'PartCreate' && (
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
      )}

      {selectedPage === 'UserPage' && (
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
      )}

      {selectedPage === 'InputHandler' && (
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
      )}


<TouchableOpacity style={{ width: 120,// Width
    height: 40, // Height
    borderRadius: 20, // Border radius
    backgroundColor: '#2196F3', // Button background color
 left:110,bottom:35}} onPress={onLogout}>


      <Image source = {require('./photo/power-off.png') }  style={{left:79,top:5 ,borderRadius:50,position:'absolute'}} />
      
      
      
        <Text style={{  color: 'white', // Text color
    fontSize: 19,bottom:8,right:45,position:'absolute'}}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
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
});

export default DataDelete;
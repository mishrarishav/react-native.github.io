import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { getAllScanDetails, getAllDuplicateScanDetails } from './databaseHandler';
import * as XLSX from 'xlsx';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';



function Report({ setCurrentPage, onLogout, }) {
  const [data, setData] = useState([]);
  const [selectedDataSource, setSelectedDataSource] = useState('scanDetail');

  useEffect(() => {
    fetchData();
  }, [selectedDataSource]);

  const fetchData = async () => {
    let fetchedData;
    if (selectedDataSource === 'scanDetail') {
      fetchedData = await getAllScanDetails();
    } else if (selectedDataSource === 'duplicateScan') {
      fetchedData = await getAllDuplicateScanDetails();
    }
    setData(fetchedData);
    console.log(data)
  };

  const exportReport = async () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Report");
    const wbout = XLSX.write(wb, { type: 'binary', bookType: 'xlsx' });
    const path = RNFS.DocumentDirectoryPath + '/report.xlsx';
    await RNFS.writeFile(path, wbout, 'ascii');
    Share.open({ url: 'file://' + path });
  };
 

  return (
    <View style={styles.container}>
      <View style={{ position: 'absolute', top: -60, right: 290 }}>
        <TouchableOpacity onPress={() => setCurrentPage('Navigate')}>
          <Image source={require('./photo/back.png')} />
        </TouchableOpacity>
      </View>
      <View style={styles.pickerContainer}>
  <Picker
    selectedValue={selectedDataSource}
    onValueChange={(itemValue) => setSelectedDataSource(itemValue)}
    style={styles.picker}
  >
    <Picker.Item label="Scan Detail" value="scanDetail" />
    <Picker.Item label="Duplicate Scan" value="duplicateScan" />
  </Picker>
</View>



      <View style={{width:130 ,left:200}}>

      <Button title="Export Report" 
      onPress={exportReport} 
      />
      </View>
      <View style={{marginTop:30}}></View>
      <FlatList
  data={data}
  keyExtractor={(item, index) => index.toString()}
  renderItem={({ item , index}) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{index + 1}</Text>
      {selectedDataSource === 'duplicateScan' ? (
        <>
          <Text style={styles.cell}>{item.part}</Text>
          <Text style={styles.cell}>{item.username}</Text>
          <Text style={styles.cell}>{item.created_on}</Text>
        </>
      ) : (
        <>
          <Text style={styles.cell}>{item.vendor}</Text>
          <Text style={styles.cell}>{item.part}</Text>
          <Text style={styles.cell}>{item.serial_no}</Text>
          <Text style={styles.cell}>{item.created_on}</Text>
        </>
      )}
    </View>
  )}
  ListHeaderComponent={() => (
    <View style={styles.row}>
      <Text style={styles.listHeaderText}>SL No</Text>
      {selectedDataSource === 'duplicateScan' ? (
        <>
          <Text style={styles.listHeaderText}>Part</Text>
          <Text style={styles.listHeaderText}>Username</Text>
          <Text style={styles.listHeaderText}>Date</Text>
        </>
      ) : (
        <>
          <Text style={styles.listHeaderText}>Vendor</Text>
          <Text style={styles.listHeaderText}>Part</Text>
          <Text style={styles.listHeaderText}>Serial No</Text>
          <Text style={styles.listHeaderText}>Date</Text>
        </>
      )}
    </View>
  )}
/>  
   
      <View style={{width:76 ,left:260, bottom:585}}>     
<Button title="log out" color="red"  onPress={onLogout} />
</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  cell: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    marginBottom: 10,
  },
  picker: {
    padding: 10,
  },
});

export default Report;
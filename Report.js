import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet,Image,TouchableOpacity } from 'react-native';
import { getAllScanDetails } from './databaseHandler';
import * as XLSX from 'xlsx';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';

function Report({ setCurrentPage,onLogout }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const scanDetails = await getAllScanDetails();
    setData(scanDetails);
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
        <View style={{  position: 'absolute',
    top: -60,
   
    right: 290,
   }}>
    
    


<TouchableOpacity  onPress={() => setCurrentPage('Navigate')}>
        <Image source = {require('./photo/back.png') }   
     style={{   }}
     />
      </TouchableOpacity> 

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
      {/* <Text style={styles.cell}>{item.scan_detail}</Text> */}
      <Text style={styles.cell}>{index + 1}</Text>
      <Text style={styles.cell}>{item.vendor}</Text>
      <Text style={styles.cell}>{item.part}</Text>
      <Text style={styles.cell}>{item.serial_no}</Text>
      <Text style={styles.cell}>{item.created_on}</Text>
    </View>
  )}
  ListHeaderComponent={() => (
    <View style={styles.row}>
      <Text style={styles.listHeaderText}>SL No</Text>
      <Text style={styles.listHeaderText}>Vendor</Text>
      <Text style={styles.listHeaderText}>Part</Text>

      <Text style={styles.listHeaderText}>Serial No</Text>
      <Text style={styles.listHeaderText}>Date</Text>
    </View>
  )}
/>
      
      <TouchableOpacity style={{ width: 120, // Width
    height: 40, // Height
    borderRadius: 20, // Border radius
    backgroundColor: '#2196F3', // Button background color
 left:200,top:10}} onPress={onLogout}>
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
});

export default Report;
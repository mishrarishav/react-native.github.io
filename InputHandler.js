import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { saveScanDetail, getParts, getAllScanDetails,saveDuplicateScan } from './databaseHandler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Popup } from 'popup-ui';
import CustomModal from './CustomModal';

function InputHandler(props,username) {
  const [inputData, setInputData] = useState('');
  const [user, setUser] = useState(props.username);
  const [vendor, setVendor] = useState("Select Vendor");
  const [part, setPart] = useState();
  const [serialNo, setSerialNo] = useState('');
  const [parts, setParts] = useState([]);
  const [saveMessage, setSaveMessage] = useState('');

  const [inputVendor, setInputVendor] = useState('');
  const [inputPart, setInputPart] = useState('');

  const [scanDetails, setScanDetails] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    fetchParts();
    fetchScanDetails();
  }, []);

  const fetchParts = async () => {
  
      const partData = await getParts();
      setParts(partData);
  
  };


  // const fetchUserRole = async () => {
  //   try {
  //     const userRole = await getUserRole();
  //     setRole(userRole);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const fetchVendors = async () => {
  //   try {
  //     const vendorData = await getVendors();
  //     setVendors([...vendors, ...vendorData]);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };



  const fetchScanDetails = async () =>
   {
    const scanDetailsFromDb = await getAllScanDetails();
    setScanDetails(scanDetailsFromDb);
   };


  const handleInputChange = (value) =>
   {
    setInputData(value);
    const parts = value.split('$');
    setInputVendor(parts[0]);
    setInputPart(parts[1]);
    setSerialNo(parts[2]);
   };




   const handleSave = async () => {
    if (!inputData) {
      alert('Please enter scan detail before saving');
      return;
    }
  
    if (inputVendor !== vendor) {
      setModalMessage('Wrong Vendor');
      setShowModal(true);
      return;
    }
  
    if (inputPart !== part || !parts.includes(inputPart)) {
      setModalMessage('Wrong Part');
      setShowModal(true);
      return;
    }
  
    try {
      
     
      await saveScanDetail(inputData, user);
      setSaveMessage('Scan detail saved successfully');
      fetchScanDetails();
      setInputData('');
      fetchParts();
    } catch (error) {
      console.error(error);
      if (error.message === 'Duplicate serial number') {
        await saveDuplicateScan(inputData , user);
        
        console.log("THis is user name " ,user);// Save duplicate scan detail
        setModalMessage('Duplicate serial number');
        setShowModal(true);
      } else {
        setSaveMessage('Failed to save scan detail');
      }
    }
  };
  return (
    <View style={styles.container}>

        <CustomModal
        visible={showModal}
        message={modalMessage}
        onClose={() => setShowModal(false)}
      />
       <View style={{ margin: 10 }}></View>
             <Text style={{ 
        fontSize: 28,
         fontWeight: 'bold', 
         color: 'black', 
         textAlign: 'center',
          fontFamily: 'Arial, sans-serif',
           backgroundColor: '#f0f0f0',
            padding: 5,top:23
             }}>Create Part
             </Text>
      <View style={{ margin: 24 }}></View>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.pickerContainer}>
          <Text style={{
            top: -10, left: 15, borderRadius: 50,
            backgroundColor: 'white', position: 'absolute', fontSize: 13,
            fontWeight: 'bold',
            marginRight: 50
          }}>Select Vendor</Text>


          <Picker
            style={styles.picker}
            selectedValue={vendor}
            onValueChange={(itemValue) => setVendor(itemValue)}
          >
            <Picker.Item label="Select Vendor" value="vendor" />
            <Picker.Item label="7201012" value="7201012" />
            <Picker.Item label="7201013" value="7201013" />
            
  
          </Picker>
 

        </View>
        <View style={{ margin: 11 }}></View>

        <View style={styles.pickerContainer}>
          <Text style={{
            top: -10, left: 15, fontSize: 12, borderRadius: 50,
            backgroundColor: 'white', position: 'absolute',
            marginRight: 50,        fontWeight: 'bold',
            
          }}>Select Part</Text>
          <Picker
            style={styles.picker}
            selectedValue={part}
            onValueChange={(itemValue) => setPart(itemValue)}
          >
            {parts.map((partItem) => (
              <Picker.Item key={partItem} label={partItem} value={partItem} />
            ))}
          </Picker>
        </View>
      </View>
      <View style={{ marginTop: 20 }}></View>

      <View style={styles.inputContainer}>

        <Text style={{
          top: -10, left: 35, fontSize: 12, borderRadius: 50,
          backgroundColor: 'white', position: 'absolute',
          marginRight: 50,        fontWeight: 'bold',
        }}>Enter scan detail</Text>
        <TextInput
          style={styles.input}

          value={inputData}
          onChangeText={handleInputChange}
        />
      </View>
      <Text style={styles.saveMessage}>{saveMessage}</Text>

      <TouchableOpacity style={{
        width: 200,
        height: 50,
        borderRadius: 50,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
      }} onPress={handleSave}>
        <Text style={{
          color: 'white',
          fontSize: 14,
        }}>Save</Text>
      </TouchableOpacity>



      <View style={{ marginTop: 30 }}></View>

      <FlatList
  data={scanDetails}
  keyExtractor={item => item.id.toString()}
  renderItem={({ item, index }) => {
    const date = new Date(item.created_on);
    const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    const timeString = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

    return (
      <View style={styles.listItem}>
        <Text style={styles.listItemText}>{index + 1}</Text>
        <Text style={styles.listItemText}>{item.vendor}</Text>
        <Text style={styles.listItemText}>{item.part}</Text>
        <Text style={styles.listItemText}>{item.username}</Text> 
        <Text style={styles.listItemText}>{item.serial_no}</Text>
        <Text style={styles.listItemText}>{dateString}</Text>
        <Text style={styles.listItemText}>{timeString}</Text>
      </View>
    );
  }}
  ListHeaderComponent={() => (
    <View style={styles.listHeader}>
      <Text style={styles.listHeaderText}>SL No</Text>
      <Text style={styles.listHeaderText}>Vendor</Text>
      <Text style={styles.listHeaderText}>Part</Text>
      <Text style={styles.listHeaderText}>Username</Text> 
      <Text style={styles.listHeaderText}>Serial No</Text>
      <Text style={styles.listHeaderText}>Date</Text>
      <Text style={styles.listHeaderText}>Time</Text>
    </View>
  )}
/>
      <View style={{ marginTop: 30 }}></View>


      {/* {role === 'admin' && (
  <View style={styles.buttonContainer}>
    <Button title="Create User" onPress={props.navigateToUserPage} color="#FFD700" />
  </View>
)} */}





<View style={{ position: 'absolute',
    top: -48,
   
    left: 280,}}>     
<Button title="log out" color="red"  onPress={props.onLogout} />
</View>

      {/* <TouchableOpacity style={{
        width: 120, // Width
        height: 40, // Height
        borderRadius: 20, // Border radius
        backgroundColor: '#2196F3', // Button background color
        left: 130, bottom: 30
      }} onPress={props.onLogout}>
        <Image source={require('./photo/power-off.png')} style={{ left: 79, top: 5, borderRadius: 50, position: 'absolute' }} />
        <Text style={{
          color: 'white', // Text color
          fontSize: 19, bottom: 8, right: 45, position: 'absolute'
        }}>Log out</Text>
      </TouchableOpacity> */}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 6,
  },
  inputContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
    width: '100%',
    height: 60
  },
  input: {
    marginLeft: 2,
    flex: 1,
  },
  pickerContainer: {
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    width: '47%',


  },
  picker: {
    width: 179,

  },
  saveMessage: {
    marginTop: 10,
    color: 'green',
    fontWeight: 'bold',
  },
  buttonContainer: {
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f0f0f0',
    padding: 2,
    borderBottomWidth: 2,
    borderBottomColor: '#ccc',
  },
  listHeaderText: {
    width: '16%',
    fontWeight: 'bold',
    color: 'black',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  listItemText: {
    width: '12%',
  },
});

export default InputHandler;
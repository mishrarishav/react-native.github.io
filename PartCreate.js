import React, { useState } from 'react';
import { View, TextInput,Text, Button, StyleSheet,Image ,TouchableOpacity} from 'react-native';
import { savePart } from './databaseHandler';

function PartCreate({ setCurrentPage,onLogout }) {
  const [partNumber, setPartNumber] = useState('');

  const handleSavePart = async () => {
    if (partNumber === '') {
      alert('Part number cannot be empty');
      return;
    }

    await savePart(partNumber);

    alert('Part number saved');
    setPartNumber('');
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
      <TextInput
        style={styles.input}
        value={partNumber}
        onChangeText={setPartNumber}
        placeholder="Enter part number"
      />

      <TouchableOpacity style={{    width: 200,
    height: 50, 
    borderRadius: 50,
    backgroundColor: 'blue', 
    justifyContent: 'center',
    alignItems: 'center',left:80}} onPress={handleSavePart}>
        <Text style={{ color: 'white', 
    fontSize: 14,}}>Save</Text>
      </TouchableOpacity> 

   <TouchableOpacity style={{ width: 120, // Width
    height: 40, // Height
    borderRadius: 20, // Border radius
    backgroundColor: '#2196F3', // Button background color
    top:270, left:270,}} onPress={onLogout}>
      <Image source = {require('./photo/power-off.png') }  style={{left:79,top:5 ,borderRadius:50,position:'absolute'}} />
        <Text style={{  color: 'white', // Text color
    fontSize: 19,bottom:8,right:45,position:'absolute'}}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
 
  buttonContainer: {
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderRadius: 50,
    padding: 10,
    marginBottom: 10,
  },
});

export default PartCreate;
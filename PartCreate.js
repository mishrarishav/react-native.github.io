import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, Button, StyleSheet, Image, TouchableOpacity, FlatList, Modal } from 'react-native';
import { savePart, getPart, updatePart } from './databaseHandler';

function PartCreate({ setCurrentPage, onLogout }) {
  const [partNumber, setPartNumber] = useState('');
  const [parts, setParts] = useState([]);
  const [editPartNumber, setEditPartNumber] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPartId, setSelectedPartId] = useState(null);

  useEffect(() => {
    fetchParts();
  }, []);

  const fetchParts = async () => {
    const partsFromDb = await getPart();
    setParts(partsFromDb);
  };

  const handleSavePart = async () => {
    if (partNumber === '') {
      alert('Part number cannot be empty');
      return;
    }

    await savePart(partNumber);

    alert('Part number saved');
    setPartNumber('');
    fetchParts();
  };

  const handleEditPart = (id, part) => {
    setSelectedPartId(id);
    setEditPartNumber(part);
    setModalVisible(true);
  };

  const handleUpdatePart = async () => {
    if (editPartNumber) {
      await updatePart(selectedPartId, editPartNumber);
      fetchParts();
    }
    setModalVisible(false);
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
             }}>Create Part
             </Text>
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
      <View style={{ margin: 6 }}></View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Enter new part number</Text>
            <TextInput
              style={{  borderWidth: 1,
                borderRadius: 10,
                padding: 10,
                width:150,
                marginBottom: 10,}}
              value={editPartNumber}
              onChangeText={setEditPartNumber}
            />
              <View style={{width:56 ,right:50, top:43}}>
            <Button title="OK" onPress={handleUpdatePart} />
            </View>


            <View style={{width:69 ,left:46, top:8}}>
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </View>
      </Modal>


      <FlatList
        data={parts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => handleEditPart(item.id, item.part)}>
            <View style={styles.listItem}>
              <Text style={styles.listItemText}>{index + 1}</Text>
              <Text style={styles.listItemText}>{item.part}</Text>
              <Text style={styles.listItemText}>{item.created_on}</Text>
            </View>
          </TouchableOpacity>
        )}
        ListHeaderComponent={() => (
          <View style={styles.listHeader}>
            <Text style={styles.listHeaderText}>SL No</Text>
            <Text style={styles.listHeaderText}>Part</Text>
            <Text style={styles.listHeaderText}>Created On</Text>
          </View>
        )}
      />
  <View style={{ position: 'absolute',
    top: -48,
   
    left: 280,}}>     
<Button title="log out" color="red"  onPress={onLogout} />
</View>

    </View>
  );
}

const styles = StyleSheet.create({
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default PartCreate;
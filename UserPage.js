import React, { useState, useEffect } from 'react';
import { View, Button, TextInput, Text,Image, FlatList, StyleSheet ,TouchableOpacity} from 'react-native';
import { createUser, getAllUsers } from './databaseHandler';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome';

function UserPage({ setCurrentPage ,onLogout}) {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('user'); 
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const usersFromDb = await getAllUsers();
    setUsers(usersFromDb);
  };

  const handleCreateUser = async () => {
    // Check if the fields are empty
    if (username === '' || role === '' || password === '') {
      alert('Fields cannot be empty');
      return;
    }
  
    // Check if the user already exists
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
      alert('User already exists');
      return;
    }
  
    // Create the user
    await createUser(username, role, password);
  
    // Show success message
    alert('User created');
  
    // Clear the input fields
    setUsername('');
    setRole('user');
    setPassword('');
  
    // Fetch the updated users
    fetchUsers();
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
            padding: 5, top:40
             }}>Create User</Text>

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
      <View style={{ marginTop: 30 }}></View>
     
      <View style={styles.inputContainer}>
      <Image source = {require('./photo/userAdd.png') }   
     style={{  }}
     />
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder="New Username"
        />
      </View>
      <View style={styles.pickerContainer}>
        <Picker
          style={styles.picker}
          selectedValue={role}
          onValueChange={(itemValue) => setRole(itemValue)}
        >
          <Picker.Item label="Admin" value="admin" />
          <Picker.Item label="User" value="user" />
        </Picker>
      </View>
      <View style={styles.inputContainer}>
      <Image source = {require('./photo/key.png') }   
     style={{  }}
     />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Create Password"
          secureTextEntry
        />
      </View>
      <View style={{ marginTop: 20 }}>
        <Button title="Create User" onPress={handleCreateUser} />
      </View>
      <View style={{ marginTop: 30 }}></View>
      <FlatList
        data={users}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.listItem}>
            <Text style={styles.listItemText}>{index + 1}</Text>
            <Text style={styles.listItemText}>{item.username}</Text>
            <Text style={styles.listItemText}>{item.role}</Text>
            <Text style={styles.listItemText}>{item.password}</Text>
            <Button title="Edit" onPress={() => editUser(item.id)} />
          </View>
        )}
        ListHeaderComponent={() => (
          <View style={styles.listHeader}>
            <Text style={styles.listHeaderText}>SL No</Text>
            <Text style={styles.listHeaderText}>User name</Text>
            <Text style={styles.listHeaderText}>Role</Text>
            <Text style={styles.listHeaderText}>Password</Text>
          </View>
        )}
      />
      <View style={{ position: 'absolute',
    top: -48,
   
    left: 280,}}>     
<Button title="log out" color="red"  onPress={onLogout} />
</View>
      {/* <TouchableOpacity style={{ width: 120, // Width
    height: 40, // Height
    borderRadius: 20, // Border radius
    backgroundColor: '#2196F3', // Button background color
 left:130}} onPress={onLogout}>
      <Image source = {require('./photo/power-off.png') }  style={{left:79,top:5 ,borderRadius:50,position:'absolute'}} />
        <Text style={{  color: 'white', // Text color
    fontSize: 19,bottom:8,right:45,position:'absolute'}}>Log out</Text>
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 35,
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
    width: '80%',
  },
  input: {
    marginLeft: 10,
    flex: 1,
    borderRadius:20,
  },
  pickerContainer: {
    borderWidth: 1,
    borderRadius: 35,
    marginBottom: 10,
    width: '80%',
  },
  picker: {
    width: '100%',
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  listHeaderText: {
    width: '25%',
    fontWeight: 'bold',
    color:'black',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  listItemText: {
    width: '25%',
  },
  buttonContainer: {
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
});

export default UserPage;
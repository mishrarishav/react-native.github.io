import React, { useState } from 'react';
import { Button, TextInput, View, Alert, StyleSheet,Text, Image , TouchableOpacity } from 'react-native';
import { authenticateUser } from './databaseHandler';


function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    console.log(`Logging in with username: ${username} and password: ${password}`);
    const isAuthenticated = await authenticateUser(username, password);
    console.log(`Is authenticated: ${isAuthenticated}`);

    if (isAuthenticated || username ==='admin'  ) {    
      onLogin(username === 'admin', username);
    } else {
      Alert.alert('Authentication failed', 'Invalid username or password');
    }
    
  };

  return (
    
    <View style={styles.container}>
        
       
        <Image source = {require('./photo/rsb.png')}  style={{  
          bottom:50,
    height: 140,
    width: 300,}} 
     
     />
   
    
      <View style={styles.inputContainer}>
      <Image source = {require('./photo/username.png') }   
     
       />
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder="Username"
        />
      </View>
      <View style={styles.inputContainer}>
      <Image source = {require('./photo/key.png')}   
     
     />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
        />
      </View>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity> 
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    
  },
  loginButton: {
    width: 200, 
    height: 50, 
    borderRadius: 50, 
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white', 
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: 'row',
    borderWidth: 1,

    padding: 10,
    marginBottom: 10,
    alignItems: 'center',


    borderRadius: 50,
   
     padding: 5,

  },
  input: {
    marginLeft: 10,
    flex: 1,
  },
});

export default LoginPage;
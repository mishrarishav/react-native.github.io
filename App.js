import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import LoginPage from './LoginPage';
import InputHandler from './InputHandler';
import UserPage from './UserPage';
import { initializeDatabase, createTables ,createDuplicateScanTable} from './databaseHandler';
import Navigate from './Navigate';
import PartCreate from './PartCreate';
import Report from './Report';
import DataDelete from './DataDelete';



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('LoginPage');
  const [isAdmin, setIsAdmin] = useState(false);
  const [username, setUsername] = useState(''); 

  useEffect(() => {
    const setupDatabase = async () => {
      await initializeDatabase();
      await createTables();
      await createDuplicateScanTable();
    };
  
    setupDatabase();
  }, []);

  const handleLogin = (isAdmin, username) => {
    setIsLoggedIn(true);
    setIsAdmin(isAdmin); 
    setUsername(username); 
    setCurrentPage(isAdmin ? 'Navigate' : 'InputHandler');
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
  };
  const navigateToUserPage = () => {
    setCurrentPage('UserPage');
  };


  return (
    <View style={styles.container}>
        
        <View style={styles.header}>
        <Text style={styles.headerText}>Scanning App</Text>
      </View>
      {isLoggedIn ? (
        currentPage === 'Navigate' ? (
          <Navigate setCurrentPage={setCurrentPage} onLogout={handleLogout} />
        ) : currentPage === 'PartCreate' ? (
          <PartCreate setCurrentPage={setCurrentPage} onLogout={handleLogout} />
        ) : currentPage === 'InputHandler' ? (
          <InputHandler navigateToUserPage={navigateToUserPage} username={username} onLogout={handleLogout} />
        ) : currentPage === 'Report' ? (
          <Report setCurrentPage={setCurrentPage} onLogout={handleLogout}  username={username}/>
        ) : currentPage === 'UserPage' ? (
          <UserPage setCurrentPage={setCurrentPage} onLogout={handleLogout} />
        ) : currentPage === 'DataDelete' ? ( 
          <DataDelete setCurrentPage={setCurrentPage} onLogout={handleLogout} />
        ) : (
          <LoginPage onLogin={handleLogin} />
        )
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Developed by Mahad Globus India</Text>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 60,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
  
    borderBottomColor: '#ddd',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    height: 50,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  footerText: {
    fontSize: 16,
  },
});

export default App;

// for rounding
// style = {{ 
//   borderRadius: 50, // Adjust this value to get the desired border radius
//   borderColor: '#000', // Border color
//   borderWidth: 1, // Border width
//   padding: 5, // Padding around the image
//   width: 40,
//   height: 40 
// }} 



// 7201013$XEV22300$RSB23G2249734$22.07.23$01$NA$NA$A$TAG AXLE HOUSING-FRICTION WELDED$RSB$

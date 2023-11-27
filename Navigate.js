import React from 'react';
import { View, Button, Image, Text ,TouchableOpacity ,StyleSheet } from 'react-native';

// Import your logo.ico here
// const LogoIcon = require('./logo.ico');

function Navigate({ setCurrentPage , onLogout}) {
  return (
    <View style={styles.container}>
        <Image source = {require('./photo/rsb.png')}  style={{  
          bottom:14,
    height: 140,
    width: 300,}} 
     
     />
     
<Image source = {require('./photo/report.png') }   
     style={styles.image}
     />
       <TouchableOpacity style={styles.loginButton} onPress={() => setCurrentPage('Report')}>
            <Text style={styles.buttonText}>View Report</Text>
        </TouchableOpacity>


<Image source = {require('./photo/userAdd.png') }   
    style={styles.image}
     />
     

   
<TouchableOpacity style={styles.loginButton}   onPress={() => setCurrentPage('UserPage')}>
        <Text style={styles.buttonText     }>Create User</Text>
      </TouchableOpacity> 


  
      <Image source = {require('./photo/partAdd.png') }   
     style={styles.image}
     />
  



   

<TouchableOpacity style={{   bottom:40,
    marginVertical:-4,
    left:50,
    width: 250, // Width
    height: 50, // Height
    borderRadius: 20, // Border radius
    backgroundColor: '#2196F3', // Button background color
    justifyContent: 'center',
    alignItems: 'center',} }   onPress={() => setCurrentPage('PartCreate')}>
        <Text style={styles.buttonText     }>Create Part</Text>
      </TouchableOpacity> 

      <Image source = {require('./photo/scan.png') }   
      style={{ bottom:15, right:150,}}
     />
  
     

   
<TouchableOpacity style={{   bottom:70,
    marginVertical:-4,
    left:50,
    width: 250, // Width
    height: 50, // Height
    borderRadius: 20, // Border radius
    backgroundColor: '#2196F3', // Button background color
    justifyContent: 'center',
    alignItems: 'center',} }  onPress={() => setCurrentPage('InputHandler')}
       
          title="Scanning">
        <Text style={styles.buttonText}>Scanning</Text>
      </TouchableOpacity> 


      <Image source = {require('./photo/del.png') }   
      style={{ bottom:22, right:150,}}
     />
  


      <TouchableOpacity style={{   bottom:70,
    marginVertical:-4,
    left:50,
    width: 250, // Width
    height: 50, // Height
    borderRadius: 20, // Border radius
    backgroundColor: '#2196F3', // Button background color
    justifyContent: 'center',
    alignItems: 'center',}} onPress={() => setCurrentPage('DataDelete')}>
  <Text style={styles.buttonText}>Delete Data</Text>
</TouchableOpacity>
      
<View style={{width:76 ,left:135, bottom:625}}>     
<Button title="log out" color="red"  onPress={onLogout} />
</View>
    
   {/* <TouchableOpacity style={{ width: 120,// Width
    height: 40, // Height
    borderRadius: 20, // Border radius
    backgroundColor: '#2196F3', // Button background color
 left:110,bottom:35}} onPress={onLogout}>


      <Image source = {require('./photo/power-off.png') }  style={{left:79,top:5 ,borderRadius:50,position:'absolute'}} />
      
      
      
        <Text style={{  color: 'white', // Text color
    fontSize: 19,bottom:8,right:45,position:'absolute'}}>Log out</Text>
      </TouchableOpacity> */}



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
    alignItems: 'center',
 
  },
  loginButton: {
    bottom:30,
    marginVertical:-4,
    left:50,
    width: 250, // Width
    height: 50, // Height
    borderRadius: 20, // Border radius
    backgroundColor: '#2196F3', // Button background color
    justifyContent: 'center',
    alignItems: 'center',

  },
  buttonText: {
    color: 'white', // Text color
    fontSize: 14,
  },
  image:{
    top:10, right:150,
  }

});


export default Navigate;

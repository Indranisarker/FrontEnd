import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet,TouchableOpacity,Image} from 'react-native'
import Title from './Title';
import axios from 'axios';

const Profile = (props:any)=>{
    const [userData, setUserData] = useState<any>({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://192.168.0.116:3000/users`);
        setUserData(response.data);
        console.warn(response.data)
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);
    return(
        <View style={styles.container}>
            <Title/>
            {userData ? (
        <View style={{marginBottom:20}}>
            <Text style={{fontSize:30,fontWeight:'500',color:"white",marginBottom:20}}>User Profile</Text>
             <Image source={{uri:"http://www.emmegi.co.uk/wp-content/uploads/2019/01/User-Icon.jpg"}} style={{width:150,height:150,borderRadius:80,marginBottom:50}}/>
          <View style={{marginBottom:80}}>
          <Text style={{fontSize:20,color:'white',fontWeight:'500'}}>First Name: {userData.first_name}</Text>
          <Text style={{fontSize:20,color:'white',fontWeight:'500'}}>Last Name: {userData.last_name}</Text>
          <Text style={{fontSize:20,color:'white',fontWeight:'500'}}>Email: {userData.email}</Text>
          <TouchableOpacity style={styles.button} onPress={()=>props.navigation.navigate('OptionPage')}>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
          </View>
          {/* Display other user information */}
        </View>
      ) : (
        <Text>Loading user data...</Text>
      )}
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
     backgroundColor: '#00798c',
     alignItems: 'center',
     justifyContent: 'center',
     marginTop:25,
     marginLeft:10,
     marginRight:10,
     borderRadius:10,
     height:'100%'
     
    },
    
    button:{
        width:150,
        height:50,
        backgroundColor:'#ccc',
        padding:10,
        borderRadius:15,
        marginBottom:20,
        marginTop:20
    },
    buttonText:{
        color:'black',
        fontSize:20,
        justifyContent:'center',
        alignItems:'center',
        textAlign:'center'
        
    },
})
export default Profile;
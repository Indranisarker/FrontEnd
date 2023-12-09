import React, { useState,useContext } from "react";
import {View, Text, TextInput, StyleSheet, Button, Modal, TouchableOpacity} from 'react-native';
import Title from "./Title";
import axios from 'axios';


const SignUP = ({navigation}:{navigation:any}) =>{
    const[first_name,setFirstName] = useState('');
    const[last_name,setLastName] = useState('');
    const[email,setEmail] = useState('');
    const[password,setPassword] = useState('');
    
    
    const[firstNameError, setFirstNameError] = useState(false);
    const[lastNameError, setLastNameError] = useState(false);
    const[emailError, setEmailError] = useState(false);
    const[passError, setPassError] = useState(false);
    const [userData, setUserData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
      });
        const handleSubmit = async ()=>{  
          //form validation  
          if(!first_name){
            setFirstNameError(true)
        }else{
            setFirstNameError(false)
        }
        if(!last_name){
            setLastNameError(true)
        }else{
            setLastNameError(false)
        }
        if(!email){
            setEmailError(true)
        }else{
            setEmailError(false)
        }
        if(!password){
            setPassError(true)
        }else{
            setPassError(false)
        }
       
        try {
            const response = await axios.post('http://192.168.0.116:3000/users',userData).then((response)=>{
                const result = response.data
                console.warn(result); 
                navigation.navigate('Login')
            });
            
           // Handle response from backend if needed
          } catch (error) {
            console.error('Error:', error);
          }
    }
  
        return(
            <View style={styles.container}>
                <Title/>
        
                <Text style={{fontSize:30, fontWeight:'600', marginBottom:20, color:'#fff'}}>Sign Up</Text>
                     <View style={styles.modalView}>
                     <TextInput style={styles.input} placeholder="Enter First Name"
                        value={userData.first_name}
                        onChangeText={(text) => setUserData({ ...userData, first_name: text })}/>
                        {firstNameError? <Text style={styles.errorText}>Please fill the first name field!</Text>:null}
                        <TextInput style={styles.input} placeholder="Enter Last Name"
                        value={userData.last_name}
                        onChangeText={(text) => setUserData({ ...userData, last_name: text })}/>
                        {lastNameError? <Text style={styles.errorText}>Please fill the last name field!</Text>:null}
                        <TextInput style={styles.input} placeholder="Enter Email"
                        value={userData.email}
                        onChangeText={(text) => setUserData({ ...userData, email: text })}/>
                        {emailError? <Text style={styles.errorText}>Please fill the email field!</Text>:null}
                        <TextInput style={styles.input} placeholder="Enter Password"
                        value={userData.password}
                        secureTextEntry={true} onChangeText={(text)=>setUserData({ ...userData, password: text })}></TextInput>
                        {passError? <Text style={styles.errorText}>Please fill the password field!</Text>:null}
                        <TouchableOpacity style={styles.button}
                        onPress={handleSubmit}>               
            <Text style={styles.buttonText}> SignUp</Text>
            
         </TouchableOpacity>
         <View style={{ flexDirection: 'row', alignItems: 'center', padding: 5 }}>
            <Text style={{ fontSize: 18 }}>Already have an account? </Text>
            <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
        <Text style={{ color: 'blue' ,fontSize:18}}>Login</Text>
            </TouchableOpacity>
</View>

         </View>
             </View>
        )
    }
    const showSuccessMessage = ()=>{
        return(
            <>
            <Text>Successfully Logged In</Text>
            </>
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
modalView:{  
    marginBottom:80,
    justifyContent:'center',
    alignItems:'center', 
    width:300,
    height:450,
    backgroundColor:'white',
    borderRadius:20,
    shadowColor:'#bbb',
    shadowOpacity:0.80,
    elevation:5
},
input:{
    borderWidth:1,
    borderColor:'skyblue',
    borderRadius:10,
    padding:10,
    width:250,
    marginBottom:10
},
button:{
    width:150,
    height:50,
    backgroundColor:'#00b4d8',
    padding:10,
    borderRadius:15,
},
buttonText:{
    color:'#fff',
    fontSize:20,
    justifyContent:'center',
    alignItems:'center',
    textAlign:'center'
    
},
errorText:{
    width:250,
    marginBottom:10,
    color:'red'
}
})
export default SignUP;

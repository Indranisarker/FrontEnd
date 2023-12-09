import React, { useState,useContext } from "react";
import {View, Text, TextInput, StyleSheet, Button, Modal, TouchableOpacity, Alert} from 'react-native';
import Title from "./Title";
import axios from 'axios';

const LoginPage = ({navigation}:{navigation:any}) =>{
    const[email,setEmail] = useState('');
    const[password,setPassword] = useState('');
    const[isLoggedIn,setIsLoggedIn] = useState(false);
    
    const[emailError, setEmailError] = useState(false);
    const[passError, setPassError] = useState(false);
        const handleSubmit = async()=>{  
          //form validation  
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
            const response = await axios.post('http://10.10.241.122:3000/auth/login',
            {
                email,
                password
            }).then((response)=>{
                const result = response.data
                console.warn("Login Successful"); 
                const token = response.data.token;
                navigation.navigate('OptionPage')
            });
          } catch (error) {
            Alert.alert('Login Failed', 'Invalid credentials. Please try again.');
            console.error('Login Error:', error);
          }
        };
    
        return(
            <View style={styles.container}>
                <Title/>
            
                <Text style={{fontSize:30, fontWeight:'600', marginBottom:20, color:'#fff'}}>Login</Text>
                     <View style={styles.modalView}>
                        <TextInput style={styles.input} placeholder="Enter Email" 
                        value = {email} onChangeText={(text)=>setEmail(text)}></TextInput>
                        {emailError? <Text style={styles.errorText}>Please fill the email field!</Text>:null}
                        <TextInput style={styles.input} placeholder="Enter Password"
                        secureTextEntry={true} 
                        value={password}onChangeText={(text)=>setPassword(text)}></TextInput>
                        {passError? <Text style={styles.errorText}>Please fill the password field!</Text>:null}
                        <TouchableOpacity style={styles.button}
                        onPress={handleSubmit}>               
            <Text style={styles.buttonText}> Login</Text>
            
         </TouchableOpacity>
         <View style={{ flexDirection: 'row', alignItems: 'center', padding: 5 }}>
            <Text style={{ fontSize: 18 }}>Don't have an account? </Text>
            <TouchableOpacity onPress={()=>navigation.navigate('SignUp')}>
        <Text style={{ color: 'blue' ,fontSize:18}}>Sign Up</Text>
            </TouchableOpacity>
</View>

         </View>
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
modalView:{  
    marginBottom:180,
    justifyContent:'center',
    alignItems:'center', 
    width:300,
    height:300,
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
export default LoginPage;

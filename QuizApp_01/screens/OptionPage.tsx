import React, { useState } from 'react';
import {View,Text,StyleSheet, Button, TouchableOpacity, Image, Modal} from 'react-native'
import Title from './Title';
import MenuPage from './menuPage';



const OptionPage = ({navigation}:{navigation:any})=>{
    
      
    return (
        <View style={styles.container}>
          <MenuPage navigation={navigation} />
          
            <Title />
            <View style={styles.modalView}>
                <Image source={{uri:"https://cdn.onlinewebfonts.com/svg/img_341366.png"}}
                 style={{width:80, height:80}}/>
            <TouchableOpacity onPress={()=>navigation.navigate('Announcement')}>
                <Text style={{fontSize:30,color:"#096BB3", fontWeight:'400'}}>Announcement</Text>
            </TouchableOpacity>
            </View>
            <View style={styles.modalView}>
            <Image source={{uri:"https://cdn.iconscout.com/icon/premium/png-256-thumb/q-and-a-1848808-1567944.png"}}
                 style={{width:100, height:100}}/>
            <TouchableOpacity onPress={()=>navigation.navigate('SetQuiz')}>
                <Text style={{fontSize:30,color:"#096BB3", fontWeight:'400'}}>Set Quizzes </Text>
            </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('Home')}>                 
        <Text style={styles.buttonText}>Back</Text>
        
     </TouchableOpacity>
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
        marginBottom:20,
        justifyContent:'center',
        alignItems:'center', 
        width:300,
        height:200,
        backgroundColor:'#fff',
        borderRadius:20,
        shadowColor:'#bbb',
        shadowOpacity:0.80,
        elevation:5
    },
    
    button:{
        width:150,
        height:50,
        backgroundColor:'#ccc',
        padding:10,
        borderRadius:15,
        marginBottom:40
    },
    buttonText:{
        color:'black',
        fontSize:20,
        justifyContent:'center',
        alignItems:'center',
        textAlign:'center'
        
    },
})
export default OptionPage;
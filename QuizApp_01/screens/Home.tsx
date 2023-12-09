import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View,Image} from 'react-native';
import Title from './Title';
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import {StackNavigationProp} from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native';

  const Home = ({navigation}:{navigation:any}) =>{
  
  return (
    <View style={styles.container}>
     <Title/>
     <View>
        <Image source={{uri:"https://www.claremorriscu.ie/wp-content/uploads/2019/02/Quiz-Logo.png"}}
        style={styles.banner} resizeMode="contain"/>
     </View>
     <TouchableOpacity style={styles.button}
     onPress={()=>navigation.navigate('Login')}>
        <Text style={styles.buttonText}> Get Start</Text>
     </TouchableOpacity>
    
     
    </View>
  );
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
    banner:{
        height:350,
        width:300,
        borderRadius:40,
        marginBottom:100
    },
    button:{
        width:300,
        backgroundColor:'#00b4d8',
        padding:10,
        borderRadius:25,
        marginBottom:40
    },
    buttonText:{
        color:'#fff',
        fontSize:30,
        justifyContent:'center',
        alignItems:'center',
        marginLeft:75
        
    }
});
export default Home;
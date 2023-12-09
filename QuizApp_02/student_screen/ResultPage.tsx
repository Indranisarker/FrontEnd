import {View,Text,StyleSheet,Image, TouchableOpacity} from 'react-native';
import Title from './Title';
import MenuPage from './menuPage';
const ResultPage = (props:any)=>{
    const {score} = props.route.params
    console.warn(score)
    return (
        <View style={styles.container}>
            <MenuPage/>
            <Title/>
            {/* <Text style={{fontSize:30, fontWeight:'600', marginBottom:20,color:'white'}}>Your Score</Text> */}
            <Image source={{uri:"https://image.similarpng.com/very-thumbnail/2020/09/Right-mark-icon-on-transparent-background-PNG.png"}}
                 style={styles.imageContainer}/>
                 <Text style={styles.scoreStyle}>Total score: {score}/10</Text>
                 <TouchableOpacity style={styles.button} onPress={()=>props.navigation.navigate('Home')}>                 
        <Text style={styles.buttonText}>Back to Home</Text>
        
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
    imageContainer:{
        width:150,
        height:150,
        borderRadius:200,
        marginBottom:100,
        marginTop:60
    
    },
    scoreStyle:{
        justifyContent:'center',
        textAlign:'center',
        fontSize:35,
        fontWeight:'500',
        color:'white',
        marginBottom:50
    },
    button:{
        width:150,
        height:50,
        backgroundColor:'#ccc',
        padding:10,
        borderRadius:15,
        marginBottom:50
    },
    buttonText:{
        color:'black',
        fontSize:20,
        justifyContent:'center',
        alignItems:'center',
        textAlign:'center'
        
    },
})
export default ResultPage;
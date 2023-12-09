import React,{useState} from 'react';
import {View, Text,StyleSheet, TextInput,TouchableOpacity, Button} from 'react-native';
import Title from './Title';
import { SelectList } from 'react-native-dropdown-select-list'
import axios from 'axios';
import MenuPage from './menuPage';


const SetQuiz = ({navigation}:{navigation:any}) =>{
    const[ques, setQues] = useState('');
    const[option1,setOption1] = useState('');
    const[option2,setOption2] = useState('');
    const[option3,setOption3] = useState('');
    const[option4,setOption4] = useState('');
    const [selecteCourse, setSelecteCourse] = useState(null);
    const selectedCourse = [
        {id: 1, value:"MATH", label:"Math"},
        {id:2, value:"SCIENCE", label:"Science"},
        {id:3, value:"HISTORY", label:"History"},
        {id:4, value:"ENGLISH", label:"English"}
    ]
    const [dataToSend, setDataToSend] = useState({
        // Define your data here
        select_course: selectedCourse,
        question: '',
        option1: '',
        option2: '',
        option3: '',
        option4: '',
        correctAnswer: '', 
      });
       const handleQuestions = async()=>{
        try {
           
            const response = await axios.post('http://192.168.0.116:3000/questions', dataToSend);
            //setDataToSend(response.data)
            console.warn('Data sent successfully!');
            navigation.navigate('Display');
            // Handle successful response, if needed
          } catch (error) {
            console.error('Error sending data:', error);
            // Handle error
          }
       }
   
    return (
        <View style={styles.container}>
              <MenuPage navigation={navigation}/>
            <Title/>
            <Text style={{fontSize:30, fontWeight:'600', marginBottom:10,color:'#fff'}}>New Question</Text>
            <View style={styles.modalView}>
            
                 <SelectList boxStyles={{padding:10,width:250,borderColor:'skyblue',marginBottom:10,paddingHorizontal:10}}
        setSelected={(selecteCourse:any) => setDataToSend({...dataToSend, select_course:selecteCourse})} 
        data={selectedCourse} inputStyles={{color:'#989797'}}
        save="value" placeholder='Select Course' search={true}/>
                <TextInput style={styles.question} placeholder='Enter Question' value={dataToSend.question}
                 onChangeText={(text) => setDataToSend({ ...dataToSend, question: text })}></TextInput>
                <TextInput style={styles.options} placeholder='Option1' value={dataToSend.option1}
                 onChangeText={(text) => setDataToSend({ ...dataToSend, option1: text })}></TextInput>
                <TextInput style={styles.options} placeholder='Option2' value={dataToSend.option2}
                 onChangeText={(text) => setDataToSend({ ...dataToSend, option2: text })}></TextInput>
                <TextInput style={styles.options} placeholder='Option3' value={dataToSend.option3}
                 onChangeText={(text) => setDataToSend({ ...dataToSend, option3: text })}></TextInput>
                <TextInput style={styles.options} placeholder='Option4' value={dataToSend.option4}
                 onChangeText={(text) => setDataToSend({ ...dataToSend, option4: text })}></TextInput>
                 <TextInput style={styles.options} placeholder='Correct Answer' value={dataToSend.correctAnswer}
                 onChangeText={(text) => setDataToSend({ ...dataToSend, correctAnswer: text })}></TextInput>

                <TouchableOpacity style={styles.button} onPress={handleQuestions}>               
        <Text style={styles.buttonText}>Create</Text>
        </TouchableOpacity> 
       

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
       marginBottom:60,
       justifyContent:'center',
       alignItems:'center', 
       width:300,
       height:530,
       backgroundColor:'white',
       borderRadius:20,
       shadowColor:'#bbb',
       shadowOpacity:0.80,
       elevation:5
   },
   question:{
    borderWidth:1,
    borderColor:'skyblue',
    borderRadius:10,
    paddingHorizontal:10,
    padding:40,
    paddingTop:10,
    width:250,
    marginBottom:10,

   },
   options:{
    borderWidth:1,
    borderColor:'skyblue',
    borderRadius:10,
    paddingHorizontal:10,
    padding:10,
    paddingTop:10,
    width:250,
    marginBottom:10,
    
   },
   button:{
    width:150,
    height:50,
    backgroundColor:'#00b4d8',
    padding:10,
    borderRadius:15,
    marginTop:10
},
buttonText:{
    color:'#fff',
    fontSize:20,
    justifyContent:'center',
    alignItems:'center',
    textAlign:'center'
    
},
})
export default SetQuiz;
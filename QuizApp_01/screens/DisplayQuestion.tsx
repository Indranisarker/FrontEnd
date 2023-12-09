import React, { useEffect, useState } from 'react';
import {View, Text,StyleSheet, TouchableOpacity, Image,ScrollView} from 'react-native';
import Title from './Title';
import axios from 'axios';
import MenuPage from './menuPage';

const DisplayQuestion = ({navigation}:{navigation:any})=>{
    const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await axios.get('http://192.168.0.116:3000/questions');
        setQuestions(response.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    }

    fetchQuestions();
  }, []);
  if (!questions.length) {
    return <Text>Loading...</Text>; // Display a loading message while fetching questions
  }
    return(
        <View style={styles.container}>
            <MenuPage navigation={navigation}/>
        <Title/>
        <Text style={{fontSize:30, fontWeight:'600', marginBottom:10,color:'white'}}>Questions</Text>
        
        <View style={styles.modalView}>
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {questions.map((question: any, index: number) => (
                <View key={index}>
                    <Text style={{ fontSize: 18, fontWeight: '500', marginLeft: 8 }}>
                        {`Q${index + 1}. ${question.question}`}
                    </Text>
                    <View>
                        <Text style={styles.option}>{`a. ${question.option1}`}</Text>
                        <Text style={styles.option}>{`b. ${question.option2}`}</Text>
                        <Text style={styles.option}>{`c. ${question.option3}`}</Text>
                        <Text style={styles.option}>{`d. ${question.option4}`}</Text>

                    </View>
                </View>
            
        ))}
          <TouchableOpacity onPress={() => navigation.navigate('SetQuiz')}>
                        <Image source={{
                            uri: "https://static.vecteezy.com/system/resources/previews/000/450/402/original/vector-add-icon.jpg"
                        }} style={styles.imageContainer} />
                    </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('OptionPage')}>               
        <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity> 
        </ScrollView>
        </View>
        
        </View>
        
    )
}
const styles = StyleSheet.create({
    scrollViewContainer: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 8,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 10,
        
      },
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
       marginBottom:50,
       justifyContent:'center',
       alignItems:'center', 
       width:300,
       height:500,
       backgroundColor:'white',
       borderRadius:20,
       shadowColor:'#bbb',
       shadowOpacity:0.80,
       elevation:5
   },
   option:{
    marginRight:180,
    marginLeft:8,
    fontSize:15,
    flexDirection:'column',
    width:100
   },
   imageContainer:{
    height:40,
    width:40,
    marginStart:220,
    marginTop:0
   },
   button:{
    width:100,
    height:40,
    backgroundColor:'#00b4d8',
    padding:10,
    borderRadius:10,
    marginBottom:10
},
buttonText:{
    color:'#fff',
    fontSize:15,
    justifyContent:'center',
    alignItems:'center',
    textAlign:'center'
    
},
})
export default DisplayQuestion;
import React, { useEffect, useState } from 'react';
import {View,Text,StyleSheet,TouchableOpacity, FlatList, ScrollView} from 'react-native';
import Title from './Title';
import axios from 'axios';
import MenuPage from './menuPage';

const ViewQuiz = ({navigation}:{navigation:any})=>{
  interface Questions{
    id: number;
    select_course: string;
    question:string;
    option1:string;
    option2:string;
    option3:string;
    option4:string;
    correctAnswer:string
  }
  const [questions, setQuestions] = useState<Questions[]>([]);
  const [quesNo, setQuesNo] = useState<number>(0);

  useEffect(() => {
    async function fetchQuiz() {
      try {
        const response = await axios.get('http://10.10.241.122:3000/questions');
        setQuestions(response.data);
        console.warn("Quizzes displayed!")
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    }

    fetchQuiz(),increaseQuesNo();
  }, []);
  // Group announcements by courses into a single string
  const groupedCourses: { [key: string]: string } = {};

  questions.forEach((question) => {
    const course = question.select_course;

    if (!groupedCourses[course]) {
      groupedCourses[course] = '';
    }

  });

  const increaseQuesNo = () => {
    setQuesNo(prevQuesNo => prevQuesNo + 1);
  };
 
    return (
        
        <View style={styles.container}>
          <MenuPage/>
        <Title/>
        <Text style={{fontSize:30, fontWeight:'600', marginBottom:20,color:'white'}}>Quizzes</Text>
        <View style={styles.modalView}>
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.contentContainer}>

          {Object.entries(groupedCourses).map(([course, quizString]) => (
              <View key={course} style={styles.itemContainer}>
                  
                <Text style={styles.itemText}>{course}:</Text>
                <Text style={styles.itemText}>{quizString}</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Quiz', {courseName:course})}>
                  <Text style={styles.viewDetailsText}>Attempt Quiz </Text>
                </TouchableOpacity>
              </View>
            ))}
         </View>
            
           
            <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('OptionPage')}>                 
        <Text style={styles.buttonText}>Back</Text>
        
     </TouchableOpacity>
     </ScrollView>
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
       marginBottom:20,
       justifyContent:'center',
       alignItems:'center', 
       width:300,
       height:400,
       backgroundColor:'white',
       borderRadius:20,
       shadowColor:'#bbb',
       shadowOpacity:0.80,
       elevation:5
   },
   scrollViewContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    
  },
   contentContainer: {
    flexDirection: 'column', // Align items horizontally
    alignItems: 'center',
    paddingHorizontal: 8,

  },
   itemContainer: {
    marginTop:8,
    marginBottom:15,
    // marginLeft:10,
    // marginRight:10,
    padding: 8, 
    //marginHorizontal:5,
    flexDirection:"row",
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight:10
  },
  viewDetailsText: {
    color: 'blue',
     marginLeft:50,
    // marginRight:10,
    justifyContent:'space-between',
    textAlign:'left'
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
export default ViewQuiz;
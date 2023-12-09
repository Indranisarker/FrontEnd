import {View, Text, StyleSheet,TouchableOpacity, ScrollView} from 'react-native';
import Title from './Title';
import { useEffect, useState } from 'react';
import axios from 'axios';
import MenuPage from './menuPage';

const shuffleArray=({array}:{array:any})=> {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
const AttemptQuiz = (props:any) =>{
    const [questions, setQuestions] = useState<Questions[]>([]);
  const [quesNo, setQuesNo] = useState(0);
  const [options, setOptions] = useState<any[]>([]);
  const[score,setScore] = useState(0);
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
  useEffect(() => {
    async function fetchQuestions() {
      try {
        const { courseName } = props.route.params;
        const response = await axios.get<Questions[]>(`http://10.10.241.122:3000/questions?course=${courseName}`);
        
        if (response && response.data && response.data.length > 0) {
          // Filter questions based on the courseName
          const filteredQuestions = response.data.filter((Questions) => Questions.select_course === courseName) as Questions[];
          if (filteredQuestions.length > 0) {
            setQuestions(filteredQuestions);
            //setOptions(generateOptionsAndShuffle(filteredQuestions));
          } else {
            console.error('No questions found for the selected course.');
          }
        } else {
          console.error('Fetched data is empty or undefined');
        }
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    }
  
    fetchQuestions();
  }, []);
    const handleNextPress = ()=>{
        setQuesNo(quesNo+1)
        //setOptions(generateOptionsAndShuffle(questions[quesNo+1]))
    }
    interface Question {
        question: string;
        options: string[];
        correct_answer: string;
      }
    const generateOptionsAndShuffle = (question: Question | undefined): string[] => {
        if (!question || !question.options || question.options.length === 0) return [];
        
        const { options, correct_answer } = question;
        const newOptions = [...options, correct_answer];
        shuffleArray({ array: newOptions }); // Assuming shuffleArray mutates the array in place
        return newOptions;
      };
    
      const handleOptionSelect = (selectedOption: string) => {
        const correctAnswer = questions[quesNo].correctAnswer;
        if (selectedOption === correctAnswer) {
          // Logic for correct answer selected
          console.warn('Correct answer!');
            setScore(score+2);
          // You might want to update score or perform other actions
        } 
        if(quesNo!==4){
            setQuesNo(quesNo+1)
            //setOptions(generateOptionsAndShuffle(questions[quesNo+1]))
        }
       
    }
    const showResults = ()=>{
        props.navigation.navigate('Result',{score:score})
    }

    return (
        <View style={styles.container}>
          <MenuPage/>
        <Title/>
        <Text style={{fontSize:30, fontWeight:'600', marginBottom:20,color:'white'}}>Questions</Text>
        <View style={styles.modalView}>
            <View>
        {questions && quesNo < questions.length && (
                    <Text style={{ fontSize: 18, fontWeight: '500', marginLeft: 8 }}>
                    Q{quesNo}. {questions[quesNo].question}
                    </Text>
        )}
                    </View>
                    {questions && quesNo < questions.length && (
                    <View>
                        <TouchableOpacity style = {styles.options} onPress={()=>handleOptionSelect(questions[quesNo].option1)}>
                        <Text style={styles.optionText}>{`a. ${questions[quesNo].option1}`}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style = {styles.options} onPress={()=>handleOptionSelect(questions[quesNo].option2)}>
                        <Text style={styles.optionText}>{`b. ${questions[quesNo].option2}`}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style = {styles.options} onPress={()=>handleOptionSelect(questions[quesNo].option3)}>
                        <Text style={styles.optionText}>{`c. ${questions[quesNo].option3}`}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style = {styles.options} onPress={()=>handleOptionSelect(questions[quesNo].option4)}>
                        <Text style={styles.optionText}>{`d. ${questions[quesNo].option4}`}</Text>
                        </TouchableOpacity>
                      

                    </View>  
                    )} 

                 <View style={styles.bottom}>
                 {quesNo !== 4 && 
                 <TouchableOpacity style={styles.button1}>               
                    <Text style={styles.buttonText}>Skip</Text> 
                 </TouchableOpacity>}
          {quesNo !== 4 && 
          <TouchableOpacity style={styles.button2} onPress={handleNextPress}>               
          <Text style={styles.buttonText}>Next</Text>
       </TouchableOpacity>
       }
        {quesNo === 4 && 
          <TouchableOpacity style={styles.button2} onPress={showResults}>               
          <Text style={styles.buttonText}>Show Result</Text>
       </TouchableOpacity>
       }
        
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
   options:{
    paddingVertical: 12,
    marginRight:5,
   paddingHorizontal:110,
    //width:'85%',
    backgroundColor:"#DFE9F1",
    borderRadius:10,
    marginTop:10,
   
   },
   optionText:{
    writingDirection:'ltr',
    width:"auto",
    fontSize:15,
    color:'black'
   },
   bottom:{
    marginTop:20,
    paddingVertical:20,
    flexDirection:'row',
    justifyContent:'space-between',
   },
   button1:{
    //position:'relative',
    backgroundColor:'#00b4d8',
    padding:10,
    paddingHorizontal:25,
    height:40,
    borderRadius:15,
    marginHorizontal:50
},
button2:{
    position:'relative',
    backgroundColor:'#00b4d8',
    padding:10,
    paddingHorizontal:25,
    borderRadius:15,
    marginHorizontal:50
},
buttonText:{
    color:'#fff',
    fontSize:15,
    justifyContent:'center',
    alignItems:'center',
    textAlign:'center'
    
},
})
export default AttemptQuiz;
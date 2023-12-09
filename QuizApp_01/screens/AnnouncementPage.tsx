import React, {useState} from "react";
import {View,Text,StyleSheet,TextInput,TouchableOpacity, Pressable, Platform} from 'react-native';
import Title from "./Title";
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from "axios";
import MenuPage from "./menuPage";
const AnnouncementPage = ({navigation}:{navigation:any})=>{
    const[courseTitle,setCourseTitle] = useState('');
    const[announcement,setAnnouncement] = useState('');
    const[date,setDate] = useState('');
    const [announceData, setAnnounceData] = useState({
        courseTitle: '',
        announcement: '',
        date: '',
      });

    //for date set
    const[newDate,setNewDate] = useState(new Date());
    const[showPicker,setShowPicker] = useState(false);
    const toggleDatePicker = ()=>{
        setShowPicker(!showPicker)
    }
    const onChange = (event:any, selectedDate:any)=>{
        if (event.type == "set"){
            const currentDate = selectedDate || newDate;
            setNewDate(currentDate)
            if(Platform.OS === "android"){
                toggleDatePicker();
                const formattedDate = currentDate.toISOString().split('T')[0]; // Format date to YYYY-MM-DD
                setDate(formattedDate);
                setAnnounceData({ ...announceData, date: formattedDate });
            }
        }else{
            toggleDatePicker()
        }

    }
    const[courseError,setCourseError] = useState(false)
    const[announceError,setAnnounceError] = useState(false)
    const[dateError,setDateError] = useState(false)
    const handlePost = async()=>{
        if(!courseTitle){
            setCourseError(true)
        }else{
            setCourseError(false)
        }
        if(!announcement){
            setAnnounceError(true)
        }else{
            setAnnounceError(false)
        }
        if(!date){
            setDateError(true)
        }else{
            setDateError(false)
        }
        try {
            const response = await axios.post('http://192.168.0.116:3000/announcements',announceData).then((response)=>{
                const result = response.data
                console.warn("Announcement Saved Successfully!"); 
                navigation.navigate('OptionPage')
            });
            
           // Handle response from backend if needed
          } catch (error) {
            console.error('Error:', error);
          }
    }
    return(
        <View style={styles.container}>
            <MenuPage navigation={navigation}/>
            <Title/>
            <Text style={{fontSize:30, fontWeight:'600', marginBottom:20, color:'#fff'}}>Announcement</Text>
                 <View style={styles.modalView}>
                 <TextInput style={styles.input2} placeholder="Enter Course Title" 
                 value={announceData.courseTitle}
                 onChangeText={(text) => setAnnounceData({ ...announceData, courseTitle: text })}></TextInput>
                  
                 <TextInput style={styles.input1} placeholder="Enter Announcement" 
                 value={announceData.announcement}
                 onChangeText={(text) => setAnnounceData({ ...announceData, announcement: text })}></TextInput>
                 
                {showPicker && (
                    <DateTimePicker
                    mode="date" 
                    display="spinner"
                    is24Hour={true}
                    value={newDate}
                    onChange={onChange}/>
                )}
               {!showPicker && (
                 <Pressable onPress={toggleDatePicker}>
                 <TextInput style={styles.input2} 
                 placeholder="Enter Date" value={announceData.date} 
                 onChangeText={(text) => setAnnounceData({ ...announceData, date: text })} editable={false}>
                 </TextInput>
                 
                 </Pressable>
               )}
                 <TouchableOpacity style={styles.button} onPress={handlePost}>               
        <Text style={styles.buttonText}>Save</Text>
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
     marginBottom:100,
     justifyContent:'center',
     alignItems:'center', 
     width:300,
     height:350,
     backgroundColor:'white',
     borderRadius:20,
     shadowColor:'#bbb',
     shadowOpacity:0.80,
     elevation:5
 },
 input1:{
    borderWidth:1,
    borderColor:'skyblue',
    borderRadius:10,
    paddingHorizontal:10,
    padding:40,
    paddingTop:10,
    width:250,
    marginBottom:10,
},
input2:{
    borderWidth:1,
    borderColor:'skyblue',
    borderRadius:10,
    padding:10,
    width:250,
    marginBottom:10,
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
});
export default AnnouncementPage;
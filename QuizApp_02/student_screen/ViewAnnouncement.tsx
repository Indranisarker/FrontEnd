import React, { useEffect, useState } from 'react';
import {View,Text,StyleSheet,TouchableOpacity, FlatList, ScrollView} from 'react-native';
import Title from './Title';
import axios from 'axios';
import MenuPage from './menuPage';

const ViewAnnouncement = ({navigation}:{navigation:any})=>{
  const [announcements, setAnnouncements] = useState<any[]>([]);

  useEffect(() => {
    async function fetchAnnouncement() {
      try {
        const response = await axios.get('http://10.10.241.122:3000/announcements');
        setAnnouncements(response.data);
        console.warn("Announcement displayed!")
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    }

    fetchAnnouncement();
  }, []);
      
    return (
        
        <View style={styles.container}>
          <MenuPage/>
        <Title/>
        <Text style={{fontSize:30, fontWeight:'600', marginBottom:20,color:'white'}}>Announcements</Text>
        <View style={styles.modalView}>
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.contentContainer}>
        {announcements.map((announcement:any) => (   
          <View key={announcement.id} style={styles.itemContainer}>
              <Text style={styles.itemText}>{announcement.id}.</Text>
            <Text style={styles.itemText}>
            {`${announcement.courseTitle}`}:</Text>
            <TouchableOpacity onPress={()=>navigation.navigate('CourseDetails',{ announcementId: announcement.id })} >
            <Text style={styles.viewDetailsText}>View details</Text> 
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
    paddingHorizontal: 10,

  },
   itemContainer: {
    marginTop:8,
    marginBottom:15,
    marginLeft:10,
    marginRight:10,
    padding: 10, 
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
export default ViewAnnouncement;
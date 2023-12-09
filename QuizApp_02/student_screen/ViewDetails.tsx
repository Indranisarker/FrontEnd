import {View,Text, StyleSheet,TouchableOpacity} from 'react-native';
import Title from './Title';
import ViewAnnouncement from './ViewAnnouncement';
import { useEffect, useState } from 'react';
import axios from 'axios';
import MenuPage from './menuPage';

const ViewDetails = (props:any) => {
  const [details, setDetails] = useState<any>({});


  useEffect(() => {
    async function fetchDetails() {
      const announcementId = props.route.params.announcementId;
      try { 
          const response = await axios.get(`http://10.10.241.122:3000/announcements/${announcementId}`);
          console.log('API response:', response.data);
        setDetails(response.data);
        console.warn("Announcement details displayed!")
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    }

    fetchDetails();
  }, []);
      
    return (
      <View style={styles.container}>
        <MenuPage/>
        <Title/>
        <Text style={{fontSize:30, fontWeight:'600', marginBottom:20,color:'white'}}>Details</Text>
        <View style={styles.modalView}>
        <View style={styles.detailContainer}>
        <Text style= {styles.label}>Quiz Topic:</Text>
          <Text style={styles.value}> {details.announcement}</Text>
          </View>
          <View style={styles.detailContainer}>
          <Text style={styles.label}>Date:</Text>
          <Text style={styles.value}>{details.date}</Text>
          </View>
          <View style={styles.detailContainer}>
          <Text style={styles.label}>Time:</Text>
          <Text style={styles.value}>7.00pm</Text>
          </View>
      
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Duration:</Text>
          <Text style={styles.value}>10 minitues</Text>
          </View>
       
      </View>
      <TouchableOpacity style={styles.button} onPress={()=>props.navigation.navigate('ViewAnnounce')}>                 
        <Text style={styles.buttonText}>Back</Text>
        
     </TouchableOpacity>
      </View>
    );
  };
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
       width:320,
       height:200,
       backgroundColor:'white',
       borderRadius:20,
       shadowColor:'#bbb',
       shadowOpacity:0.80,
       elevation:5
   },
   detailContainer: {
    marginLeft:10,
    marginRight:10,
    flexDirection: 'row',
    alignItems:'center',
   //marginEnd:80,
    marginBottom: 10,

  },
  label: {
    fontWeight: 'bold',
    marginRight: 10,
    fontSize:18,
    textAlign: 'left',
    //writingDirection:'auto'


  },
  value: {
    fontSize: 18,
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
export default ViewDetails;
  
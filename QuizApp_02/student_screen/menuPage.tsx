import React, { useState } from 'react';
import {View, Text, TouchableOpacity, Image,Modal,StyleSheet} from 'react-native'

const MenuPage = (props:any)=>{
    const [showMenu, setShowMenu] = useState(false);
      
    const toggleMenu = () => {
      setShowMenu(!showMenu);
    };
    return(
        <View>
           <TouchableOpacity onPress={toggleMenu}>
        <Image source={{uri:"https://www.pinclipart.com/picdir/big/532-5328945_menu-bar-icon-white-clipart-png-download-menu.png" }} 
            style={{width:30,height:30, marginRight:280,marginTop:40,}}/>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showMenu}
        onRequestClose={toggleMenu}
      >
        <View style={styles.modalContent}>
            <TouchableOpacity onPress={toggleMenu}>
              <Text style={styles.closeButton}>Close</Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={()=>props.navigation.navigate('Profile')}>
              <Text style={styles.menuItem}>Setting</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>props.navigation.navigate('Home')}>
              <Text style={styles.menuItem}>Logout</Text>
            </TouchableOpacity>
       
          </View>
      </Modal>
        </View>
    )
}
const styles = StyleSheet.create({
    modalContent: {
        backgroundColor: 'white',
        marginLeft:20,
        marginTop:20,
        padding: 20,
        borderRadius: 10,
        width: '40%',
        maxHeight: '20%',
        alignItems: 'center',
      },
    menuButton: {
        fontSize: 18,
        color: 'blue',
      },
      closeButton: {
        fontSize: 16,
        color: 'red',
        marginBottom: 10,
      },
      menuItem: {
        fontSize: 16,
        marginVertical: 10,
      },
})
export default MenuPage;
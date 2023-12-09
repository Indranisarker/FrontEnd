import { StyleSheet, Text, View } from 'react-native';

const Title = ()=>{
  return (
    <View>
      <Text style={styles.text}>Quiz App</Text>
    </View>
  );
}
const styles = StyleSheet.create({
    text:{
        fontSize:60,
        justifyContent:'center',
        alignItems:'center',
        color:'white',
        marginLeft:10,
        fontStyle:'normal',
        marginVertical:30
    }
})
export default Title;
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
import Home from './student_screen/Home';
import LoginPage from './student_screen/LoginPage';
import OptionPage from './student_screen/OptionPage';
import ViewAnnouncement from './student_screen/ViewAnnouncement';
import ViewDetails from './student_screen/ViewDetails';
import AttemptQuiz from './student_screen/AttemptQuiz';
import ResultPage from './student_screen/ResultPage';
import SignUP from './student_screen/SignUp';
import ViewQuiz from './student_screen/ViewQuiz';
//import 'react-native-gesture-handler';
//import { createDrawerNavigator } from '@react-navigation/drawer';

const Stack = createStackNavigator();
const App = ()=> {
  return (
    <View style={styles.container}>
      <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name = 'Home' component={Home}/>
    <Stack.Screen name = 'Login' component={LoginPage}/>
    <Stack.Screen name = 'OptionPage' component={OptionPage}/>
    <Stack.Screen name='ViewAnnounce' component={ViewAnnouncement}/>
    <Stack.Screen name='CourseDetails' component={ViewDetails}/>
    <Stack.Screen name='ViewQuiz' component={ViewQuiz}/>
    <Stack.Screen name='Quiz' component={AttemptQuiz}/>
    <Stack.Screen name='Result' component={ResultPage}/>
    <Stack.Screen name='SignUp' component={SignUP}/>
  </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
});
export default App;

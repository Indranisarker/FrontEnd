import { StyleSheet, Text, View } from 'react-native';
import Home from './screens/Home';
import OptionPage from './screens/OptionPage';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
//import {createDrawerNavigator} from '@react-navigation/drawer';
import LoginPage from './screens/LoginPage';
import AnnouncementPage from './screens/AnnouncementPage';
import DateTimePicker from '@react-native-community/datetimepicker';
import {AuthContext, AuthProviders} from './screens/providers/AuthProviders'
import SetQuiz from './screens/SetQuiz';
import DisplayQuestion from './screens/DisplayQuestion';
import SignUp from './screens/SignUp';
import Profile from './screens/Profile';
import MenuPage from './screens/menuPage';

const Stack = createStackNavigator();
//const Drawer = createDrawerNavigator();
const App = ()=> {
  return (
    <View style={styles.container}>
      {/* <AuthProviders>
        <AuthContext.Consumer>
          {(auth)=>
          auth?.isLoggedIn ?(
            <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name='OptionPage' component={OptionPage}/>
          <Stack.Screen name='Login' component={LoginPage}/>
          <Stack.Screen name='Announcement' component={AnnouncementPage}/>
          </Stack.Navigator>  
        </NavigationContainer>
          ):(
            <NavigationContainer>
              <Stack.Screen name='Home' component={Home}/>
            </NavigationContainer>
          )
       
}
      </AuthContext.Consumer>
      </AuthProviders> */}
      <NavigationContainer>
      
            <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Home' component={Home}/>
          <Stack.Screen name='OptionPage' component={OptionPage}/>
          <Stack.Screen name='Login' component={LoginPage}/>
          <Stack.Screen name='Announcement' component={AnnouncementPage}/>
          <Stack.Screen name='SetQuiz' component={SetQuiz}/>
          <Stack.Screen name='Display' component={DisplayQuestion}/>
          <Stack.Screen name='SignUp' component={SignUp}/>
          <Stack.Screen name='Profile' component={Profile}/>
          <Stack.Screen name='menu' component={MenuPage}/>
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
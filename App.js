
import { StyleSheet} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {NavigationContainer} from '@react-navigation/native';
import Login from './login';
import SignUp from './signup';
import ringing from './ringing';
import  camera  from './camera';
import audio from './audio';
import choose from './choose';
import paststories from './paststories';
import displayit from './displayit';



const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown : false}} >
        <Stack.Screen name = "LOGIN" component = {Login} />
        <Stack.Screen name = "CHOOSE" component = {choose} />
        <Stack.Screen name = "displayit" component = {displayit} />
        <Stack.Screen name = "RECORD" component = {audio} />
        <Stack.Screen name = "CAMERA" component = {camera} />
        <Stack.Screen name = "PAST" component = {paststories} />
        <Stack.Screen name = "RINGING" component = {ringing} />
        <Stack.Screen name = "SIGNUP" component = {SignUp} /> 
        </Stack.Navigator>
        </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

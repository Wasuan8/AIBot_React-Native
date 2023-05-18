import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login, Onbaording, Registration } from './screens';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Tabs from './navigationtabs/Tabs';



const Stack = createNativeStackNavigator();
const App = () => {
  const [firstlaunch, setFirstlaunch] = useState(null);
  useEffect(() => {
    async function setData() {
      const appData = await AsyncStorage.getItem("appLaunched");
      if (appData == null) {
        setFirstlaunch(true);
        AsyncStorage.setItem("appLaunched", "false")
      } else {
        setFirstlaunch(false);
      }
    }
    setData();
  }, []);
  return (
    firstlaunch != null && (
      <NavigationContainer>
        <StatusBar
          backgroundColor='white'
          hidden={false}
        />
        <Stack.Navigator >
          {firstlaunch && (

            <Stack.Screen options={{ headerShown: false }} name="Onbaording" component={Onbaording} />
          )}
          <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} /> 
          <Stack.Screen options={{ headerShown: false }} name="Registration" component={Registration} /> 
          <Stack.Screen options={{ headerShown: false }} name="Home" component={Tabs} /> 


        </Stack.Navigator>
      </NavigationContainer>
    )
    
  )
}

export default App;

const styles = StyleSheet.create({})
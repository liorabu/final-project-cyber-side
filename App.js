import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { UserContext } from './src/contexts/UserContext';
import HomeScreen from './src/screens/HomeSceen';
import LoginScreen from './src/screens/LoginScreen';


const Stack = createStackNavigator();

export default function App() {
  const [userId, setUserId] = React.useState(0);
  // const [userId, setUserId] = React.useState(0);
  // const [userName, setUserName] = React.useState(null);
  // const [systemId, setSystemId] = React.useState(0);
  // const [systemName, setSystemName] = React.useState(null);
  const value = { userId, setUserId};


  return (
    <UserContext.Provider value={value}>
    <SafeAreaView style={{ flex: 1 }}>

    <NavigationContainer>
      <Stack.Navigator >
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: "חומר אפל", headerTitleAlign: 'center', headerTintColor: '#fff', headerLeft: null, headerStyle: { backgroundColor: '#027DB4' } }} />
       
      </Stack.Navigator>
    </NavigationContainer>
  </SafeAreaView>
  </UserContext.Provider>
  )
}


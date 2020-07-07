import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { UserContext } from './src/contexts/UserContext';
import HomeScreen from './src/screens/HomeSceen';
import LoginScreen from './src/screens/LoginScreen';
import OrganiztionsScreen from './src/screens/OrganiztionsScreen';
import OrganizationScreen from './src/screens/OrganizationScreen';
import SystemsScreen from './src/screens/SystemsScreen';

const Stack = createStackNavigator();

export default function App() {
  const [userId, setUserId] = React.useState(0);
  const [orgId, setOrgId] = React.useState(0);
  const [orgName,setOrgName] = React.useState(null);
  const [systemId, setSystemId] = React.useState(0);
  const [systemName, setSystemName] = React.useState(null);
  const value = { userId, setUserId ,orgId, setOrgId,orgName,setOrgName,systemId, setSystemId,systemName, setSystemName};


  return (
    <UserContext.Provider value={value}>
      <SafeAreaView style={{ flex: 1 }}>

        <NavigationContainer>
          <Stack.Navigator >
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={HomeScreen} options={{ title: "חומר אפל", headerTitleAlign: 'center', headerTintColor: '#fff', headerLeft: null, headerStyle: { backgroundColor: '#027DB4' } }} />
            <Stack.Screen name="Organizations" component={OrganiztionsScreen} options={{ title: "חומר אפל", headerTitleAlign: 'center', headerTintColor: '#fff',  headerStyle: { backgroundColor: '#027DB4' } }} />
            <Stack.Screen name="Organization" component={OrganizationScreen} options={{ title: orgName, headerTitleAlign: 'center', headerTintColor: '#fff',  headerStyle: { backgroundColor: '#027DB4' } }} />
            <Stack.Screen name="Systems" component={SystemsScreen} options={{ title: 'מערכות קיימות', headerTitleAlign: 'center', headerTintColor: '#fff', headerStyle: { backgroundColor: '#027DB4' } }} />

          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </UserContext.Provider>
  )
}


import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { StatusBar } from 'expo-status-bar';


import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import RegistrationScreen from './RegistrationScreen';
import WelcomeScreen from './WelcomeScreen';
import { UserContext } from './ContextApp';

const Stack = createStackNavigator();

export default function App() {
  const [connectedUser, setConnectedUser] = useState({ username: "", id: -1 })

  return (
    <>
      <UserContext.Provider value={{ connectedUser, setConnectedUser }}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Registration" component={RegistrationScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </UserContext.Provider>
      <StatusBar style="auto" />
    </>

  );
}


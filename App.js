import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { StyleSheet, Text, View } from 'react-native';
import AddUserScreen from './screens/AddUserScreen'
import UserScreen from './screens/UserScreen'
import UserDetailScreen from './screens/UserDetailScreen'

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#0085E6'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold'
        }
      }}
    >
      <Stack.Screen 
        name="AddUserScreen"
        component={AddUserScreen}
        options={{ title: 'Add User'}}
      />
      <Stack.Screen 
        name="UserScreen"
        component={UserScreen}
        options={{ title: 'User Screen'}}
      />
      <Stack.Screen 
        name="UserDetailScreen"
        component={UserDetailScreen}
        options={{ title: 'User Detail'}}
      />
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
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

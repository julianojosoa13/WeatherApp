import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Home from '../screens/Home'

const Stack = createStackNavigator()

const RootNavigator = () => {
  return (
    <Stack.Navigator
        screenOptions={{
            headerShown: false,
        }}
    >
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  )
}

export default RootNavigator
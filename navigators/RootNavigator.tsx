import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Home from '../screens/Home'
import WeatherList from '../screens/WeatherList'

const Stack = createStackNavigator()

const RootNavigator = () => {
  return (
    <Stack.Navigator
        screenOptions={{
            headerShown: false,
        }}
    >
      <Stack.Screen name="List" component={WeatherList} />
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  )
}

export default RootNavigator
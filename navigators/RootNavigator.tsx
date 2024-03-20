import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Home from '../screens/Home'
import WeatherList from '../screens/WeatherList'
import { eventEmiter } from '../utils/EventEmiter'
import { fetchWeatherData, getLocationData } from '../services/LocationService'
import { useWeatherData } from '../context/WeatherDataContext'

const Stack = createStackNavigator()

const RootNavigator = () => {
  const {setWeatherData} = useWeatherData()

  const handleLocationEvent = async () => {
    const locationData = await getLocationData()
    const {latitude, longitude} = locationData!
    const weatherData = await fetchWeatherData(latitude, longitude)
    console.log(weatherData)
    setWeatherData(weatherData)
  } 

  useEffect(()=>{
    const listener = eventEmiter.addListener('locationEvent', async () => {
      await handleLocationEvent()
    })
    return () => {
      listener.remove()
    }
  },[])

  return (
    <Stack.Navigator
        screenOptions={{
            headerShown: false,
        }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="List" component={WeatherList} />
    </Stack.Navigator>
  )
}

export default RootNavigator
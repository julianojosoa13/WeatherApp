import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Weather } from '../../models/Weather'
import { DEGREE_SYMBOL } from '../../utils/Constants'

interface WeatherInfoProps {
    weather: Weather
}
const WeatherInfo = ({weather}:WeatherInfoProps) => {
  const {city, high, low, temperature, condition} = weather
  return (
    <View>
      <Text style={styles.cityText}>{city}</Text>
      <Text style={styles.temperatureText}>{temperature}</Text>
      <Text style={styles.conditionText}>{condition}</Text>
      <Text style={styles.minMaxText}>H: {high}{DEGREE_SYMBOL}    L: {low}{DEGREE_SYMBOL}</Text>
    </View>
  )
}

export default WeatherInfo

const styles = StyleSheet.create({})
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BackgroundGradient from '../components/BackgroundGradient'

const WeatherList = () => {
  return (
    <View
        style={styles.container}
    >
      <BackgroundGradient />
    </View>
  )
}

export default WeatherList

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})
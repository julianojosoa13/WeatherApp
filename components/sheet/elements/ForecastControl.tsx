import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const ForecastControl = () => {
  return (
    <View style={{flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 32}}>
      <TouchableOpacity>
        <Text style={styles.forecastText}>Hourly Forecast</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.forecastText}>Weekly Forecast</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ForecastControl

const styles = StyleSheet.create({
    forecastText: {
        fontFamily: "SF-Semibold",
        fontSize: 15,
        lineHeight: 20,
        color: "rgba(235,235,245,0.6)"
    }
})
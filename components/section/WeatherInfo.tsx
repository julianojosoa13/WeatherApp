import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Weather } from '../../models/Weather'
import { DEGREE_SYMBOL } from '../../utils/Constants'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Animated, { Extrapolation, interpolate, interpolateColor, useAnimatedStyle } from 'react-native-reanimated'
import { useForecastSheetPosition } from '../../context/ForecastSheetContext'

interface WeatherInfoProps {
    weather: Weather
}
const WeatherInfo = ({weather}:WeatherInfoProps) => {
  const topMargin = 51
  const {city, high, low, temperature, condition} = weather
  const {top} = useSafeAreaInsets()
  const weatherInfoMargin = top + topMargin

  const animatedPosition = useForecastSheetPosition()

  const animatedViewStyle = useAnimatedStyle(()=>{
    return {
      transform: [{translateY: interpolate(animatedPosition.value, [0,1], [0, -topMargin], Extrapolation.CLAMP)}]
    }
  })

  const animatedMinMaxTextStyle = useAnimatedStyle(()=>{
    return {
      opacity: interpolate(animatedPosition.value, [0,0.5], [1,0])
    }
  })

  const animtatedTempTextStyle = useAnimatedStyle(()=>{
    const fontFamily = animatedPosition.value > 0.5? "SF-Semibold": "SF-Thin"
    return {
      fontFamily,
      opacity: interpolate(animatedPosition.value, [0,0.5,1], [1,0,1]),
      fontSize: interpolate(animatedPosition.value, [0,1], [96,20]),
      lineHeight: interpolate(animatedPosition.value, [0,1], [96,20]),
      color: interpolateColor(animatedPosition.value, [0,1], ["#FFF", "rgba(235, 235, 245,0.6)"]),
    }
  })

  return (
    <Animated.View style={[{marginTop: weatherInfoMargin, alignItems: "center"}, animatedViewStyle]}>
      <Animated.Text style={styles.cityText}>{city}</Animated.Text>
      <Animated.Text style={[styles.temperatureText, animtatedTempTextStyle]}>
        {temperature}
        {DEGREE_SYMBOL}
      </Animated.Text>
      <Animated.Text style={styles.conditionText}>{condition}</Animated.Text>
      <Animated.Text style={[styles.minMaxText, animatedMinMaxTextStyle]}>H: {high}{DEGREE_SYMBOL}    L: {low}{DEGREE_SYMBOL}</Animated.Text>
    </Animated.View>
  )
}

export default WeatherInfo

const styles = StyleSheet.create({
    cityText: {
        fontFamily: "SF-Semibold",
        fontSize: 34,
        color: "#FFF",
        lineHeight: 41
    },
    temperatureText: {
        fontFamily: "SF-Thin",
        fontSize: 96,
        color: "#FFF",
        lineHeight: 96
    },
    conditionText: {
        fontFamily: "SF-Semibold",
        fontSize: 20,
        lineHeight: 20,
        color: "rgba(235,235,245,0.6)"
    },
    minMaxText: {
        fontFamily: "SF-Semibold",
        fontSize: 20,
        lineHeight: 20,
        color: "#FFF"
    }
})
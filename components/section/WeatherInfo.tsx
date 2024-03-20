import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Weather } from '../../models/Weather'
import { DEGREE_SYMBOL } from '../../utils/Constants'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Animated, { Extrapolation, interpolate, interpolateColor, useAnimatedStyle } from 'react-native-reanimated'
import { useForecastSheetPosition } from '../../context/ForecastSheetContext'
import { useWeatherData } from '../../context/WeatherDataContext'


const WeatherInfo = () => {
  const {weatherData} = useWeatherData()
  const topMargin = 51
  const {currentWeather: {city, high, low, temperature, condition}} = weatherData
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
      fontSize: interpolate(animatedPosition.value, [0,1], [96,20], Extrapolation.CLAMP),
      lineHeight: interpolate(animatedPosition.value, [0,1], [96,20], Extrapolation.CLAMP),
      color: interpolateColor(animatedPosition.value, [0,1], ["#FFF", "rgba(235, 235, 245,0.6)"]),
    }
  })

  const animatedSeparatorTextStyle = useAnimatedStyle(()=>{
    const display = animatedPosition.value > 0.5 ? "flex": "none"
    return {
      display,
      opacity: interpolate(animatedPosition.value, [0,0.5,1], [0,0,1]),
    }
  })

  const animatedTextConditionStyle = useAnimatedStyle(()=>{
    const flexDirection = animatedPosition.value > 0.5? "row" : "column"
    const gap = animatedPosition.value > 0.5? 4 : 0
    return {
      flexDirection,
      gap
    }
  })

  const animatedConditionTextStyle = useAnimatedStyle(()=>{
    return {
      transform:[{translateY: interpolate(animatedPosition.value, [0,0.5,1], [0,-20,0])}]
    }
  })

  return (
    <Animated.View style={[{marginTop: weatherInfoMargin, alignItems: "center"}, animatedViewStyle]}>
      <Animated.Text style={styles.cityText}>{city}</Animated.Text>
      <Animated.View
        style={[{alignItems: "center"}, animatedTextConditionStyle]}
      >
        <Animated.View
          style={[{flexDirection: "row"}]}
        >
          <Animated.Text style={[styles.temperatureText, animtatedTempTextStyle]}>
            {temperature}
            {DEGREE_SYMBOL}
          </Animated.Text>

          <Animated.Text
            style={[styles.separatorText,animatedSeparatorTextStyle]}
          >
            |
          </Animated.Text>
        </Animated.View>
        <Animated.Text style={[styles.conditionText, animatedConditionTextStyle]}>{condition}</Animated.Text>
        </Animated.View>
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
    },
    separatorText: {
      fontFamily: "SF-Semibold",
      fontSize: 20,
      lineHeight: 20,
      color: "rgba(235,235,245,0.6)",
      marginHorizontal: 2,
      display: "none"
    }
})
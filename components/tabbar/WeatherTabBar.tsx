import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ArcComponent from './elements/ArcComponent'
import useApplicationDimensions from '../../hooks/useApplicationDimensions'
import TabBarItems from './elements/TabBarItems'
import { BlurView } from 'expo-blur'
import { useForecastSheetPosition } from '../../context/ForecastSheetContext'
import Animated, { Extrapolation, interpolate, useAnimatedStyle } from 'react-native-reanimated'

const WeatherTabBar = () => {
  const {width, height} = useApplicationDimensions()
  const tabBarHeight = height * 0.12

  const animatedPosition = useForecastSheetPosition()

  const animatedViewStyle = useAnimatedStyle(()=>{
    return {
      transform: [{translateY: interpolate(animatedPosition.value, [0,1], [0, tabBarHeight + 20], Extrapolation.CLAMP)}]
    }
  })
  return (
    <Animated.View
      style={[
        {
          ...StyleSheet.absoluteFillObject, 
          top: height - tabBarHeight,
        },
        animatedViewStyle
      ]}
    >
      <BlurView 
          style={{
            ...StyleSheet.absoluteFillObject,
            height: tabBarHeight,
          }}
          intensity={50}
          tint='dark'
          >
        <ArcComponent height={tabBarHeight} width={width}/>
        <TabBarItems />
      </BlurView>
    </Animated.View>
  )
}

export default WeatherTabBar

const styles = StyleSheet.create({})
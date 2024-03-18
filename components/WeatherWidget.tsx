import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import useApplicationDimensions from '../hooks/useApplicationDimensions'
import { Canvas, FitBox, LinearGradient, Path, Skia, rect, usePathInterpolation, vec } from '@shopify/react-native-skia'
import { useSharedValue, withTiming } from 'react-native-reanimated'
import { Forecast } from '../models/Weather'

interface WeatherWidgetProps {
  forecast: Forecast
}

const WeatherWidget = ({forecast}:WeatherWidgetProps) => {
  const {temperature, high, low, location, icon, weather} = forecast
  const {width} = useApplicationDimensions()
  const widgetWidth = width * 0.875
  const widgetHeight = widgetWidth / 1.95

  const initialPath = Skia.Path.MakeFromSVGString("M0 66.4396C0 31.6455 0 14.2484 11.326 5.24044C22.6519 -3.76754 39.6026 0.147978 73.5041 7.97901L307.903 62.1238C324.259 65.9018 332.436 67.7909 337.218 73.8031C342 79.8154 342 88.2086 342 104.995V131C342 151.742 342 162.113 335.556 168.556C329.113 175 318.742 175 298 175H44C23.2582 175 12.8873 175 6.44365 168.556C0 162.113 0 151.742 0 131V66.4396Z")
  const skewedPath = Skia.Path.MakeFromSVGString("M1.13802 66.5329C0.149349 32.5295 -0.344987 15.5278 10.4273 6.20755C21.1996 -3.11274 37.9536 -0.179038 71.4615 5.68837L301.126 45.9037C317.815 48.826 326.159 50.2872 331.268 56.104C336.377 61.9208 336.75 70.384 337.494 87.3105L338.979 121.066C339.928 142.636 340.403 153.421 333.905 160.211C327.408 167 316.613 167 295.022 167H46.7985C26.6014 167 16.5028 167 10.1002 160.781C3.69752 154.562 3.40402 144.467 2.81702 124.279L1.13802 66.5329Z")
  
  const progress = useSharedValue(0)
  const path = usePathInterpolation(progress, [0,1], [initialPath!, skewedPath!])

  const onPress= ()=>{
    const status = progress.value === 1? 0:1
    progress.value = withTiming(status,{duration:500})
  }

  return (
    <Pressable
      style={{
        width: widgetWidth,
        height: widgetHeight,
      }}
      onPress={onPress}
    >
      <Canvas
        style={{
          ...StyleSheet.absoluteFillObject,
        }}
      >
        <FitBox
          src={rect(0,0,342,175)}
          dst={rect(0,0,widgetWidth, widgetHeight)}
        >
          <Path 
            path={path}
          >
            <LinearGradient 
              start={vec(0,widgetHeight/2)}
              end={vec(widgetWidth,widgetHeight/2)}
              colors={["#5936B4", "#362A84"]}
            />
          </Path>
        </FitBox>
      </Canvas>
      <View 
        style={{flex:1}}
      >

      </View>
    </Pressable>
  )
}

export default WeatherWidget

const styles = StyleSheet.create({})
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Forecast } from '../../models/Weather'
import { Canvas, RoundedRect } from '@shopify/react-native-skia'

interface ForecastCapsuleProps {
    forecast: Forecast,
    width: number,
    height: number,
    radius: number,
}

const ForecastCapsule = ({forecast,width,height,radius}: ForecastCapsuleProps) => {
  return (
    <View
        style={{
            width,
            height,
        }}
    >
      <Canvas
        style={{
            flex:1
        }}
      >
        <RoundedRect
            x={0}
            y={0}
            width={width}
            height={height}
            r={radius}
        >

        </RoundedRect>
      </Canvas>
    </View>
  )
}

export default ForecastCapsule

const styles = StyleSheet.create({})
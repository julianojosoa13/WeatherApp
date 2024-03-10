import { LayoutChangeEvent, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
import { Canvas, Line, LinearGradient, vec } from '@shopify/react-native-skia'
import { ForecastType } from '../../../models/Weather'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

interface ForecastControlProps {
    onPress: (forecastType: ForecastType) => void,
}

const ForecastControl = ({onPress}: ForecastControlProps) => {
  const {width} = useWindowDimensions()
  const [textWidth, setTextWidth] = useState(0)
     
  const onTextLayout = (event: LayoutChangeEvent) => {
    setTextWidth(event.nativeEvent.layout.width)
  }
  const spacingX = 32   

  const strokeWidth = 5

  const segmentTranslateX = useSharedValue(0)

  const AnimatedCanvas = Animated.createAnimatedComponent(Canvas)

  const animatedSegmentLineStyle = useAnimatedStyle(()=> {
    return {
        transform: [{translateX: segmentTranslateX.value}]
    }
  })

  const onForecastPress = (type: ForecastType) => {
    if (type === ForecastType.Weekly) {
        segmentTranslateX.value = withTiming(width  - textWidth - spacingX * 2, {
            duration: 600,
        })
    } else {
        segmentTranslateX.value = withTiming(0, {
            duration: 600,
        })
    }
    onPress(type)
  }
  return (
    <>
        <View style={{flexDirection: "row", justifyContent: "space-between", paddingHorizontal: spacingX}}>
            <TouchableOpacity onPress={() => onForecastPress(ForecastType.Hourly)}>
                <Text onLayout={onTextLayout} style={styles.forecastText}>Hourly Forecast</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onForecastPress(ForecastType.Weekly)}>
                <Text onLayout={onTextLayout} style={styles.forecastText}>Weekly Forecast</Text>
            </TouchableOpacity>
        </View>
        <AnimatedCanvas
            style={[
                {
                height: strokeWidth,
                width: textWidth,
                marginLeft: spacingX,
                },
                animatedSegmentLineStyle
            ]}
        >
            <Line 
                p1={vec(0,0)}
                p2={vec(textWidth, 0)}
                strokeWidth={strokeWidth}
            >
                <LinearGradient
                    start={vec(0,0)}
                    end={vec(textWidth,0)}
                    colors={["rgba(47,112,177,0)", "rgba(147,112,177,1)","rgba(47,112,177,0)"]}
                />
            </Line>
        </AnimatedCanvas>
    </>
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
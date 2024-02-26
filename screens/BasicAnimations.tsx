import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withRepeat, withSpring } from 'react-native-reanimated';

const BasicAnimations = () => {
  const colors = ["blue", "teal", "green", "yellow","purple", "whitesmoke", "orange", "red"]
  const SIZE = 200;
  const scale = useSharedValue(1)
  const borderRadius = useSharedValue(0)
  const opacity = useSharedValue(0)
  const color = useSharedValue("blue")
  const squareCircleStyle = useAnimatedStyle(() => {
    return {
        transform: [
            {scale: scale.value},
            {translateY: interpolate(borderRadius.value, [0,1],[-300,100])}
        ],
        backgroundColor: color.value,
        borderRadius: borderRadius.value * SIZE,
        // opacity: opacity.value * 0.1
    }
  })

  useEffect(()=> {
    scale.value =  withRepeat(withSpring(2), -1, true)
    borderRadius.value =  withRepeat(withSpring(1), -1, true)
    // opacity.value = withRepeat(withSpring(10), -1, true)
    const changeColor = () => {
        const idx = Math.floor(Math.random() * 10 % 7)
        // console.log(idx)
        color.value = colors[idx]
        setTimeout(()=>{
            changeColor()
        }, 600)
    }
    changeColor()
  },[])

  return (
    <View style={{flex:1, justifyContent: "center", alignItems: "center"}}>
      <Animated.View style={[{height: SIZE, width: SIZE, backgroundColor: "red"}, squareCircleStyle]}>

      </Animated.View>
    </View>
  )
}

export default BasicAnimations

const styles = StyleSheet.create({})
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Canvas, Circle, Line, LinearGradient, Shadow, vec } from '@shopify/react-native-skia'

interface CircleButtonComponents {
    radius:number;
    pressed:Boolean
}

const CircleButton = ({radius, pressed}: CircleButtonComponents) => {
  const diameter = radius * 2
  return (
    <Canvas style={{
        width: diameter,
        height: diameter,
        }}
    >
        <Circle
            cx={radius} 
            r={radius}
            cy={radius}
        >
            <LinearGradient 
                start={vec(0,0)}
                end={vec(diameter,diameter)}
                colors={[
                    pressed? "#BBBFC7":"#F5F5F9",
                    pressed? "#FFFFFF":"#DADFE7"
                ]}
            />
            <Shadow dx={1} dy={1} blur={0.5} color={"white"} inner/>
            
        </Circle>
        <Line 
            p1={vec(radius- radius/3, radius)}
            p2={vec(radius+ radius/3, radius)}
            color={"#48319D"}
            strokeWidth={4}
            style={"stroke"}
            strokeCap={"round"}
        />
        <Line 
            p1={vec(radius, radius- radius/3)}
            p2={vec(radius, radius+ radius/3)}
            color={"#48319D"}
            strokeWidth={4}
            style={"stroke"}
            strokeCap={"round"}
        />
    </Canvas>
  )
}

export default CircleButton

const styles = StyleSheet.create({})
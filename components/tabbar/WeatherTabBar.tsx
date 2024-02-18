import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ArcComponent from './elements/ArcComponent'
import useApplicationDimensions from '../../hooks/useApplicationDimensions'
import TabBarItems from './elements/TabBarItems'
import { BlurView } from 'expo-blur'

const WeatherTabBar = () => {
  const {width, height} = useApplicationDimensions()
  const tabBarHeight = height * 0.12
  return (
    <BlurView 
        style={{
            ...StyleSheet.absoluteFillObject, 
            top: height - tabBarHeight,
            height: tabBarHeight,
        }}
        intensity={50}
        tint='dark'
    >
      <ArcComponent height={tabBarHeight} width={width}/>
      <TabBarItems />
    </BlurView>
  )
}

export default WeatherTabBar

const styles = StyleSheet.create({})
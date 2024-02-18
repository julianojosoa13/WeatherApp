import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ArcComponent from './elements/ArcComponent'
import useApplicationDimensions from '../../hooks/useApplicationDimensions'
import TabBarItems from './elements/TabBarItems'

const WeatherTabBar = () => {
  const {width, height} = useApplicationDimensions()
  const tabBarHeight = height * 0.12
  return (
    <View 
        style={{
            ...StyleSheet.absoluteFillObject, 
            top: height - tabBarHeight,
            height: tabBarHeight,
        }}
    >
      <ArcComponent height={tabBarHeight} width={width}/>
      <TabBarItems />
    </View>
  )
}

export default WeatherTabBar

const styles = StyleSheet.create({})
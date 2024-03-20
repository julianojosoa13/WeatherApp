import { Pressable, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import MapIcon from '../icons/MapIcon'
import ListIcon from '../icons/ListIcon'
import TrapezoidBackground from './TrapezoidBackground'
import useApplicationDimensions from '../../../hooks/useApplicationDimensions'
import CircleButton from './CircleButton'
import { ParamListBase, useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { eventEmiter } from '../../../utils/EventEmiter'

const TabBarItems = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>()
  const {width, height} = useApplicationDimensions()
  const trapezoidWidth = width * 0.68
  const trapezoidHeight = height * 0.12
  const circleRadius = (trapezoidHeight * 0.51) / 2
  const buttonCenterX = (width / 2) - circleRadius
  return (
    <View 
        style={{
            flex:1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 32,
        }}
        >
      <Pressable onPress={() => eventEmiter.emit('locationEvent')}>
        <MapIcon />
      </Pressable>
      <TrapezoidBackground width={trapezoidWidth} height={trapezoidHeight} />
      <Pressable 
        style={{
          ...StyleSheet.absoluteFillObject,
          left: buttonCenterX,
          top: 12,
          width: circleRadius * 2,
          height: circleRadius * 2,
        }}
      >
        {({pressed})=> {
          return  (
              <CircleButton radius={circleRadius} pressed={pressed}/>
            )
          }
        }
      </Pressable>
      <Pressable
        onPress={() =>  navigation.navigate("List")}
        hitSlop={10}
      >
        <ListIcon />
      </Pressable>
    </View>
  )
}

export default TabBarItems

const styles = StyleSheet.create({})
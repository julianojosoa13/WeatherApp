import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MapIcon from '../icons/MapIcon'
import ListIcon from '../icons/ListIcon'

const TabBarItems = () => {
  return (
    <View style={{flex:1, backgroundColor: "red"}}>
      <MapIcon />
      <ListIcon />
    </View>
  )
}

export default TabBarItems

const styles = StyleSheet.create({})
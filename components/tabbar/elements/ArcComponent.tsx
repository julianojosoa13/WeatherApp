import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Canvas, Path } from '@shopify/react-native-skia'

interface ArcComponentProps {
  height : number,
  width: number,
}

const ArcComponent = ({height,width}: ArcComponentProps) => {
  const arcPath = `M 0 0 Q ${width/2} ${height/2} ${width} 0 L ${width} ${height} L 0 ${height} Z`
  return (
    <Canvas
      style={{
        height
      }}
    >
      <Path
        path={arcPath}
      />

    </Canvas>
  )
}

export default ArcComponent

const styles = StyleSheet.create({})
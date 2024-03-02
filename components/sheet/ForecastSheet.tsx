import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import BottomSheet from '@gorhom/bottom-sheet'
import ForecastSheetBackground from './ForecastSheetBackground'
import useApplicationDimensions from '../../hooks/useApplicationDimensions'
import ForecastControl from './elements/ForecastControl'
import Separator from './elements/Separator'
import {hourly, weekly } from '../../data/ForecastData'
import ForecastScroll from '../forecast/ForecastScroll'
import { ForecastType } from '../../models/Weather'
import AirQualityWidget from '../forecast/widgets/AirQualityWidget'
import UvIndexWidget from '../forecast/widgets/UvIndexWidget'
import WindWidget from '../forecast/widgets/WindWidget'
import SunriseWidget from '../forecast/widgets/SunriseWidget'
import RainFallWidget from '../forecast/widgets/RainFallWidget'
import FeelsLikeWidget from '../forecast/widgets/FeelsLikeWidget'
import HumidityWidget from '../forecast/widgets/HumidityWidget'
import VisibilityWidget from '../forecast/widgets/VisibilityWidget'
import PressureWidget from '../forecast/widgets/PressureWidget'
import { ScrollView } from 'react-native-gesture-handler'
import { useAnimatedReaction, useSharedValue } from 'react-native-reanimated'
import { useForecastSheetPosition } from '../../context/ForecastSheetContext'

const ForecastSheet = () => {
  const snapPoints = ["38.5%","83%"]
  const {width,height} = useApplicationDimensions()
  const animatedPosition = useForecastSheetPosition()

  const firstSnapPoint = height * (parseFloat(snapPoints[0])/100)
  const secondSnapPoint = height * (parseFloat(snapPoints[1])/100)

  const minY = height - secondSnapPoint
  const maxY = height - firstSnapPoint

  const cornerRadius = 44
  const capsuleRadius = 30
  const capsuleHeight = height * 0.17
  const capsuleWidth = width * 0.15

  const smallWidgetSize = width/2 - 20
  
  const [selectedForecastType, setSelectedForecastType] = useState(ForecastType.Hourly)
  const forecasts = selectedForecastType === ForecastType.Hourly ? hourly:weekly

  const currentPosition = useSharedValue(0)

  const normalizePosition = (position: number)=> {
    "worklet"
    return ((position - maxY) / (maxY - minY) * -1)
  }

  useAnimatedReaction(() => {
    return currentPosition.value
  }, (cv) => {
    console.log(normalizePosition(cv))
  })

  return (
    <BottomSheet
      snapPoints={snapPoints}
      handleIndicatorStyle={{
        width: 48,
        height: 5,
        backgroundColor: "rgba(255,255,255,0.6)"
      }}
      backgroundComponent={() => (
        <ForecastSheetBackground width={width} height={firstSnapPoint} cornerRadius={cornerRadius}/>
      )}
      animatedPosition={currentPosition}
      animateOnMount={false}
    > 
      <>
        <ForecastControl onPress={(type) => setSelectedForecastType(type)}/>
        <Separator width={width} height={3}/>
        <ScrollView
          style={{
            flex:1,
          }}
          contentContainerStyle={{
            paddingBottom: 10,
          }}
        >
          <ForecastScroll 
            capsuleWidth={capsuleWidth} 
            capsuleHeight={capsuleHeight} 
            capsuleRadius={capsuleRadius} 
            forecasts={forecasts} 
          />
          <View
            style={{flex:1,paddingTop:30,paddingBottom: 50}}
          >
            <AirQualityWidget width={width - 30} height={150} />
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
                padding:15,
                gap:10,
              }}
            >
              <UvIndexWidget width={smallWidgetSize} height={smallWidgetSize} />
              <WindWidget width={smallWidgetSize} height={smallWidgetSize}/>
              <SunriseWidget width={smallWidgetSize} height={smallWidgetSize}/>
              <RainFallWidget width={smallWidgetSize} height={smallWidgetSize}/>
              <FeelsLikeWidget width={smallWidgetSize} height={smallWidgetSize}/>
              <HumidityWidget width={smallWidgetSize} height={smallWidgetSize}/>
              <VisibilityWidget width={smallWidgetSize} height={smallWidgetSize}/>
              <PressureWidget width={smallWidgetSize} height={smallWidgetSize}/>
            </View>
          </View>
        </ScrollView>
      </>
    </BottomSheet>
  )
}

export default ForecastSheet

const styles = StyleSheet.create({})
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Forecast } from '../../models/Weather'
import { ScrollView } from 'react-native-gesture-handler';
import ForecastCapsule from './ForecastCapsule';

interface ForecastScrollProps {
    forecasts: Forecast[];
    capsuleWidth: number;
    capsuleHeight: number;
    capsuleRadius: number;
}

const ForecastScroll = ({forecasts,capsuleWidth, capsuleHeight, capsuleRadius}: ForecastScrollProps) => {
  return (
    <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{
            paddingLeft: 20,
            paddingTop: 20,
            paddingBottom: 10,
        }}
    >
        <View style={{flex:1, flexDirection: "row", gap: 12, marginRight: 22}}>
            {
                forecasts.map((forecast, index) => {
                    return (
                        <ForecastCapsule
                            key={String(index)} 
                            width={capsuleWidth} 
                            height={capsuleHeight} 
                            radius={capsuleRadius} 
                            forecast={forecast}
                        />
                    )
                })
            }
            
        </View>
    </ScrollView>
  )
}

export default ForecastScroll

const styles = StyleSheet.create({})
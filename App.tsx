import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {Canvas, Rect, LinearGradient, vec} from "@shopify/react-native-skia";
import HomeBackground from './components/HomeBackground';
import WeatherTabBar from './components/tabbar/WeatherTabBar';
import WeatherInfo from './components/section/WeatherInfo';
import { currentWeather } from './data/CurrentWeather';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <HomeBackground />
      <WeatherInfo weather={currentWeather}/>
      <WeatherTabBar />
      <StatusBar style='light'/>
    </SafeAreaProvider>
  );
}


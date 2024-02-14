import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {Canvas, Rect, LinearGradient, vec} from "@shopify/react-native-skia";

export default function App() {
  return (
    <Canvas style={{flex: 1}}>
      <Rect x={0} y={0} width={200} height={200}>
        <LinearGradient 
          start={vec(0,0)}
          end={vec(200,200)}
          colors={["red", 'green']}
        />
      </Rect>
    </Canvas>
  );
}


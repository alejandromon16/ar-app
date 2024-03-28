import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber/native";
import { Box, Plane } from "@react-three/drei/native";
import { Gyroscope } from "expo-sensors";
import { View, Text } from "react-native";

export default function App() {
  const [rotation, setRotation] = useState<[number, number, number]>([0, 0, 0]);

  useEffect(() => {
    Gyroscope.setUpdateInterval(200); // Set the update interval to 200ms

    const subscription = Gyroscope.addListener((gyroscopeData) => {
      const { x, y, z } = gyroscopeData;
      setRotation([x, y, z]);
    });

    return () => subscription.remove(); // Clean up the subscription
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Canvas>
        <ambientLight />
        <directionalLight
          position={[0, 1, 1]}
          castShadow
          color={"#a8e344f"}
        />
        <Box position={[0, 0.5, 0]} rotation={rotation} castShadow />
        <Plane
          args={[10, 10]}
          rotation={[-Math.PI / 2, 0, 0]}
          receiveShadow
        />
      </Canvas>
      <View style={{ position: "absolute", top: 40, left: 10 }}>
        <Text style={{ color: "black" }}>X: {rotation[0].toFixed(2)}</Text>
        <Text style={{ color: "black" }}>Y: {rotation[1].toFixed(2)}</Text>
        <Text style={{ color: "black" }}>Z: {rotation[2].toFixed(2)}</Text>
      </View>
    </View>
  );
}

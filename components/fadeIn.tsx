import React, { useEffect, useRef, ReactNode, useState } from "react";
import { View, Text, Button, Animated, StyleSheet } from "react-native";

interface Props {
  children: ReactNode;
  duration: number;
  onFadeOut: () => void;
}

export default function FadeIn({
  children,
  duration = 1000,
  onFadeOut,
}: Props) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!hasAnimated) {
      setHasAnimated(true);
      Animated.sequence([
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start(() => {
        if (onFadeOut) {
          onFadeOut();
        }
      });
    }
  }, [fadeAnim, scaleAnim, hasAnimated, onFadeOut]);

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ scale: scaleAnim }],
      }}
    >
      {children}
    </Animated.View>
  );
}

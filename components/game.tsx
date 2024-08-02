import { Colors } from "@/constants/colors";
import { Move, GestureEventType } from "@/types/types";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import FadeIn from "./fadeIn";
import { useState } from "react";

export default function Game(): JSX.Element {
  const [move, setMove] = useState<Move>(Move.Idle);

  const handleGesture = (e: GestureEventType) => {
    const { translationX, translationY } = e.nativeEvent;
    if (Math.abs(translationX) > Math.abs(translationY)) {
      translationX > 0 ? setMove(Move.Right) : setMove(Move.Left);
    } else {
      translationY > 0 ? setMove(Move.Down) : setMove(Move.Up);
    }
  };

  return (
    <PanGestureHandler
      onGestureEvent={handleGesture}
      onEnded={() => {
        setMove(Move.Idle);
      }}
    >
      <SafeAreaView style={styles.container}>
        {/* <FadeIn duration={1000}>
        </FadeIn> */}
        <Text style={{ color: Colors.white }}>{move}</Text>

        <StatusBar style="auto" hidden={true} />
      </SafeAreaView>
    </PanGestureHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
    alignItems: "center",
    justifyContent: "center",
  },
});

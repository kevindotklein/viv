import { Colors } from "@/constants/colors";
import { Move, GestureEventType } from "@/types/types";
import { StatusBar } from "expo-status-bar";
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import FadeIn from "./fadeIn";
import { useEffect, useState } from "react";

export default function Game(): JSX.Element {
  const [move, setMove] = useState<Move>(Move.Idle);
  const [pads, setPads] = useState<Move[]>([
    Move.Up,
    Move.Down,
    Move.Right,
    Move.Down,
    Move.Left,
    Move.Up,
    Move.Down,
  ]);
  const [canMove, setCanMove] = useState<Boolean>(false);
  const [pad, setPad] = useState<number>(0);

  useEffect(() => {
    if (canMove === true) {
      setTimeout(() => {
        if (move === pads[pad]) {
          console.log(move, pads[pad]);
          console.log("correto");
        } else {
          console.log(move, pads[pad]);
          console.log("errado");
        }
        setPad(pad + 1);
        setCanMove(false);
        setMove(Move.Idle);
      }, 3000);
    }
  }, [canMove]);

  const handleGesture = (e: GestureEventType) => {
    const { translationX, translationY } = e.nativeEvent;
    if (translationX != 0 || translationY != 0) {
      if (Math.abs(translationX) > Math.abs(translationY)) {
        translationX > 0 ? setMove(Move.Right) : setMove(Move.Left);
      } else {
        translationY > 0 ? setMove(Move.Down) : setMove(Move.Up);
      }
    }
  };

  return (
    <PanGestureHandler onGestureEvent={handleGesture}>
      <SafeAreaView style={styles.container}>
        {/* <FadeIn duration={1000}>
        </FadeIn> */}
        <Text style={{ color: Colors.white }}>{move}</Text>

        <TouchableOpacity
          onPress={() => {
            setCanMove(true);
          }}
        >
          <Text style={{ color: Colors.white }}>true</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setCanMove(false);
          }}
        >
          <Text style={{ color: Colors.white }}>false</Text>
        </TouchableOpacity>

        <StatusBar style="auto" hidden={true} />
      </SafeAreaView>
    </PanGestureHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 15,
    backgroundColor: Colors.black,
    alignItems: "center",
    justifyContent: "center",
  },
});

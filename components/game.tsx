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
import Pad from "./pad";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from "lucide-react-native";

export default function Game(): JSX.Element {
  const [move, setMove] = useState<Move>(Move.Idle);
  const [pad, setPad] = useState<number>(-1);
  const [points, setPoints] = useState<number>(0);
  const [canMove, setCanMove] = useState<boolean>(true);

  const generateRandomMoves = (length: number): Move[] => {
    const moves: Move[] = [Move.Up, Move.Down, Move.Right, Move.Left];
    return Array.from(
      { length },
      () => moves[Math.floor(Math.random() * moves.length)]
    );
  };

  const [pads, setPads] = useState<Move[]>(() => generateRandomMoves(30));

  const setAndDisableMove = (move: Move) => {
    setMove(move);
    setCanMove(false);
  };

  useEffect(() => {
    if (pad < pads.length && pad >= 0) {
      if (move === pads[pad]) {
        console.log(
          "move: ",
          move,
          "pad: ",
          pads[pad],
          `pad index: pads[${pad}]`
        );
        setPoints(points + 1);
      } else {
        console.log(
          "move: ",
          move,
          "pad: ",
          pads[pad],
          `pad index: pads[${pad}]`
        );
      }
      setMove(Move.Idle);
    }
  }, [pad]);

  const handleGesture = (e: GestureEventType) => {
    if (canMove) {
      const { translationX, translationY } = e.nativeEvent;
      if (translationX != 0 || translationY != 0) {
        if (Math.abs(translationX) > Math.abs(translationY)) {
          translationX > 0
            ? setAndDisableMove(Move.Right)
            : setAndDisableMove(Move.Left);
        } else {
          translationY > 0
            ? setAndDisableMove(Move.Down)
            : setAndDisableMove(Move.Up);
        }
      }
    }
  };

  return (
    <PanGestureHandler onGestureEvent={handleGesture}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.counter}>{points}</Text>

        {pads.map((p: Move, i: number) => (
          <Pad
            key={i}
            duration={2000}
            onFadeOut={() => {
              setPad(pad + 1);
              i !== pads.length - 1 ? setCanMove(true) : setCanMove(false);
            }}
            direction={p}
            isActive={i === pad + 1}
          />
        ))}

        {move === Move.Up && (
          <ArrowUp
            style={styles.playerMove}
            color={Colors.white}
            strokeWidth={2.5}
            size={28}
          />
        )}
        {move === Move.Down && (
          <ArrowDown
            style={styles.playerMove}
            color={Colors.white}
            strokeWidth={2.5}
            size={28}
          />
        )}
        {move === Move.Right && (
          <ArrowRight
            style={styles.playerMove}
            color={Colors.white}
            strokeWidth={2.5}
            size={28}
          />
        )}
        {move === Move.Left && (
          <ArrowLeft
            style={styles.playerMove}
            color={Colors.white}
            strokeWidth={2.5}
            size={28}
          />
        )}

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

  counter: {
    color: Colors.white,
    position: "absolute",
    top: 120,
    fontSize: 48,
    fontWeight: "bold",
    fontFamily: "sans-serif",
  },

  playerMove: {
    position: "absolute",
    top: 500,
  },
});

import FadeIn from "./fadeIn";
import { Move } from "@/types/types";
import { StyleSheet, Text, View } from "react-native";

interface Props {
  duration: number;
  onFadeOut: () => void;
  direction: Move;
}

export default function Pad({ duration, onFadeOut, direction }: Props) {
  const pickDirection = (dir: Move) => {
    switch (dir) {
      case Move.Up:
        return styles.up;
      case Move.Down:
        return styles.down;
      case Move.Left:
        return styles.left;
      case Move.Right:
        return styles.right;
      default:
        break;
    }
  };

  return (
    <FadeIn duration={duration} onFadeOut={onFadeOut}>
      <View
        style={{
          ...pickDirection(direction),
          width: 80,
          height: 80,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: "white" }}>ldksajflksd</Text>
      </View>
    </FadeIn>
  );
}

const styles = StyleSheet.create({
  up: {
    backgroundColor: "green",
  },
  down: {
    backgroundColor: "red",
  },
  right: {
    backgroundColor: "blue",
  },
  left: {
    backgroundColor: "yellow",
  },
});

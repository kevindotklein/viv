import { Colors } from "@/constants/vivcolors";
import FadeIn from "./fadeIn";
import { Move } from "@/types/types";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";

interface Props {
  duration: number;
  onFadeOut: () => void;
  direction: Move;
  isActive: boolean;
}

export default function Pad({
  duration,
  onFadeOut,
  direction,
  isActive,
}: Props) {
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

  return isActive ? (
    <FadeIn duration={duration} onFadeOut={onFadeOut}>
      <View
        style={{
          ...pickDirection(direction),
          width: 80,
          height: 80,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 10,
        }}
      >
        {direction === Move.Up && (
          <ArrowUp color={Colors.white} strokeWidth={2.5} size={28} />
        )}
        {direction === Move.Down && (
          <ArrowDown color={Colors.white} strokeWidth={2.5} size={28} />
        )}
        {direction === Move.Right && (
          <ArrowRight color={Colors.white} strokeWidth={2.5} size={28} />
        )}
        {direction === Move.Left && (
          <ArrowLeft color={Colors.white} strokeWidth={2.5} size={28} />
        )}
      </View>
    </FadeIn>
  ) : null;
}

const styles = StyleSheet.create({
  up: {
    backgroundColor: Colors.greenPad,
  },
  down: {
    backgroundColor: Colors.redPad,
  },
  right: {
    backgroundColor: Colors.bluePad,
  },
  left: {
    backgroundColor: Colors.yellowPad,
  },
});

import "react-native-gesture-handler";
import Game from "@/components/game";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Game />
    </GestureHandlerRootView>
  );
}

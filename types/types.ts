export interface GestureEventType {
  nativeEvent: { translationX: number; translationY: number };
}

export enum Move {
  Idle,
  Up,
  Down,
  Right,
  Left,
}

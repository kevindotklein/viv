export interface GestureEventType {
  nativeEvent: { translationX: number; translationY: number };
}

export enum Move {
  Up,
  Down,
  Right,
  Left,
  Idle,
}

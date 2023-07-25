import { Menu } from "../../../common/type";

export interface Point {
  x: number;
  y: number;
}

export interface SnakeCellProp {
  Point: Point,
  star: Boolean,
  children?: JSX.Element
}

export interface ISnakePlayGround {
  star: Boolean;
  GameObject: GameObject;
  onExits: () => void;
}

export interface GameObject {
  hard: Menu; //初始难度
}

export interface IPlaySoud {
  num: number
}
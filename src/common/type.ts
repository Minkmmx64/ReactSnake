import { CSSProperties } from "react";

export interface CSSProto {
  [index: string]: CSSProperties;
}

export type Menu = "Slug" | "Worm" | "Python";

export type DirectionMenu = "TOP" | "DOWN" | "LEFT" | "RIGHT";

export type ILevel = { [index in Menu]: 1 | 0.4 | 0.5; };

export type Ipoint = { [index in Menu]: 1 | 3 | 5; };

export type DirectType = { [index in DirectionMenu]: MoveDirectType; }

export type MoveDirectType = 1 | 2 | 3 | 4;
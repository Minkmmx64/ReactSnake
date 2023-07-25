import { Point } from "../pages/component/Game/type";
import { DirectType, ILevel, Ipoint } from "./type";

export const Direct: DirectType = {
  TOP: 1,
  DOWN: 2,
  LEFT: 3,
  RIGHT: 4,
}

export const Level: ILevel = {
  "Slug": 1,
  "Worm": 0.5,
  "Python": 0.4
}

export const point: Ipoint = {
  "Slug": 1,
  "Worm": 3,
  "Python": 5
}

export const Movebehave = {
  TOP: "w" || "W",
  DOWN: "s" || "S",
  LEFT: "a" || "A",
  RIGHT: "d" || "D",
  SPACE: " "
}

export const InitBodyParse: Point[] = [
  { x: 10, y: 6 },
  { x: 10, y: 7 },
  { x: 10, y: 8 },
]

export const Speed = 200;
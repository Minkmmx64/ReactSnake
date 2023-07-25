import { Menu } from "../../../common/type";

export interface IGameHard {
  hard: Menu;
  onClick: (hard: Menu) => void;
}

export interface ISnakeGameUI {
  onPlay: (hard: Menu) => void;
}